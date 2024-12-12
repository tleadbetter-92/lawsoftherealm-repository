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

    return NextResponse.json(mp);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch MP data' }, { status: 500 });
  }
}
