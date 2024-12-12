import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("lawsite");
    
    const laws = await db.collection("laws").find({}).toArray();

    // Transform _id to id for all laws
    const transformedLaws = laws.map(law => ({
      ...law,
      id: law._id.toString(),
      _id: undefined
    }));

    return NextResponse.json(transformedLaws);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
