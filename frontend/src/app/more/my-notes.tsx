import { LoadingPlaceholder } from '@/components/loading-placeholder';
import { useGetAllNotes } from '@/hooks/queries/useNotes';
import { a11yOnClick } from '@/lib/a11y';
import dateHelper from '@/lib/date-helper';
import { useNavigate } from 'react-router-dom';
import ListRow from '../../components/list-row';

const generalNote = (
	<ListRow>
		<div className='flex flex-col gap-1'>
			<h3>General Notes</h3>
			<p className='mb-2 text-gray-500 text-sm'>
				Last updated:{' '}
				{/* {generalNotesUpdated != undefined ? dateHelper.toStringLong(new Date(generalNotesUpdated)) : 'Not Available'} */}
			</p>
			<p
				className='overflow-wrap-anywhere line-clamp-3 max-w-full hyphens-auto break-words'
				style={{ hyphens: 'auto' }}
			>
				{/* {generalNotes || 'No general notes yet'} */}
			</p>
		</div>
	</ListRow>
);

export const MyNotes = () => {
	const navigate = useNavigate();
	const { data: remoteNotes, refetch, isLoading } = useGetAllNotes();

	// TODO: restore general note functionality
	// we are going to use parkID of 0 for this

	if (isLoading) return <LoadingPlaceholder what='notes' />;

	return (
		<div className='container mx-auto px-4 py-4'>
			<div className='space-y-4'>
				<div {...a11yOnClick(() => navigate('/more/my-notes/general-notes'))} className='cursor-pointer'>
					{generalNote}
				</div>
				{/* Park Notes section */}

				{remoteNotes?.length === 0 ? (
					<p className='text-gray-600'>No park notes found.</p>
				) : (
					remoteNotes?.map((park) => (
						<div
							key={park.parkAbbreviation}
							{...a11yOnClick(() => navigate(`/locations/${park.parkAbbreviation}?tab=notes`))}
							className='cursor-pointer'
						>
							<ListRow>
								<div className='flex flex-col gap-1'>
									<h3>{park.parkAbbreviation}</h3>
									<p className='mb-2 text-gray-500 text-sm'>
										Last updated:{' '}
										{park.updatedAt
											? dateHelper.toStringLong(new Date(park.updatedAt))
											: 'Not Available'}
									</p>
									<p
										className='overflow-wrap-anywhere line-clamp-3 max-w-full hyphens-auto break-words'
										style={{ hyphens: 'auto' }}
									>
										{park.note}
									</p>
								</div>
							</ListRow>
						</div>
					))
				)}
			</div>
		</div>
	);
};
