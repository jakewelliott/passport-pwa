import { TrailDetails } from '@/components/tabs/more/trail-details';
import { TrailMap } from '@/components/tabs/more/trail-map';

export const Trails = () => {
  const trailDetails: TrailDetails[] = [
    {
      trailName: 'Dan River State Trail',
      trailIcons: ['Hiking'],
      distance: '90 miles',
      description: 'northern Piedmont Triad',
    },
    {
      trailName: 'Deep River State Trail',
      trailIcons: [],
      distance: '125 miles',
      description: 'Piedmont',
    },
    {
      trailName: 'East Coast Greenway State Trail',
      trailIcons: [],
      distance: '795 miles',
      description:
        'V-shaped: one arm through Raleigh, Durham and the Triangle and other arm through Albemarle and Pamlico Sounds, both meeting at Wilmington',
    },
    {
      trailName: 'Equine State Trail',
      trailIcons: [],
      distance: '350 miles',
      description: 'southern Piedmont',
    },
    {
      trailName: 'Fonta Flora State Trail',
      trailIcons: [],
      distance: '100 miles',
      description: 'Asheville and the Foothills / Lake James',
    },
    {
      trailName: 'French Broad River State Trail',
      trailIcons: [],
      distance: '117 miles',
      description: 'western border',
    },
    {
      trailName: 'Haw River State Trail',
      trailIcons: [],
      distance: '80 miles',
      description: 'Piedmont Triad / west of the Triangle',
    },
    {
      trailName: 'Hickory Nut Gorge State Trail',
      trailIcons: [],
      distance: '50 miles',
      description: 'southwest of Asheville',
    },
    {
      trailName: 'Mountains-to-Sea State Trail',
      trailIcons: [],
      distance: '1,400-miles',
      description: 'from Great Smoky Mountains National Park to the Outer Banks',
    },
    {
      trailName: 'Northern Peaks State Trail',
      trailIcons: [],
      distance: '40 miles',
      description: 'High Country',
    },
    {
      trailName: 'Overmountain Victory State Trail',
      trailIcons: [],
      distance: '225 miles',
      description: 'west',
    },
    {
      trailName: 'Roanoke River State Trail',
      trailIcons: [],
      distance: '132 miles',
      description: 'Albemarle Sound',
    },
    {
      trailName: 'Wilderness Gateway State Trail',
      trailIcons: [],
      distance: '170 miles',
      description: 'southwest of Asheville / the Foothills',
    },
    {
      trailName: 'Yadkin River State Trail',
      trailIcons: [],
      distance: '162 miles',
      description: 'Piedmont',
    },
  ];

  return (
    <div className='m-6'>
      {trailDetails.map((trail, index) => (
        <TrailDetails trail={trail} key={index} />
      ))}
      <img src='/TrailsLogo.svg' />
      <p className='text-center'>
        For maps and additional information on these state trails, please visit{' '}
        <a href='https://trails.nc.gov/state-trails' className='text-main_blue'>
          trails.nc.gov/state-trails
        </a>
      </p>
      <TrailMap />
    </div>
  );
};
