'use client';

interface FeedbackItem {
  id: string;
  score: number;
  category: string;
  comment: string | null;
  createdAt: string;
  client: { name: string };
  project: { name: string };
}

export function RecentFeedback({ feedbacks }: { feedbacks: FeedbackItem[] }) {
  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-600 bg-green-50';
    if (score >= 7) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  if (feedbacks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No feedback received yet. Share your portal link with clients to get started.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Client</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Project</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Score</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Category</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Comment</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {feedbacks.map((fb) => (
            <tr key={fb.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm font-medium">{fb.client.name}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{fb.project.name}</td>
              <td className="px-4 py-3">
                <span className={`inline-flex px-2 py-1 rounded-full text-sm font-semibold ${getScoreColor(fb.score)}`}>
                  {fb.score}/10
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 capitalize">{fb.category.toLowerCase()}</td>
              <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{fb.comment || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
