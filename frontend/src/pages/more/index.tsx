import { useEffect } from 'react';
import { useTitle } from '../../context/title-context';
import RoundedButton from '../../components/common/rounded-button';

export default function More() {
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle('More');
  }, [setTitle]);

  return (
    <>
      <h1>More</h1>
      <RoundedButton title='TEST' color='system_black' />
    </>
  );
}
