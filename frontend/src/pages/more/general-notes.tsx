import { useState, useEffect } from 'react';
import { useTitle } from '../../context/title-context';
import { useNavigate } from 'react-router-dom';
import RoundedButton from '../../components/common/rounded-button';

export const EditGeneralNotes = () => {
  const { setTitle } = useTitle();
  const [generalNotes, setGeneralNotes] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setTitle('Edit General Notes');
    const savedNotes = localStorage.getItem('generalNotes');
    if (savedNotes) {
      setGeneralNotes(savedNotes);
    }
  }, [setTitle]);

  const handleSaveNotes = (notes: string) => {
    setGeneralNotes(notes);
    localStorage.setItem('generalNotes', notes);
    navigate('/more/my-notes');
  };

  return (
    <div className="container mx-auto">
      <div className='flex h-[calc(100vh-1.5rem-100px)] flex-col'>
        <textarea
          className=' w-full flex-grow resize-none border border-secondary_darkteal p-4 focus:border-secondary_darkteal focus:outline-none focus:ring-1 focus:ring-secondary_darkteal focus:ring-opacity-100'
          value={generalNotes}
          onChange={(e) => setGeneralNotes(e.target.value)}
          placeholder='Add some general notes!'
        />
        <div
          className='flex justify-center p-3'
          onClick={() => handleSaveNotes(generalNotes)}
        >
          <RoundedButton title={'Save'} />
        </div>
      </div>
    </div>
  );
}