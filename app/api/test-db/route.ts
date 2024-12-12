import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("lawsite");
    
    // Test connection by counting documents
    const lawsCount = await db.collection("laws").countDocuments();
    const mpCount = await db.collection("mp").countDocuments();

    return NextResponse.json({
      status: 'Connected',
      lawsCount,
      mpCount
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to database' },
      { status: 500 }
    );
  }
} 