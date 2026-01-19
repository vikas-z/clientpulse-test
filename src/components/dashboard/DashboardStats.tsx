'use client';

interface StatsProps {
  totalProjects: number;
  totalClients: number;
  avgNps: number;
  totalFeedbacks: number;
}

export function DashboardStats({ totalProjects, totalClients, avgNps, totalFeedbacks }: StatsProps) {
  const stats = [
    { label: 'Projects', value: totalProjects, icon: '📁' },
    { label: 'Clients', value: totalClients, icon: '👥' },
    { label: 'Avg NPS', value: avgNps.toFixed(1), icon: '⭐' },
    { label: 'Feedbacks', value: totalFeedbacks, icon: '💬' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-xl border p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{stat.icon}</span>
            <span className="text-sm text-gray-500">{stat.label}</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
