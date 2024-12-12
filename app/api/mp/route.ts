import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("lawsite");
    
    const mp = await db.collection("mp").findOne({});
    
    if (!mp) {
      return NextResponse.json({ error: 'MP not found' }, { status: 404 });
    }

    // Transform _id if it exists
    const transformedMP = {
      ...mp,
      id: mp._id ? mp._id.toString() : undefined,
      _id: undefined
    };

    return NextResponse.json(transformedMP);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
