// components/NotesMiniTab.tsx
import { useEffect } from 'react';
import RoundedButton from '@/components/rounded-button';
import { a11yOnClick } from '@/lib/a11y';
import { useParkNotesStore } from '@/hooks/store/useParkNotesStore';
import { useNote, useUpdateNote } from '@/hooks/queries/useNotes';
import type { ParkAbbreviation } from '@/lib/mock/types';
import { toast } from 'react-toastify';

export const NotesMiniTab = ({ abbreviation, parkId }: { abbreviation: ParkAbbreviation; parkId: number }) => {
  const { getNote, setNote } = useParkNotesStore();
  const { data: remoteNote, isLoading } = useNote(parkId);
  const updateNoteMutation = useUpdateNote();

  useEffect(() => {
    if (remoteNote && remoteNote.note !== getNote(abbreviation)) {
      setNote(abbreviation, remoteNote.note);
    }
  }, [remoteNote, abbreviation, getNote, setNote]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNote = e.target.value;
    setNote(abbreviation, newNote);
    updateNoteMutation.mutate({ parkId, note: newNote });
  };

  const handleClick = () => {
    updateNoteMutation.mutate(
      { parkId, note: getNote(abbreviation) || '' },
      {
        onSuccess: () => toast.success('Notes saved!'),
        onError: () => toast.error('Failed to save notes'),
      },
    );
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='flex h-full flex-col'>
      <textarea
        className='h-72 w-full flex-grow resize-none border border-secondary_darkteal p-4 focus:border-secondary_darkteal focus:outline-none focus:ring-1 focus:ring-secondary_darkteal focus:ring-opacity-100'
        value={getNote(abbreviation) || ''}
        onChange={handleChange}
        placeholder='Add some personal notes about this park!'
      />
      <div className='flex justify-center p-3' {...a11yOnClick(handleClick)} data-testid='save-button'>
        <RoundedButton title={'Save'} />
      </div>
    </div>
  );
};
