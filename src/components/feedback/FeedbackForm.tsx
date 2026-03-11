'use client';

import { useState } from 'react';

interface FeedbackFormProps {
  projectName: string;
  portalSlug: string;
}

const CATEGORIES = ['COMMUNICATION', 'QUALITY', 'TIMELINESS', 'VALUE', 'OVERALL'];

export function FeedbackForm({ projectName, portalSlug }: FeedbackFormProps) {
  const [score, setScore] = useState<number | null>(null);
  const [category, setCategory] = useState('OVERALL');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (score === null) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/feedback/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ portalSlug, score, category, comment }),
      });

      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-2">Thank you!</h2>
        <p className="text-gray-600">Your feedback has been submitted successfully.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6 px-4 sm:px-0">
      <div>
        <h2 className="text-2xl font-bold mb-2">Feedback for {projectName}</h2>
        <p className="text-gray-600">How would you rate your experience?</p>
      </div>

      {/* NPS Score */}
      <div>
        <label className="block text-sm font-medium mb-2">Score (0-10)</label>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 11 }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setScore(i)}
              className={`w-10 h-10 rounded-lg border-2 text-sm font-semibold transition-all ${
                score === i
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : 'border-gray-200 hover:border-brand-300'
              }`}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0) + cat.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Comment */}
      <div>
        <label className="block text-sm font-medium mb-2">Comments (optional)</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border rounded-lg resize-none"
          placeholder="Tell us more about your experience..."
        />
      </div>

      <button
        type="submit"
        disabled={score === null || submitting}
        className="w-full py-3 bg-brand-600 text-white rounded-lg font-semibold hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </form>
  );
}
