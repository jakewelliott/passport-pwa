import ListRow from '@/components/list-row';
import { Link } from 'react-router-dom';
import { useParks } from '@/hooks/queries/useParks';
import { dbg } from '@/lib/debug';

export default function Locations() {
	const { data: parks, isLoading } = useParks();
	dbg('RENDER', 'Locations');

	if (isLoading || !parks) return null;

	return (
		<>
			{parks.map((park) => (
				<div className='m-3' key={park.abbreviation}>
					<Link to={`/locations/${park.abbreviation}`} className='text-supporting_inactiveblue no-underline'>
						<ListRow>
							<div className='flex flex-col gap-1'>
								<h3>{park.name}</h3>
								<p>{park.city}, NC</p>
							</div>
						</ListRow>
					</Link>
				</div>
			))}
		</>
	);
}
