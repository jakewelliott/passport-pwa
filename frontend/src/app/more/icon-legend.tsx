import { IconSection } from '../../components/tabs/more/icon-section';

export const IconLegend = () => {
  return (
    <><h2 className='mt-4 mb-5 text-center'>Icon Legend</h2>
    <div className='flex flex-wrap justify-center'>
        <div className='flex-1 min-w-[250px]'>
          <IconSection sectionName={'Camping'} />
        </div>
        <div className='flex-1 min-w-[200px]'>
          <IconSection sectionName={'Activities'} />
        </div>
        <div className='flex-1 min-w-[200px]'>
          <IconSection sectionName={'Amenities'} />
        </div>
        <div className='flex-1 min-w-[200px]'>
          <IconSection sectionName={'State Trail Stamps'} />
        </div>
        <p className='m-4 flex-1 min-w-[200px]'>
          <span className='text-icon_amenities'>Kids TRACK Trail: </span>Kids in Parks is a group that creates outdoor
          adventures called TRACK trails for families all over the country. Each one has fun things to learn about nature
          as you walk. You can even earn prizes by keeping track of your adventures! Check out kidsinparks.com to find out
          more.
        </p>
    </div></>
  );
};
