import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const client = await clientPromise;
    const db = client.db("lawsite");
    
    const law = await db.collection("laws").findOne(
      { _id: new ObjectId(id) }
    );

    if (!law) {
      return NextResponse.json({ error: 'Law not found' }, { status: 404 });
    }

    // Transform _id to id for frontend compatibility
    const transformedLaw = {
      ...law,
      id: law._id.toString(),
      _id: undefined
    };

    return NextResponse.json(transformedLaw);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
