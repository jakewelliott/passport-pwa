import { useEffect } from 'react';

import { useState } from 'react';

export default function SplashScreen() {
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
      </div>
    </div>
  );
}

export function SplashScreenWrapper(props: React.PropsWithChildren) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return loading ? <SplashScreen /> : <>{props.children}</>;
}
