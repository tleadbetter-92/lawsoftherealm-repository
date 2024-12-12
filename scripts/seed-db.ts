import clientPromise from '../lib/mongodb';

interface Law {
  shortTitle: string;
  longTitle: string;
  pdfLink: string;
  description: string;
  votes: { yes: number; no: number };
  comments: { id: string; text: string; author: string }[];
  mpComment: string;
}

const initialLaws: Law[] = [
  {
    shortTitle: 'The Arbitration Bill [HL]',
    longTitle: 'A Bill to amend the Arbitration Act 1996',
    pdfLink: 'https://bills.parliament.uk/bills/3733',
    description: 'The Arbitration Bill [HL] aims to update the Arbitration Act 1996 by clarifying legal rules and processes in arbitration, such as the impartiality of arbitrators, their duties and protections, court powers in arbitration cases, and the procedures for appealing arbitration decisions.',
    votes: { yes: 0, no: 0 },
    comments: [],
    mpComment: ''
  },
  // ... copy the rest of the laws from mockDb.ts
];

const mp = {
  name: 'Emily Grey',
  constituency: 'Barrow in Furness',
  agreedWithConstituents: 75,
  disagreedWithConstituents: 20,
  noVote: 5
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
    
    console.log('Database seeded!');
    process.exit(0);
  } catch (e) {
    console.error('Error seeding database:', e);
    process.exit(1);
  }
}

seed(); 