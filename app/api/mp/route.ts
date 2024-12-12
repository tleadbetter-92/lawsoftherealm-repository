import { NextResponse } from 'next/server';

const mockMP = {
  name: 'Jane Smith',
  constituency: 'Central District',
  agreedWithConstituents: 45,
  disagreedWithConstituents: 12,
  noVote: 8
};

export async function GET() {
  try {
    return NextResponse.json(mockMP);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
