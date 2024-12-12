import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { vote } = await request.json();
    const client = await clientPromise;
    const db = client.db("lawsite");
    
    const result = await db.collection("laws").updateOne(
      { _id: new ObjectId(params.id) },
      { $inc: { [`votes.${vote}`]: 1 } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Law not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to update vote' }, { status: 500 });
  }
} 