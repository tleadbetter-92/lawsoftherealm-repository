const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

const initialLaws = [
  {
    shortTitle: 'The Arbitration Bill',
    longTitle: 'A Bill to amend the Arbitration Act 1996',
    pdfLink: 'https://bills.parliament.uk/bills/3733',
    description: 'The Arbitration Bill [HL] aims to update the Arbitration Act 1996 by clarifying legal rules and processes in arbitration, such as the impartiality of arbitrators, their duties and protections, court powers in arbitration cases, and the procedures for appealing arbitration decisions',
    votes: { 
      yes: 0, 
      no: 0
    },
    voters: [],
    comments: [],
    mpComment: 'No comment'
  },
  {
    shortTitle: 'Assisted Dying for Terminally Ill Adults Bill',
    longTitle: 'A Bill to allow adults who are terminally ill, subject to safeguards, to be assisted to end their own life; and for connected purposes.',
    pdfLink: 'https://bills.parliament.uk/bills/3741',
    description: 'This bill aims to provide legal framework for assisted dying under strict safeguards for terminally ill adults.',
    votes: { 
      yes: 0, 
      no: 0
    },
    voters: [],
    comments: [],
    mpComment: 'No comment'
  },
  {
    shortTitle: 'Asylum Support (Prescribed Period) Bill',
    longTitle: 'A Bill to introduce a minimum period of 56 days after an asylum claim is determined before an asylum claim is considered to be determined for the purposes of ending asylum support',
    pdfLink: 'https://bills.parliament.uk/bills/3758',
    description: 'This bill aims to make provision about the serving of documentation relevant to the ending of asylum support following an asylum determination; and connected purposes.',
    votes: { 
      yes: 0, 
      no: 0
    },
    voters: [],
    comments: [],
    mpComment: 'No comment'
  },
  {
    shortTitle: 'Bank Resolution (Recapitalisation) Bill',
    longTitle: 'A Bill to make provision about recapitalisation costs in relation to the special resolution regime under the Banking Act 2009.',
    pdfLink: null,
    description: 'This bill focuses on banking regulations and recapitalization procedures under the Banking Act 2009.',
    votes: { 
      yes: 0, 
      no: 0
    },
    voters: [],
    comments: [],
    mpComment: 'No comment'
  },
  {
    shortTitle: 'Budget Responsibility Act 2024',
    longTitle: 'A Bill to impose duties on the Treasury and the Office for Budget Responsibility in respect of the announcement of fiscally significant measures',
    pdfLink: 'https://bills.parliament.uk/bills/3731',
    description: 'This act establishes new responsibilities for the Treasury and OBR regarding fiscal measures.',
    votes: { 
      yes: 0, 
      no: 0
    },
    voters: [],
    comments: [],
    mpComment: 'No comment'
  },
  {
    shortTitle: 'Commonwealth Parliamentary Association Bill',
    longTitle: 'A Bill to make provision about the status of, and privileges and immunities in connection with, the Commonwealth Parliamentary Association and the International Committee of the Red Cross',
    pdfLink: 'https://bills.parliament.uk/bills/3735',
    description: 'This bill addresses the legal status and privileges of the CPA and ICRC.',
    votes: { 
      yes: 0, 
      no: 0
    },
    voters: [],
    comments: [],
    mpComment: 'No comment'
  },
  {
    shortTitle: 'Complications from Abortions (Annual Report) Bill',
    longTitle: 'A Bill to require the Secretary of State to publish an annual report on complications from abortions in England',
    pdfLink: 'https://bills.parliament.uk/bills/3750',
    description: 'This bill establishes requirements for annual reporting on abortion-related complications in England.',
    votes: { 
      yes: 0, 
      no: 0
    },
    voters: [],
    comments: [],
    mpComment: 'No comment'
  },
  {
    shortTitle: 'Crown Estate Bill',
    longTitle: 'A Bill to amend the Crown Estate Act 1961.',
    pdfLink: 'https://bills.parliament.uk/bills/3739',
    description: 'This bill proposes amendments to the existing Crown Estate Act 1961.',
    votes: { 
      yes: 0, 
      no: 0
    },
    voters: [],
    comments: [],
    mpComment: 'No comment'
  },
  {
    shortTitle: 'Crown Estate (Wales) Bill',
    longTitle: 'A Bill to transfer responsibility for the Crown Estate in Wales to the Welsh Government',
    pdfLink: 'https://bills.parliament.uk/bills/376',
    description: 'This bill aims to transfer Crown Estate responsibilities in Wales to the Welsh Government.',
    votes: { 
      yes: 0, 
      no: 0
    },
    voters: [],
    comments: [],
    mpComment: 'No comment'
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
  let client;
  
  try {
    client = new MongoClient(uri);
    await client.connect();
    
    const db = client.db("lawsite");
    
    // Clear existing data
    await db.collection("laws").deleteMany({});
    await db.collection("mp").deleteMany({});
    
    // Insert new data
    await db.collection("laws").insertMany(initialLaws);
    await db.collection("mp").insertOne(mp);
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

seed(); 