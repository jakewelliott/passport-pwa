import { NotesMiniTab } from '../locations/components/notes-minitab';

export const EditGeneralNotes = () => {
	return (
		<div className='container mx-auto'>
			<div className='flex h-[calc(100vh-1.5rem-100px)] flex-col'>
				<NotesMiniTab parkId={0} />
			</div>
		</div>
	);
};
