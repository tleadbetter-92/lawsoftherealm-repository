import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/options';

interface Voter {
  email: string;
  name: string;
  vote: 'yes' | 'no';
  timestamp: Date;
}

interface Law {
  _id: ObjectId;
  votes: {
    yes: number;
    no: number;
  };
  voters: Voter[];
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { vote } = await request.json() as { vote: 'yes' | 'no' };
    const client = await clientPromise;
    const db = client.db("lawsite");
    
    // Check if user has already voted
    const existingVote = await db.collection<Law>("laws").findOne({
      _id: new ObjectId(params.id),
      'voters.email': session.user.email
    });

    if (existingVote) {
      return NextResponse.json(
        { error: 'You have already voted on this law' }, 
        { status: 400 }
      );
    }

    // Add vote and record voter
    const result = await db.collection<Law>("laws").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $inc: { [`votes.${vote}`]: 1 },
        $push: {
          voters: {
            email: session.user.email,
            name: session.user.name || 'Anonymous',
            vote,
            timestamp: new Date()
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
    return NextResponse.json(
      { error: 'Failed to update vote' }, 
      { status: 500 }
    );
  }
} 