import { LoadingPlaceholder } from '@/components/loading-placeholder';
import { useGetAllNotes } from '@/hooks/queries/useNotes';
import { useParks } from '@/hooks/queries/useParks';
import { a11yOnClick } from '@/lib/a11y';
import dateHelper from '@/lib/date-helper';
import type { ParkNote } from '@/types';
import { type NavigateFunction, useNavigate } from 'react-router-dom';
import ListRow from '../../components/list-row';

const isGeneralNote = (note: ParkNote) => {
    return note.parkId === 0;
};

const NoteRow = ({
    note,
    navigate,
}: {
    note: ParkNote;
    navigate: NavigateFunction;
}) => {
    const { data: parks } = useParks();
    console.log(parks);
    const navigateTo = isGeneralNote(note)
        ? '/more/my-notes/general-notes'
        : `/locations/${parks?.find((x) => x.id === note.parkId)?.abbreviation}?tab=notes`;

    const title = isGeneralNote(note) ? 'General Notes' : parks?.find((x) => x.id === note.parkId)?.parkName;

    return (
        <div key={note.parkId} {...a11yOnClick(() => navigate(navigateTo))} className={`cursor-pointer ${note.parkId}`}>
            <ListRow>
                <div className='flex flex-col gap-1'>
                    <h3>{title}</h3>
                    <p className='mb-2 text-gray-500 text-sm'>
                        Last updated:{' '}
                        {note.updatedAt ? dateHelper.toStringLong(new Date(note.updatedAt)) : 'Not Available'}
                    </p>
                    <p
                        className='overflow-wrap-anywhere line-clamp-3 max-w-full hyphens-auto break-words'
                        style={{ hyphens: 'auto' }}
                    >
                        {note.note}
                    </p>
                </div>
            </ListRow>
        </div>
    );
};

export const MyNotes = () => {
    const navigate = useNavigate();
    const { data: remoteNotes, isLoading } = useGetAllNotes();

    const generalNote = remoteNotes?.find((note) => isGeneralNote(note));
    const restOfNotes = remoteNotes?.filter((note) => !isGeneralNote(note)) || [];
    const allNotes = [generalNote, ...restOfNotes];

    // TODO: restore general note functionality
    // we are going to use parkID of 0 for this

    if (isLoading) return <LoadingPlaceholder what='notes' />;

    return (
        <div className='container mx-auto px-4 py-4'>
            <div className='space-y-4'>
                {allNotes?.length === 0 ? (
                    <p className='text-gray-600'>No park notes found.</p>
                ) : (
                    allNotes?.map((note) => note && <NoteRow key={note.parkId} note={note} navigate={navigate} />)
                )}
            </div>
        </div>
    );
};
