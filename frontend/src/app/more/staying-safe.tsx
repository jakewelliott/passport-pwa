export default function StayingSafe() {
    const safetyRules = [
        'Alcohol is not allowed except on individual campsites.',
        'Follow the rules for boating and fishing from the NC Wildlife Resources Commission. Make sure you have a fishing license if you are fishing.',
        'Do not fly drones in the park.',
        'Only have fires in grills and fire rings, and keep an eye on them.',
        'Do not bring firewood from far away; get it locally or make sure it is treated.',
        'No fireworks or weapons. Handguns are allowed with a concealed carry permit in outdoor areas only.',
        "Watch out for snakes, poison ivy, and ticks. Check for ticks after you've been hiking.",
        'Bring enough water for you and your pets.',
        "Stick to the trails, and don't go near steep edges. Be careful on wet trails, rocks, and bridges.",
        "Plan your hikes ahead of time so you don't get caught by darkness.",
        "Always wear a life jacket when you are paddling, boating, or swimming, especially if you're not a strong swimmer. Kids under 13 years old are required to wear one.",
        'Do not go paddling alone.',
        'Keep your pets on a leash all the time.',
        'You can only climb in certain spots and must get a permit first.',
        'Swim only in designated areas. Be careful if there are no lifeguards.',
        'Keep the park clean by using the trash and recycling bins.',
        'Hunting or trapping animals is not allowed.',
        'Do not feed or try to touch the animals. Tell the park staff if you see any sick ones.',
    ];

    return (
        <>
            <h4 className='mb-6 w-full bg-supporting_inactiveblue p-3 text-center text-system_white uppercase'>
                How to Stay Safe While Visiting NC State Parks
            </h4>

            <p className='mb-6'>
                To keep everyone safe and protect our parks, please follow these rules and safety guidelines while
                you're here!
            </p>

            <ul className='space-y-1'>
                {safetyRules.map((rule) => (
                    <li key={rule} className='flex items-start'>
                        <span className='mr-2'>•</span>
                        <span>{rule}</span>
                    </li>
                ))}
            </ul>
        </>
    );
}
