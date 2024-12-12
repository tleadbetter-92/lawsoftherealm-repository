import { NextResponse } from 'next/server';

const mockLaw = {
  id: '1',
  shortTitle: 'Environmental Protection Act',
  longTitle: 'An act to protect and preserve environmental resources',
  pdfLink: '#',
  description: 'This act aims to protect our environment by implementing strict guidelines for industrial emissions and waste management.',
  votes: { yes: 10, no: 5 },
  comments: [],
  mpComment: 'I support this act as it aligns with our commitment to environmental sustainability.'
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // In a real app, you'd fetch the specific law from your database
    return NextResponse.json(mockLaw);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
