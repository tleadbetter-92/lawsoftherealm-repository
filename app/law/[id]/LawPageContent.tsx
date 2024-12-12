'use client';

import { useState, useEffect } from 'react';
import { getLaw, updateVotes, addComment } from '@/lib/api';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function LawPageContent({ id }: { id: string }) {
  const { data: session } = useSession();
  const [law, setLaw] = useState<any>(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const fetchLaw = async () => {
      try {
        const data = await getLaw(id);
        setLaw(data);
        if (session?.user?.email) {
          const hasUserVoted = data.votes.voters?.some(
            (voter: any) => voter.email === session.user.email
          );
          setHasVoted(hasUserVoted);
        }
      } catch (err) {
        setError('Failed to load law details');
        console.error('Error fetching law:', err);
      }
    };

    fetchLaw();
  }, [id, session]);

  const handleVote = (vote: 'yes' | 'no') => {
    if (!session) {
      alert('Please sign in to vote');
      return;
    }
    if (hasVoted) {
      alert('You have already voted on this law');
      return;
    }
    setLoading(true);
    updateVotes(id, vote)
      .then(() => getLaw(id))
      .then(updatedLaw => {
        setLaw(updatedLaw);
        setHasVoted(true);
      })
      .catch(error => {
        console.error('Failed to vote:', error);
        if (error.message.includes('already voted')) {
          alert('You have already voted on this law');
          setHasVoted(true);
        } else {
          alert('Failed to submit vote');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      alert('Please sign in to comment');
      return;
    }
    if (!comment.trim()) return;

    setLoading(true);
    addComment(id, {
      text: comment,
      author: session.user?.name || 'Anonymous'
    })
      .then(() => getLaw(id))
      .then(updatedLaw => {
        setLaw(updatedLaw);
        setComment('');
      })
      .catch(error => {
        console.error('Failed to add comment:', error);
        alert('Failed to submit comment');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-red-600">{error}</div>
    </div>
  );

  if (!law) return (
    <div className="container mx-auto px-4 py-8">
      <div>Loading...</div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className="text-blue-500 hover:underline">
          ← Back to Laws
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-4">{law.shortTitle}</h1>
      <p className="text-xl text-gray-600 mb-6">{law.longTitle}</p>
      
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-gray-700 mb-6">{law.description}</p>
        
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Voting</h3>
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => handleVote('yes')}
              disabled={loading || hasVoted}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
            >
              Yes ({law.votes.yes})
              {hasVoted && law.votes.voters.find((v: any) => v.email === session?.user?.email)?.vote === 'yes' && ' ✓'}
            </button>
            <button
              onClick={() => handleVote('no')}
              disabled={loading || hasVoted}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
            >
              No ({law.votes.no})
              {hasVoted && law.votes.voters.find((v: any) => v.email === session?.user?.email)?.vote === 'no' && ' ✓'}
            </button>
          </div>
        </div>

        {law.mpComment && (
          <div className="border-t mt-6 pt-6">
            <h3 className="text-xl font-semibold mb-4">MP's Comment</h3>
            <p className="text-gray-700">{law.mpComment}</p>
          </div>
        )}

        <div className="border-t mt-6 pt-6">
          <h3 className="text-xl font-semibold mb-4">Comments</h3>
          <div className="space-y-4 mb-6">
            {law.comments.map((comment: any, index: number) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">{comment.text}</p>
                <p className="text-sm text-gray-500 mt-2">- {comment.author}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={session ? "Add your comment..." : "Please sign in to comment"}
              disabled={!session || loading}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              rows={3}
            />
            <button
              type="submit"
              disabled={!session || loading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
            >
              Submit Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 