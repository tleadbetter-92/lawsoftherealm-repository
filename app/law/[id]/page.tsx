import LawPageContent from './LawPageContent';

type Props = {
  params: { id: string }
}

export default async function LawPage({ params }: Props) {
  const { id } = params;
  
  return (
    <div>
      <LawPageContent id={id} />
    </div>
  );
}

