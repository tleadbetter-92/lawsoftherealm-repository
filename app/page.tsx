import Link from 'next/link'
import { getLaws } from '@/lib/api'
import SignInButton from './components/SignInButton';

export default async function Home() {
  try {
    const laws = await getLaws();

    if (!laws || laws.length === 0) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Laws of the Realm</h1>
            <SignInButton />
          </div>
          <p>No laws found at this time.</p>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Laws of the Realm</h1>
          <SignInButton />
        </div>
        <div className="grid gap-6">
          {laws.map(law => (
            <div key={law.id} className="border p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">{law.shortTitle}</h2>
              <p className="text-gray-600 mb-4">{law.longTitle}</p>
              <div className="flex justify-between items-center">
                <Link href={`/law/${law.id}`} className="text-blue-500 hover:underline">
                  View Details
                </Link>
                {law.pdfLink && (
                  <a href={law.pdfLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    View PDF
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/mp" className="text-blue-500 hover:underline">
            View MP Page
          </Link>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Failed to fetch laws:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Laws of the Realm</h1>
          <SignInButton />
        </div>
        <div className="p-4 border border-red-300 bg-red-50 rounded">
          <p className="text-red-600">Failed to load laws. Please try again later.</p>
        </div>
      </div>
    );
  }
}

