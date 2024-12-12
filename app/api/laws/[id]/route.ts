import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("lawsite");
    
    const law = await db.collection("laws")
      .findOne({ _id: new ObjectId(params.id) });

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
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch law' }, { status: 500 });
  }
}
