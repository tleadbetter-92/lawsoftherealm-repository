interface Law {
    id: string;
    shortTitle: string;
    longTitle: string;
    pdfLink: string;
    description: string;
    votes: { yes: number; no: number };
    comments: { id: string; text: string; author: string }[];
    mpComment: string;
  }
  
  interface MP {
    name: string;
    constituency: string;
    agreedWithConstituents: number;
    disagreedWithConstituents: number;
    noVote: number;
  }
  
  const initialLaws: Law[] = [
    {
      id: '1',
      shortTitle: 'The Arbitration Bill [HL]',
      longTitle: 'A Bill to amend the Arbitration Act 1996',
      pdfLink: 'https://bills.parliament.uk/bills/3733',
      description: 'The Arbitration Bill [HL] aims to update the Arbitration Act 1996 by clarifying legal rules and processes in arbitration, such as the impartiality of arbitrators, their duties and protections, court powers in arbitration cases, and the procedures for appealing arbitration decisions.',
      votes: { yes: 0, no: 0 },
      comments: [],
      mpComment: ''
    },
    {
      id: '2',
      shortTitle: 'Assisted dying for terminally ill adults Bill',
      longTitle: 'A Bill to allow adults who are terminally ill, subject to safeguards, to be assisted to end their own life; and for connected purposes.',
      pdfLink: 'https://bills.parliament.uk/bills/3741',
      description: 'This bill proposes to legalize assisted dying for terminally ill adults, with appropriate safeguards in place. It aims to provide a legal framework for individuals facing terminal illnesses to make end-of-life decisions.',
      votes: { yes: 0, no: 0 },
      comments: [],
      mpComment: ''
    },
    {
      id: '3',
      shortTitle: 'Asylum Support (Prescribed Period) Bill [HL]',
      longTitle: 'A Bill to introduce a minimum period of 56 days after an asylum claim is determined before an asylum claim is considered to be determined for the purposes of ending asylum support; to make provision about the serving of documentation relevant to the ending of asylum support following an asylum determination; and connected purposes.',
      pdfLink: 'https://bills.parliament.uk/bills/3758',
      description: 'This bill aims to extend the period of asylum support after an asylum claim is determined, ensuring that asylum seekers have adequate time to transition after their claim is processed.',
      votes: { yes: 0, no: 0 },
      comments: [],
      mpComment: ''
    },
    {
      id: '4',
      shortTitle: 'Bank Resolution (Recapitalisation) Bill [HL]',
      longTitle: 'A Bill to make provision about recapitalisation costs in relation to the special resolution regime under the Banking Act 2009.',
      pdfLink: 'https://bills.parliament.uk/bills/3731',
      description: 'This bill addresses the recapitalization costs associated with the special resolution regime for banks under the Banking Act 2009, aiming to improve financial stability and protect taxpayers.',
      votes: { yes: 0, no: 0 },
      comments: [],
      mpComment: ''
    },
    {
      id: '5',
      shortTitle: 'Budget Responsibility Act 2024',
      longTitle: 'A Bill to impose duties on the Treasury and the Office for Budget Responsibility in respect of the announcement of fiscally significant measures',
      pdfLink: 'https://bills.parliament.uk/bills/3731',
      description: 'This act aims to enhance fiscal responsibility by imposing specific duties on the Treasury and the Office for Budget Responsibility regarding the announcement of significant fiscal measures.',
      votes: { yes: 0, no: 0 },
      comments: [],
      mpComment: ''
    },
    {
      id: '6',
      shortTitle: 'Commonwealth Parliamentary Association and International Committee of the Red Cross (Status) Bill [HL]',
      longTitle: 'A Bill to make provision about the status of, and privileges and immunities in connection with, the Commonwealth Parliamentary Association and the International Committee of the Red Cross; and for connected purposes.',
      pdfLink: 'https://bills.parliament.uk/bills/3735',
      description: 'This bill addresses the legal status, privileges, and immunities of the Commonwealth Parliamentary Association and the International Committee of the Red Cross, clarifying their roles and protections within the UK legal framework.',
      votes: { yes: 0, no: 0 },
      comments: [],
      mpComment: ''
    },
    {
      id: '7',
      shortTitle: 'Complications from Abortions (Annual Report) Bill [HL]',
      longTitle: 'A Bill to require the Secretary of State to publish an annual report on complications from abortions in England; and for connected purposes.',
      pdfLink: 'https://bills.parliament.uk/bills/3750',
      description: 'This bill mandates the Secretary of State to publish an annual report detailing complications arising from abortions in England, aiming to improve transparency and inform healthcare policies.',
      votes: { yes: 0, no: 0 },
      comments: [],
      mpComment: ''
    },
    {
      id: '8',
      shortTitle: 'Crown Estate Bill [HL]',
      longTitle: 'A Bill to amend the Crown Estate Act 1961.',
      pdfLink: 'https://bills.parliament.uk/bills/3739',
      description: 'This bill proposes amendments to the Crown Estate Act 1961, potentially affecting the management and operation of the Crown Estate.',
      votes: { yes: 0, no: 0 },
      comments: [],
      mpComment: ''
    },
    {
      id: '9',
      shortTitle: 'Crown Estate (Wales) Bill [HL]',
      longTitle: 'A Bill to transfer responsibility for the Crown Estate in Wales to the Welsh Government; and for connected purposes',
      pdfLink: 'https://bills.parliament.uk/bills/3762',
      description: 'This bill aims to devolve responsibility for the Crown Estate in Wales to the Welsh Government, potentially impacting the management of Crown properties and assets in Wales.',
      votes: { yes: 0, no: 0 },
      comments: [],
      mpComment: ''
    }
  ];
  
  const mp: MP = {
    name: 'Emily Grey',
    constituency: 'Barrow in Furness',
    agreedWithConstituents: 75,
    disagreedWithConstituents: 20,
    noVote: 5
  };
  
  let laws = initialLaws;
  
  export function getLaws() {
    return laws;
  }
  
  export function getLaw(id: string) {
    return laws.find(law => law.id === id);
  }
  
  export function getMP() {
    return mp;
  }
  
  export function updateVotes(id: string, vote: 'yes' | 'no') {
    laws = laws.map(law =>
      law.id === id
        ? { ...law, votes: { ...law.votes, [vote]: law.votes[vote] + 1 } }
        : law
    );
  }
  
  export function addComment(id: string, comment: { text: string; author: string }) {
    laws = laws.map(law =>
      law.id === id
        ? { ...law, comments: [...law.comments, { id: Date.now().toString(), ...comment }] }
        : law
    );
  }
  
  