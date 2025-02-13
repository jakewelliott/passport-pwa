import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoundedButton from '../../components/rounded-button';
import { a11yOnClick } from '@/lib/a11y';

export const EditGeneralNotes = () => {
	const navigate = useNavigate();
	const [generalNotes, setGeneralNotes] = useState<string>(() => localStorage.getItem('generalNotes') ?? '');

	const handleSaveNotes = () => {
		try {
			localStorage.setItem('generalNotes', generalNotes);
			navigate('/more/my-notes');
		} catch (error) {
			// Handle storage errors (e.g., quota exceeded)
			console.error('Failed to save notes:', error);
			// You might want to show a user-friendly error message here
		}
	};

	return (
		<div className='container mx-auto'>
			<div className='flex h-[calc(100vh-1.5rem-100px)] flex-col'>
				<textarea
					className=' w-full flex-grow resize-none border border-secondary_darkteal p-4 focus:border-secondary_darkteal focus:outline-none focus:ring-1 focus:ring-secondary_darkteal focus:ring-opacity-100'
					value={generalNotes}
					onChange={(e) => setGeneralNotes(e.target.value)}
					placeholder='Add some general notes!'
				/>
				<div className='flex justify-center p-3' {...a11yOnClick(() => handleSaveNotes())}>
					<RoundedButton title={'Save'} />
				</div>
			</div>
		</div>
	);
};
