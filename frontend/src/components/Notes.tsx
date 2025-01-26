import { useState, useEffect } from 'react';

export default function Notes() {
  const [note, setNote] = useState('');
  const [savedNote, setSavedNote] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('userNote');
    if (saved) {
      setSavedNote(saved);
    }
  }, []);

  const handleSaveNote = () => {
    localStorage.setItem('userNote', note);
    setSavedNote(note);
    setNote(''); // Clear input after saving
  };

  return (
    <div className='bg-gray-100 p-6'>
      <h1 className='mb-6 font-bold text-3xl text-gray-800'>My Notes</h1>
      <div className='mb-6 rounded-lg bg-white p-6 shadow-md'>
        <div className='space-y-4'>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder='Write your note here...'
            rows={4}
            className='w-full resize-none rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
          />
          <button
            onClick={handleSaveNote}
            type='button'
            className='w-full rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-600'
          >
            Save Note
          </button>
        </div>
        {savedNote && (
          <div className='mt-6 border-gray-200 border-t pt-6'>
            <h3 className='mb-3 font-semibold text-gray-700 text-xl'>Saved Note:</h3>
            <p className='whitespace-pre-wrap text-gray-600'>{savedNote}</p>
          </div>
        )}
      </div>
    </div>
  );
}
