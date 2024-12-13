import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  let client;
  try {
    console.log('API: Connecting to MongoDB...');
    client = await clientPromise;
    const db = client.db("lawsite");
    
    console.log('API: Successfully connected, attempting to fetch laws...');
    
    const laws = await db.collection("laws").find({}).toArray();
    
    console.log(`API: Found ${laws.length} laws`);

    const transformedLaws = laws.map(law => {
      console.log('API: Transforming law:', law._id.toString());
      return {
        ...law,
        id: law._id.toString(),
        _id: undefined
      };
    });

    console.log('API: Successfully transformed all laws');
    return NextResponse.json(transformedLaws);
  } catch (error: unknown) {
    console.error('API: Server error:', error);
    
    let errorMessage = 'Unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
      console.error('API: Error details:', error.stack);
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined 
      },
      { status: 500 }
    );
  }
}
