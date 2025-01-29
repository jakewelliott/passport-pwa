import { TrailIcon } from './common/trail-icons';

const IconBox = ({ children }: { children: React.ReactNode }) => {
  return <div className='flex flex-row items-center gap-2 rounded-md bg-secondary_lightgreen p-2'>{children}</div>;
};

export const Scratchpad = () => {
  console.log('Scratchpad');
  return (
    <div className='flex flex-col items-center gap-2'>
      <h1>Scratchpad</h1>
      <IconBox>
        <TrailIcon iconName='Hiking-Red' size='sm' showText />
        <TrailIcon iconName='Hiking-Red' size='sm' showText />
        <TrailIcon iconName='Hiking-Red' size='sm' showText />
      </IconBox>
      <IconBox>
        <TrailIcon iconName='Camping-Green' size='md' />
        <TrailIcon iconName='Camping-Green' size='md' />
        <TrailIcon iconName='Camping-Green' size='md' />
      </IconBox>
      <IconBox>
        <TrailIcon iconName='BoatRamp-Blue' size='lg' showText />
        <TrailIcon iconName='BoatRamp-Blue' size='lg' showText />
        <TrailIcon iconName='BoatRamp-Blue' size='lg' showText />
      </IconBox>
    </div>
  );
};
