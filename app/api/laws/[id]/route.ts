import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

type Props = {
  params: { id: string }
}

export async function GET(request: NextRequest, { params }: Props) {
  const { id } = params;
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

export async function PUT(request: NextRequest, { params }: Props) {
  const { id } = params;
  
  // Rest of your handler code...
}
