import Image from 'next/image'
import { getMP } from '@/lib/api'

export default async function MPPage() {
  const mp = await getMP();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">MP Profile</h1>
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="w-48 h-48 relative">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Official_portrait_of_Michelle_Scrogham_MP_crop_2.jpg-jUWGyaF8RI7gEIDHSYxj59MT05WWgZ.jpeg"
              alt={mp.name}
              width={192}
              height={192}
              className="rounded-lg object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{mp.name}</h2>
            <p className="text-xl text-gray-600">Constituency: {mp.constituency}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold text-green-800">Agreed with Constituents</h3>
            <p className="text-3xl font-bold text-green-700">{mp.agreedWithConstituents}</p>
          </div>
          <div className="bg-red-50 p-6 rounded-lg">
            <h3 className="font-semibold text-red-800">Disagreed with Constituents</h3>
            <p className="text-3xl font-bold text-red-700">{mp.disagreedWithConstituents}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-800">No Vote</h3>
            <p className="text-3xl font-bold text-gray-700">{mp.noVote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

