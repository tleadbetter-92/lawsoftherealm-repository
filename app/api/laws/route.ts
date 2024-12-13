import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("lawsite");
    
    console.log('Attempting to fetch laws...');
    
    const laws = await db.collection("laws").find({}).toArray();
    
    console.log(`Found ${laws.length} laws`);

    const transformedLaws = laws.map(law => ({
      ...law,
      id: law._id.toString(),
      _id: undefined
    }));

    return NextResponse.json(transformedLaws);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined 
      },
      { status: 500 }
    );
  }
}
