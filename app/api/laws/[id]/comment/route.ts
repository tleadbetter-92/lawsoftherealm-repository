import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

type RouteContext = {
  params: {
    id: string;
  };
};

export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const comment = await request.json();
    const client = await clientPromise;
    const db = client.db("lawsite");
    
    const result = await db.collection("laws").updateOne(
      { _id: new ObjectId(context.params.id) },
      { 
        $push: { 
          comments: {
            id: new ObjectId().toString(),
            ...comment,
            createdAt: new Date()
          }
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Law not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
  }
} 