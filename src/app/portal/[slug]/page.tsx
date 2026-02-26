import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { FeedbackForm } from '@/components/feedback/FeedbackForm';

export default async function PortalPage({ params }: { params: { slug: string } }) {
  const client = await prisma.client.findUnique({
    where: { portalSlug: params.slug },
    include: { user: { include: { projects: { where: { status: 'ACTIVE' }, take: 1 } } } },
  });

  if (!client || !client.user.projects[0]) notFound();

  const project = client.user.projects[0];

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-sm border p-8">
        <FeedbackForm projectName={project.name} portalSlug={params.slug} />
      </div>
    </main>
  );
}