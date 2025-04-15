// ADAM: i made this a while ago before seeing you made the table stuff

// import { LoadingPlaceholder } from '@/components/loading-placeholder';
// import { useParks } from '@/hooks/queries/useParks';
// import type { Park } from '@/types';
// import { useState } from 'react';
// import { EditParkForm } from './components/park-form';

// const NEW_PARK_ID = Date.now();

// const ParkDropdown = ({ parks, id, setId }: { parks: Park[]; id: number; setId: (id: number) => void }) => {
//     return (
//         <select value={id} onChange={(e) => setId(parseInt(e.target.value))}>
//             {parks.map((park) => (
//                 <option key={park.id} value={park.id}>
//                     {park.abbreviation} - {park.parkName}
//                 </option>
//             ))}
//             <option value={NEW_PARK_ID}>Create a new park</option>
//         </select>
//     );
// };

// export default function EditPark() {
//     const { data: parks, refetch } = useParks();

//     if (!parks) return <LoadingPlaceholder what={'all parks'} />;

//     const [id, setId] = useState<number>(1);
//     // ADAM: this is like, really bad, but i dont want tsc to scream at me
//     const selectedPark = parks.find((park) => park.id === id);

//     return (
//         <div>
//             <ParkDropdown parks={parks} id={id} setId={setId} />
//             {selectedPark ? <EditParkForm park={selectedPark} refetch={refetch} /> : <p>No park selected</p>}
//         </div>
//     );
// }
