import RoundedButton from '@/components/common/rounded-button';
import { a11yOnClick } from '@/lib/a11y';
import { useParkNotesStore } from '@/hooks/store/useParkNotesStore';
import type { ParkAbbreviation } from '@/lib/mock/types';

export const NotesMiniTab = ({ abbreviation }: { abbreviation: ParkAbbreviation }) => {
  const { getNote, setNote } = useParkNotesStore();

  const handleClick = () => {
    // TODO: the global store is already saved so we should prolly navigate or something
    alert('Notes saved!');
  };

  return (
    <div className='flex h-full flex-col'>
      <textarea
        className='h-72 w-full flex-grow resize-none border border-secondary_darkteal p-4 focus:border-secondary_darkteal focus:outline-none focus:ring-1 focus:ring-secondary_darkteal focus:ring-opacity-100'
        value={getNote(abbreviation)}
        onChange={(e) => setNote(abbreviation, e.target.value)}
        placeholder='Add some personal notes about this park!'
      />
      <div className='flex justify-center p-3' {...a11yOnClick(handleClick)}>
        <RoundedButton title={'Save'} />
      </div>
    </div>
  );
};
