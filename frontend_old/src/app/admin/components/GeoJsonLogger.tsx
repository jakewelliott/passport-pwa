import { useParksGeo } from '@/hooks/queries/useParks';

export const GeoJsonLogger = () => {
    const { data } = useParksGeo();

    return (
        <div>
            {data?.map((park) => {
                if (park.id !== 3) return null;
                console.log(park.boundaries);
                return (
                    <div key={park.id}>
                        <div>{park.abbreviation}</div>
                        <div>{park.parkName}</div>
                        <div>Lat: {park.coordinates.latitude}</div>
                        <div>Long: {park.coordinates.longitude}</div>
                    </div>
                );
            })}
        </div>
    );
};
