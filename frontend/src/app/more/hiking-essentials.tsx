import { HikingEssentialItem } from '@/components/tabs/more/hiking-essential-item';

export const HikingEssentials = () => {
  return (
    <div className='mx-auto max-w-4xl p-6' lang='en'>
      <h3 className='mb-5 bg-supporting_inactiveblue p-3 text-center text-system_white uppercase'>
        WHAT TO PACK FOR A HIKE
      </h3>

      <div className='flex flex-wrap justify-center gap-6'>
        <HikingEssentialItem
          imageSrc='/icons/hiking/boot.svg'
          altText='Hiking boot'
          title='HIKING BOOTS'
          description='Make sure your boots are broken in before hitting the trails to prevent blisters and sore feet!'
        />

        <HikingEssentialItem
          imageSrc='/icons/hiking/water-bottle.svg'
          altText='Water bottle'
          title='WATER'
          description="You need to drink about 1 liter of water per every 4-5 miles hiked. Don't forget water for your pet!"
        />

        <HikingEssentialItem
          imageSrc='/icons/hiking/map-and-compass.svg'
          altText='Map and compass'
          title='MAP & COMPASS'
          description="Pick up a park map from the park's visitor center or download a digital version at ncparks.gov"
        />

        <HikingEssentialItem
          imageSrc='/icons/hiking/snacks.svg'
          altText='Snacks'
          title='SNACKS'
          description='You can make your own trail mix with dark chocolate, almonds, raisins and unsalted popcorn!'
        />

        <HikingEssentialItem
          imageSrc='/icons/hiking/rain-gear.svg'
          altText='Rain gear'
          title='RAIN GEAR'
          description='When hiking in wet weather, avoid wearing cotton - it traps water and takes a long time to dry.'
        />

        <HikingEssentialItem
          imageSrc='/icons/hiking/flashlight.svg'
          altText='Flashlight'
          title='FLASHLIGHT'
          description='Due to all the trees, the trails will get darker before the rest of the park.'
        />

        <HikingEssentialItem
          imageSrc='/icons/hiking/first-aid-kit.svg'
          altText='First aid kit'
          title='FIRST AID KIT'
          description='Make sure your kit has bandages, antiseptic, antihistamines, and tweezers.'
        />

        <HikingEssentialItem
          imageSrc='/icons/hiking/matches.svg'
          altText='Matches'
          title='MATCHES'
          description='Pack waterproof matches or carry them in a waterproof container.'
        />

        <HikingEssentialItem
          imageSrc='/icons/hiking/knife.svg'
          altText='Knife'
          title='KNIFE'
          description='Make sure your knife or multitool has a locking blade to prevent any injuries.'
        />
      </div>
    </div>
  );
};
