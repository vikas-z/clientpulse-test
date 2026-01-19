import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { RecentFeedback } from '@/components/dashboard/RecentFeedback';

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const [projects, feedbacks, clients] = await Promise.all([
    prisma.project.count({ where: { userId: session.user.id } }),
    prisma.feedback.findMany({
      where: { project: { userId: session.user.id } },
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { client: true, project: true },
    }),
    prisma.client.count({ where: { userId: session.user.id } }),
  ]);

  const avgScore = feedbacks.length > 0
    ? feedbacks.reduce((sum, f) => sum + f.score, 0) / feedbacks.length
    : 0;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <DashboardStats
        totalProjects={projects}
        totalClients={clients}
        avgNps={avgScore}
        totalFeedbacks={feedbacks.length}
      />
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Feedback</h2>
        <RecentFeedback feedbacks={feedbacks} />
      </div>
    </div>
  );
}
