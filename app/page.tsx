import Link from 'next/link'
import { getLaws } from '@/lib/mockDb'

export default function Home() {
  const laws = getLaws();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Laws of the Realm</h1>
      <div className="grid gap-6">
        {laws.map(law => (
          <div key={law.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{law.shortTitle}</h2>
            <p className="text-gray-600 mb-4">{law.longTitle}</p>
            <div className="flex justify-between items-center">
              <Link href={`/law/${law.id}`} className="text-blue-500 hover:underline">
                View Details
              </Link>
              <a href={law.pdfLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                View PDF
              </a>
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
}

