'use client'

import { useState, useEffect } from 'react';
import { getMP } from '@/lib/api';
import Link from 'next/link';

export default function MPPage() {
  const [mp, setMP] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMP = async () => {
      try {
        const data = await getMP();
        setMP(data);
      } catch (err) {
        setError('Failed to load MP details');
        console.error('Error fetching MP:', err);
      }
    };

    fetchMP();
  }, []);

  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-red-600">{error}</div>
    </div>
  );

  if (!mp) return (
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

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">{mp.name}</h1>
        <p className="text-xl text-gray-600 mb-6">MP for {mp.constituency}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-700">Agreed with Constituents</h3>
            <p className="text-2xl text-green-600">{mp.agreedWithConstituents}</p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-semibold text-red-700">Disagreed with Constituents</h3>
            <p className="text-2xl text-red-600">{mp.disagreedWithConstituents}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700">No Vote Cast</h3>
            <p className="text-2xl text-gray-600">{mp.noVote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

