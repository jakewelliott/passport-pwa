import { dbg } from '@/lib/debug';

interface Item {
    imageSrc: string;
    altText: string;
    title: string;
    description: string;
}

export const ItemView = ({ imageSrc, altText, title, description }: Item) => {
    return (
        <div className='w-[calc(50%-1rem)] min-w-[150px] max-w-[200px] rounded-lg'>
            <div className='flex flex-col items-center'>
                <div className='relative aspect-[1/.5] w-full rounded-t-full bg-supporting-lightblue'>
                    <img
                        src={imageSrc}
                        alt={altText}
                        className='absolute inset-0 h-[calc(100%+6px)] w-full object-contain'
                    />
                </div>
                <h4 className='min-h-[20px] w-full hyphens-auto break-words bg-supporting-inactiveblue p-1.5 text-center text-[clamp(11px,calc(24/550*100vw),24px)] text-system-white leading-[clamp(8px,calc(20/550*100vw),20px)]'>
                    {title}
                </h4>
                <p className='w-full bg-supporting-lightblue py-3 text-center text-[clamp(12px,calc(18/550*100vw),18px)] text-xs leading-[clamp(16px,calc(22/550*100vw),22px)]'>
                    {description}
                </p>
            </div>
        </div>
    );
};

const items: Item[] = [
    {
        imageSrc: '/icons/hiking/boot.svg',
        altText: 'Hiking boot',
        title: 'HIKING BOOTS',
        description: 'Make sure your boots are broken in before hitting the trails to prevent blisters and sore feet!',
    },
    {
        imageSrc: '/icons/hiking/water-bottle.svg',
        altText: 'Water bottle',
        title: 'WATER',
        description:
            "You need to drink about 1 liter of water per every 4-5 miles hiked. Don't forget water for your pet!",
    },
    {
        imageSrc: '/icons/hiking/map-and-compass.svg',
        altText: 'Map and compass',
        title: 'MAP & COMPASS',
        description: "Pick up a park map from the park's visitor center or download a digital version at ncparks.gov",
    },
    {
        imageSrc: '/icons/hiking/snacks.svg',
        altText: 'Snacks',
        title: 'SNACKS',
        description: 'You can make your own trail mix with dark chocolate, almonds, raisins and unsalted popcorn!',
    },
    {
        imageSrc: '/icons/hiking/rain-gear.svg',
        altText: 'Rain gear',
        title: 'RAIN GEAR',
        description: 'When hiking in wet weather, avoid wearing cotton - it traps water and takes a long time to dry.',
    },
    {
        imageSrc: '/icons/hiking/flashlight.svg',
        altText: 'Flashlight',
        title: 'FLASHLIGHT',
        description: 'Due to all the trees, the trails will get darker before the rest of the park.',
    },
    {
        imageSrc: '/icons/hiking/first-aid-kit.svg',
        altText: 'First aid kit',
        title: 'FIRST AID KIT',
        description: 'Make sure your kit has bandages, antiseptic, antihistamines, and tweezers.',
    },
    {
        imageSrc: '/icons/hiking/matches.svg',
        altText: 'Matches',
        title: 'MATCHES',
        description: 'Pack waterproof matches or carry them in a waterproof container.',
    },
    {
        imageSrc: '/icons/hiking/knife.svg',
        altText: 'Knife',
        title: 'KNIFE',
        description: 'Make sure your knife or multitool has a locking blade to prevent any injuries.',
    },
];
export const HikingEssentials = () => {
    dbg('RENDER', '/more/hiking-essentials');
    return (
        <>
            <h3 className='mb-5 bg-supporting-inactiveblue p-3 text-center text-system-white uppercase'>
                WHAT TO PACK FOR A HIKE
            </h3>

            <div className='flex flex-wrap justify-center gap-6'>
                {items.map((item) => (
                    <ItemView key={item.title} {...item} />
                ))}
            </div>
        </>
    );
};
