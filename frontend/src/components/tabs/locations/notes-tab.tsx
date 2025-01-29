import RoundedButton from '@/components/common/rounded-button';
import { a11yOnClick } from '@/lib/a11y';
import useNotesStore from '@/hooks/store/useNotesStore';
import type { ParkAbbreviation } from '@/lib/mock/types';

export const LocationNotes = ({ park_code }: { park_code: ParkAbbreviation }) => {
  const { notes, setNotes } = useNotesStore();

  const handleClick = () => {
    // TODO: the global store is already saved so we should prolly navigate or something
    alert('Notes saved!');
  };

  return (
    <div className='flex h-full flex-col'>
      <textarea
        className='h-72 w-full flex-grow resize-none border border-secondary_darkteal p-4 focus:border-secondary_darkteal focus:outline-none focus:ring-1 focus:ring-secondary_darkteal focus:ring-opacity-100'
        value={notes[park_code]}
        onChange={(e) => setNotes({ ...notes, [park_code]: e.target.value })}
        placeholder='Add some personal notes about this park!'
      />
      <div className='flex justify-center p-3' {...a11yOnClick(handleClick)}>
        <RoundedButton title={'Save'} />
      </div>
    </div>
  );
};
