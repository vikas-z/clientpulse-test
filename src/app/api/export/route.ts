import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const feedbacks = await prisma.feedback.findMany({
    where: { project: { userId: session.user.id } },
    include: { client: true, project: true },
    orderBy: { createdAt: 'desc' },
  });

  // Build CSV
  const headers = ['Date', 'Client', 'Project', 'Score', 'Category', 'Status', 'Comment'];
  const rows = feedbacks.map((f) => [
    new Date(f.createdAt).toISOString().split('T')[0],
    f.client.name,
    f.project.name,
    f.score,
    f.category,
    f.status,
    `"${(f.comment || '').replace(/"/g, '""')}"`,
  ]);

  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="clientpulse-feedback-${Date.now()}.csv"`,
    },
  });
}
