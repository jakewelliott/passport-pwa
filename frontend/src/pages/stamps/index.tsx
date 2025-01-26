import { StampsOverview } from '../../components/tabs/stamps/stamps-overview';
import { useTitle } from '../../context/title-context';
import { useEffect } from 'react';

export default function Stamps() {
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle('Stamps');
  }, [setTitle]);

  return (
    <>
      <StampsOverview />
    </>
  );
}
