import { use } from 'react';
import LawPageContent from './LawPageContent';

export default async function LawPage({ params }: { params: { id: string } }) {
  const id = params.id;
  
  return (
    <div>
      <LawPageContent id={id} />
    </div>
  );
}

