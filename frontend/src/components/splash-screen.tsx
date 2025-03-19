import { dbg } from '@/lib/debug';
import { useEffect } from 'react';

import { useState } from 'react';

export const SplashScreen = ({ loadingMsg }: { loadingMsg?: string }) => {
  return (
    <div
      className='fixed inset-0 flex flex-col items-center bg-no-repeat'
      style={{
        backgroundImage: "url('/photos/CRMO_FrontCover.jpg')",
        backgroundSize: '150%',
        backgroundPosition: 'center 25%',
        zIndex: 9999,
      }}
    >
      <div className='flex h-2/4 flex-col items-center justify-center'>
        <img
          src='/DPRLogoWhite.svg'
          alt='North Carolina Department of Parks and Rec White Logo'
          width='136'
          height='103'
        />
        <h3>North Carolina State Parks</h3>
        <p className='script' style={{ paddingTop: 30 }}>
          Passport
        </p>
        {loadingMsg && <p>Loading {loadingMsg}...</p>}
      </div>
    </div>
  );
};

export const SplashScreenWrapper = (props: React.PropsWithChildren) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dbg('EFFECT', 'SplashScreenWrapper', 'waiting...');
    const timer = setTimeout(() => {
      dbg('EFFECT', 'SplashScreenWrapper', 'done waiting');
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return loading ? <SplashScreen /> : <>{props.children}</>;
};
