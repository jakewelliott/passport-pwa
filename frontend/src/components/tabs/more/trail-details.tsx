interface TrailDetails {
    trailName: string;
    trailIcons: string[];
    distance: string;
    description: string;
}

interface TrailDetailsProps {
    trail: TrailDetails;
}

export const TrailDetails: React.FC<TrailDetailsProps> = ({ trail }) => {
    return (
        <p className="mb-2">
            <span className="text-secondary_orange">{trail.trailName}: </span>{' '}
            {trail.trailIcons.map((icon, index) => (
                <img
                    key={index}
                    src={`/park-icons/${icon}.png`}
                    alt={icon}
                    className="inline-block w-4 h-4 mx-1"
                />
            ))}{' '}
            <span className="text-secondary_orange">▪</span> {trail.distance} <span className="text-secondary_orange">▪</span> {trail.description}
        </p>
    );
}