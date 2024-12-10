'use client'

import { useState } from 'react'
import { getLaw, updateVotes, addComment } from '@/lib/mockDb'
import React from 'react';

export default function LawPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params); // Resolve params
  const law = getLaw(resolvedParams.id);
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState('');

  if (!law) return <div>Law not found</div>;

  const handleVote = (vote: 'yes' | 'no') => {
    updateVotes(law.id, vote);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment && author) {
      addComment(law.id, { text: comment, author });
      setComment('');
      setAuthor('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{law.shortTitle}</h1>
      <p className="text-xl mb-4">{law.longTitle}</p>
      <a href={law.pdfLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mb-4 block">
        View PDF
      </a>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <p>{law.description}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Voting</h2>
        <div className="flex gap-4">
          <button onClick={() => handleVote('yes')} className="bg-green-500 text-white px-4 py-2 rounded">
            Yes ({law.votes.yes})
          </button>
          <button onClick={() => handleVote('no')} className="bg-red-500 text-white px-4 py-2 rounded">
            No ({law.votes.no})
          </button>
        </div>
      </div>
      <div className="mb-6">
  <h2 className="text-2xl font-semibold mb-2">MP&#39;s Comment</h2>
  <p>{law.mpComment || 'No comment yet.'}</p>
</div>
<div className="mb-6">
  <h2 className="text-2xl font-semibold mb-2">Comments</h2>
  {law.comments.map(comment => (
          <div key={comment.id} className="border-b py-2">
            <p>{comment.text}</p>
            <p className="text-sm text-gray-500">- {comment.author}</p>
          </div>
        ))}
        <form onSubmit={handleCommentSubmit} className="mt-4">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name"
            className="border p-2 w-full mb-2"
            required
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
            className="border p-2 w-full mb-2"
            required
          ></textarea>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit Comment
          </button>
        </form>
      </div>
    </div>
  )
}

