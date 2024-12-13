import clientPromise from '../lib/mongodb';

const initialLaws = [
  {
    shortTitle: 'Environmental Protection Act',
    longTitle: 'An act to protect and preserve environmental resources',
    pdfLink: 'https://example.com/env-act.pdf',
    description: 'This act aims to protect our environment by implementing strict guidelines.',
    votes: { yes: 0, no: 0 },
    comments: [],
    mpComment: 'I support this environmental initiative.'
  },
  {
    shortTitle: 'Digital Privacy Act',
    longTitle: 'An act concerning digital privacy rights',
    pdfLink: 'https://example.com/privacy-act.pdf',
    description: 'This act strengthens online privacy protections.',
    votes: { yes: 0, no: 0 },
    comments: [],
    mpComment: 'Privacy is a fundamental right.'
  }
];

const mp = {
  name: 'Jane Smith',
  constituency: 'Central District',
  agreedWithConstituents: 45,
  disagreedWithConstituents: 12,
  noVote: 8
};

async function seed() {
  try {
    const client = await clientPromise;
    const db = client.db("lawsite");
    
    // Clear existing data
    await db.collection("laws").deleteMany({});
    await db.collection("mp").deleteMany({});
    
    // Insert new data
    await db.collection("laws").insertMany(initialLaws);
    await db.collection("mp").insertOne(mp);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed(); 