import { HikingEssentialItem } from "@/components/tabs/more/hiking-essential-item";

export const HikingEssentials = () => {
  return (
    <div className="max-w-4xl mx-auto p-6" lang="en">
      <h3 className="text-center mb-5 text-system_white p-3 bg-supporting_inactiveblue uppercase">WHAT TO PACK FOR A HIKE</h3>

      <div className="flex flex-wrap justify-center gap-6">
        
        <HikingEssentialItem
          imageSrc="/hiking-images/boot.svg"
          altText="Hiking boot"
          title="HIKING BOOTS"
          description="Make sure your boots are broken in before hitting the trails to prevent blisters and sore feet!"
        />

        <HikingEssentialItem
          imageSrc="/hiking-images/water-bottle.svg"
          altText="Water bottle"
          title="WATER"
          description="You need to drink about 1 liter of water per every 4-5 miles hiked. Don't forget water for your pet!"
        />

        <HikingEssentialItem
          imageSrc="/hiking-images/map-and-compass.svg"
          altText="Map and compass"
          title="MAP & COMPASS"
          description="Pick up a park map from the park's visitor center or download a digital version at ncparks.gov"
        />

        
        <HikingEssentialItem
          imageSrc="/hiking-images/snacks.svg"
          altText="Snacks"
          title="SNACKS"
          description="You can make your own trail mix with dark chocolate, almonds, raisins and unsalted popcorn!"
        />

        <HikingEssentialItem
          imageSrc="/hiking-images/rain-gear.svg"
          altText="Rain gear"
          title="RAIN GEAR"
          description="When hiking in wet weather, avoid wearing cotton - it traps water and takes a long time to dry."
        />

        <HikingEssentialItem
          imageSrc="/hiking-images/flashlight.svg"
          altText="Flashlight"
          title="FLASHLIGHT"
          description="Due to all the trees, the trails will get darker before the rest of the park."
        />

        <HikingEssentialItem
          imageSrc="/hiking-images/first-aid-kit.svg"
          altText="First aid kit"
          title="FIRST AID KIT"
          description="Make sure your kit has bandages, antiseptic, antihistamines, and tweezers."
        />

        <HikingEssentialItem
          imageSrc="/hiking-images/matches.svg"
          altText="Matches"
          title="MATCHES"
          description="Pack waterproof matches or carry them in a waterproof container."
        />

        <HikingEssentialItem
          imageSrc="/hiking-images/knife.svg"
          altText="Knife"
          title="KNIFE"
          description="Make sure your knife or multitool has a locking blade to prevent any injuries."
        />
      </div>
    </div>
  );
};
