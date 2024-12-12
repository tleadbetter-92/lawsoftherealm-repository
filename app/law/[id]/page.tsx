import { use } from 'react';
import LawPageContent from './LawPageContent';

export default function LawPage({ params }: { params: { id: string } }) {
  const id = use(Promise.resolve(params.id));
  
  return (
    <div>
      <LawPageContent id={id} />
    </div>
  );
}

