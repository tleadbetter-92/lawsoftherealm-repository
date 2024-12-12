import { NextResponse } from 'next/server';

// Temporary mock data with the same structure as your interface
const mockLaws = [
  {
    id: '1',
    shortTitle: 'Environmental Protection Act',
    longTitle: 'An act to protect and preserve environmental resources',
    pdfLink: '#',
    description: 'This act aims to protect our environment',
    votes: { yes: 10, no: 5 },
    comments: [],
    mpComment: ''
  },
  {
    id: '2',
    shortTitle: 'Digital Privacy Act',
    longTitle: 'An act concerning the protection of personal data and digital rights',
    pdfLink: '#',
    description: 'This act protects digital privacy rights',
    votes: { yes: 15, no: 3 },
    comments: [],
    mpComment: ''
  }
];

export async function GET() {
  try {
    // Return mock data for now
    return NextResponse.json(mockLaws);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
