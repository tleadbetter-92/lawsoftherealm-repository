import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const client = await clientPromise;
    const db = client.db("lawsite");
    
    const law = await db.collection("laws").findOne(
      { _id: new ObjectId(id) }
    );

    if (!law) {
      return NextResponse.json({ error: 'Law not found' }, { status: 404 });
    }

    const transformedLaw = {
      ...law,
      id: law._id.toString(),
      _id: undefined
    };

    return NextResponse.json(transformedLaw);
  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    // Implement PUT logic here using the id
    return NextResponse.json({ message: 'Not implemented', id }, { status: 501 });
  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
