import { LoadingPlaceholder } from '@/components/loading-placeholder';
import { useNotes } from '@/hooks/queries/useNotes';
import { useParks } from '@/hooks/queries/useParks';
import { a11yOnClick } from '@/lib/a11y';
import dateHelper from '@/lib/date-helper';
import { dbg } from '@/lib/debug';
import type { ParkNote } from '@/types';
import { useMemo } from 'react';
import { type NavigateFunction, useNavigate } from 'react-router';
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
    const { data: parks, parkIdToAbbreviation } = useParks();

    dbg('RENDER', 'NoteRow', `park: ${note.parkId}`);

    const navigateTo = useMemo(() => {
        return isGeneralNote(note)
            ? '/more/my-notes/general-notes'
            : `/locations/${parkIdToAbbreviation(note.parkId)}?tab=notes`;
    }, [note, parkIdToAbbreviation]);

    const title = useMemo(() => {
        return isGeneralNote(note) ? 'General Notes' : parks?.find((x) => x.id === note.parkId)?.parkName;
    }, [note, parks]);

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
    dbg('RENDER', '/notes');
    const navigate = useNavigate();
    const { data, isLoading } = useNotes();

    const generalNote = data?.find((note) => isGeneralNote(note));
    const restOfNotes = data?.filter((note) => !isGeneralNote(note)) ?? [];
    const allNotes = [generalNote, ...restOfNotes];

    if (isLoading) return <LoadingPlaceholder what='notes' />;

    dbg('RENDER', '/notes', `allNotes: ${allNotes?.length}`);

    return (
        <div className='space-y-4'>
            {allNotes?.length === 0 ? (
                <p className='text-gray-600'>No park notes found.</p>
            ) : (
                allNotes?.map((note) => note && <NoteRow key={note.parkId} note={note} navigate={navigate} />)
            )}
        </div>
    );
};
