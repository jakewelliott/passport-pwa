interface IconSectionProps {
    sectionName: string;
}

interface Icon {
    fileName: string;
    iconName: string;
    extraText?: string;
}

interface IconSection {
    sectionName: string;
    icons: Icon[];
}

export const IconSection: React.FC<IconSectionProps> = ({ sectionName }) => {
    const allIcons: IconSection[] = [
        {
            sectionName: "Camping",
            icons: [
                {
                    fileName: "CamperCabins-Green.svg",
                    iconName: "Camper cabins",
                },
                {
                    fileName: "EquestrianCamping-Green.svg",
                    iconName: "Equestrian camping",
                },
                {
                    fileName: "GroupCabins-Green.svg",
                    iconName: "Group cabins",
                },
                {
                    fileName: "GroupCamp-Green.svg",
                    iconName: "Group camping",
                },
                {
                    fileName: "CanoeinCamping-Green.svg",
                    iconName: "Paddle-in camping",
                },
                {
                    fileName: "PrimitiveCabin-Green.svg",
                    iconName: "Primitive cabins",
                },
                {
                    fileName: "RVCamping-Green.svg",
                    iconName: "RV hookup camping*",
                    extraText: "*has electric, water, AND/OR sewer hookups. Check with reservations website for available hookups"
                },
                {
                    fileName: "Camping-Green.svg",
                    iconName: "Tent camping",
                },
                {
                    fileName: "VacationCabin-Green.svg",
                    iconName: "Vacation cabins",
                },
            ]
        },
        {
            sectionName: "Activities",
            icons: [
                {
                    fileName: "Biking-Red.svg",
                    iconName: "Biking",
                },
                {
                    fileName: "Fishing-Red.svg",
                    iconName: "Fishing",
                },
                {
                    fileName: "Hiking-Red.svg",
                    iconName: "Hiking",
                },
                {
                    fileName: "HorsebackRiding-Red.svg",
                    iconName: "Horseback riding",
                },
                {
                    fileName: "Paddling-Red.svg",
                    iconName: "Paddling",
                },
                {
                    fileName: "Picnicking-Red.svg",
                    iconName: "Picnicking",
                },
                {
                    fileName: "RockClimbing-Red.svg",
                    iconName: "Rock climbing",
                },
                {
                    fileName: "Swimming-Red.svg",
                    iconName: "Swimming",
                },
            ]
        },
        {
            sectionName: "Amenities",
            icons: [
                {
                    fileName: "BoatRamp-Blue.svg",
                    iconName: "Boat ramp",
                },
                {
                    fileName: "Exhibits-Blue.svg",
                    iconName: "Exhibits",
                },
                {
                    fileName: "BoatRental-Blue.svg",
                    iconName: "Paddle equipment rental",
                },
                {
                    fileName: "Playground-Blue.svg",
                    iconName: "Playground",
                },
                {
                    fileName: "VisitorCenter-Blue.svg",
                    iconName: "Visitor center",
                },
            ]
        },
        {
            sectionName: "State Trail Stamps",
            icons: [
                {
                    fileName: "FFST-Blaze.svg",
                    iconName: "Fonta Flora",
                },
                {
                    fileName: "FBST-Blaze.svg",
                    iconName: "French Broad River",
                },
                {
                    fileName: "HGST-Blaze.svg",
                    iconName: "Hickory Nut Gorge",
                },
                {
                    fileName: "MST-Blaze.svg",
                    iconName: "Mountains-to-Sea",
                },
                {
                    fileName: "YRST-Blaze.svg",
                    iconName: "Yadkin River",
                },
            ]
        }
    ];

    const section = allIcons.find(section => section.sectionName === sectionName);

    if (!section) {
        return null;
    }

    return (
        <div className="m-4">
            <h4 className={`pb-3 text-icon_${sectionName.toLowerCase()}`}>{sectionName}</h4>
            {section.icons.map((icon, index) => (
                <div key={index} className="my-1 flex items-center">
                    <img 
                        src={`../park-icons/${icon.fileName}`} 
                        alt={icon.iconName} 
                        width={'36px'} 
                        height={'36px'} 
                    />
                    <div className="w-full flex flex-col justify-center ml-2">
                        <p>{icon.iconName}</p>
                        {icon.extraText && <p className="p-mini">{icon.extraText}</p>}
                    </div>
                </div>
            ))}
        </div>
    );
}
