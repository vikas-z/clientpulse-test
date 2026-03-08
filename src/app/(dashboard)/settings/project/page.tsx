import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function ProjectSettingsPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const project = await prisma.project.findFirst({
    where: { id: searchParams.id, userId: session.user.id },
  });

  if (!project) redirect('/dashboard');

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">Project Settings</h1>

      <section className="space-y-4 mb-12">
        <h2 className="text-lg font-semibold">General</h2>
        <div className="space-y-3">
          <label className="block">
            <span className="text-sm font-medium">Project Name</span>
            <input
              type="text"
              defaultValue={project.name}
              className="mt-1 block w-full border rounded-lg px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Description</span>
            <textarea
              defaultValue={project.description || ''}
              rows={3}
              className="mt-1 block w-full border rounded-lg px-3 py-2"
            />
          </label>
        </div>
      </section>

      <section className="border-2 border-red-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>
        <div className="space-y-3">
          <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
            Archive Project
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 ml-3">
            Delete All Feedback
          </button>
        </div>
      </section>
    </div>
  );
}