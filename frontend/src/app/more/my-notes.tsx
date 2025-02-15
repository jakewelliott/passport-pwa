import { useNavigate } from 'react-router-dom';
import ListRow from '../../components/list-row';
import { a11yOnClick } from '@/lib/a11y';
import { useParks } from '@/hooks/queries/useParks';
import { useParkNotesStore } from '@/hooks/store/useParkNotesStore';

export const MyNotes = () => {
  const navigate = useNavigate();
  const { getNote, getKeys } = useParkNotesStore();
  const { data: parks } = useParks();

  const generalNotes = getNote('generalNotes') || '';
  const allNotes = getKeys();
  console.log(allNotes);
  const parksWithNotes = parks?.filter((park) => allNotes.includes(park.id.toString())) || [];

  return (
    <div className='container mx-auto px-4 py-4'>
      <div className='space-y-4'>
        <div {...a11yOnClick(() => navigate('/more/my-notes/general-notes'))} className='cursor-pointer'>
          <ListRow>
            <div className='flex flex-col gap-1'>
              <h3>General Notes</h3>
              <p className='mb-2 text-gray-500 text-sm'>Last updated: Not available</p>
              <p className='overflow-wrap-anywhere line-clamp-3 max-w-full hyphens-auto break-words' style={{ hyphens: 'auto' }}>
                {generalNotes || 'No general notes yet'}
              </p>
            </div>
          </ListRow>
        </div>

        {/* Park Notes section */}
        {parksWithNotes.length === 0 ? (
          <p className='text-gray-600'>No park notes found.</p>
        ) : (
          parksWithNotes.map((park) => (
            <div key={park.id} {...a11yOnClick(() => navigate(`/locations/${park.id}?tab=notes`))} className='cursor-pointer'>
              <ListRow>
                <div className='flex flex-col gap-1'>
                  <h3>{park.parkName}</h3>
                  <p>{park.addresses[0]?.city}</p>
                  <p className='mb-2 text-gray-500 text-sm'>Last updated: Not available</p>
                  <p className='overflow-wrap-anywhere line-clamp-3 max-w-full hyphens-auto break-words' style={{ hyphens: 'auto' }}>
                    {getNote(park.id.toString())}
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
