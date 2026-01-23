import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';
import { sendFeedbackReceivedEmail } from '@/lib/email';
import { z } from 'zod';

const submitSchema = z.object({
  portalSlug: z.string(),
  score: z.number().int().min(0).max(10),
  category: z.enum(['COMMUNICATION', 'QUALITY', 'TIMELINESS', 'VALUE', 'OVERALL']),
  comment: z.string().max(2000).optional(),
});

export async function POST(req: NextRequest) {
  // Rate limit by IP
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  const { allowed, remaining } = rateLimit(ip, { maxTokens: 10, refillRate: 0.1, windowMs: 60_000 });

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'X-RateLimit-Remaining': String(remaining) } }
    );
  }

  const body = await req.json();
  const parsed = submitSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const client = await prisma.client.findUnique({
    where: { portalSlug: parsed.data.portalSlug },
    include: { user: true },
  });

  if (!client) {
    return NextResponse.json({ error: 'Invalid portal link' }, { status: 404 });
  }

  // Find the client's active project (first active project for now)
  const project = await prisma.project.findFirst({
    where: { userId: client.userId, status: 'ACTIVE' },
  });

  if (!project) {
    return NextResponse.json({ error: 'No active project found' }, { status: 404 });
  }

  const feedback = await prisma.feedback.create({
    data: {
      score: parsed.data.score,
      category: parsed.data.category,
      comment: parsed.data.comment,
      projectId: project.id,
      clientId: client.id,
    },
  });

  // Notify project owner
  try {
    await sendFeedbackReceivedEmail(client.user.email!, client.name, project.name, parsed.data.score);
  } catch (e) {
    console.error('Failed to send notification email:', e);
    // Don't fail the request if email fails
  }

  return NextResponse.json({ id: feedback.id, message: 'Feedback submitted' }, { status: 201 });
}
