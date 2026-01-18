import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      <nav className="flex items-center justify-between px-8 py-4 border-b">
        <h1 className="text-2xl font-bold text-brand-900">ClientPulse</h1>
        <div className="flex gap-4">
          <Link href="/login" className="px-4 py-2 text-brand-700 hover:underline">
            Log in
          </Link>
          <Link href="/login" className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700">
            Get Started
          </Link>
        </div>
      </nav>
      <section className="max-w-4xl mx-auto py-24 px-8 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Know what your clients really think
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          Collect structured feedback, track satisfaction trends, and build
          stronger client relationships — all in one platform.
        </p>
        <Link
          href="/login"
          className="px-8 py-4 bg-brand-600 text-white text-lg rounded-lg hover:bg-brand-700 inline-block"
        >
          Start Free Trial
        </Link>
      </section>
    </main>
  );
}
