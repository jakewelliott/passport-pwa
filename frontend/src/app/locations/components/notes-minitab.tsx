import RoundedButton from '@/components/rounded-button';
import { useNote, useUpdateNote } from '@/hooks/queries/useNotes';
import { dbg, dbgif } from '@/lib/debug';
// components/NotesMiniTab.tsx
import { useEffect, useState } from 'react';
import { useBeforeUnload } from 'react-router';
import { toast } from 'react-toastify';

export const NotesMiniTab = ({
    parkId,
}: {
    parkId: number;
}) => {
    const { data: remoteNote, refetch, isLoading } = useNote(parkId);
    const { mutate } = useUpdateNote();

    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [noteState, setNoteState] = useState('');

    useBeforeUnload(() => {
        if (hasUnsavedChanges) {
            return 'You have unsaved changes. Are you sure you want to leave?';
        }
    });

    useEffect(() => {
        dbg('EFFECT', 'NotesMiniTab');
        dbgif(isLoading, 'EFFECT', 'NotesMiniTab', 'Note is still loading!');

        // check and see if we got the note from the server
        if (remoteNote?.note === undefined) {
            dbg('EFFECT', 'NotesMiniTab', 'Note is still loading!');
        } else if (remoteNote.note !== noteState) {
            dbg('EFFECT', 'NotesMiniTab', 'Server note changed, updating state...');
            dbg('EFFECT', 'NotesMiniTab', `Remote note: ${remoteNote.note}`);
            dbg('EFFECT', 'NotesMiniTab', `Note state: ${noteState}`);
            setNoteState(remoteNote.note);
        }
    }, [remoteNote, isLoading]);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [hasUnsavedChanges]);

    // const blocker = useBlocker(
    //     ({ currentLocation, nextLocation }) => hasUnsavedChanges && currentLocation.pathname !== nextLocation.pathname,
    // );

    // useEffect(() => {
    //     if (blocker.state === 'blocked') {
    //         const proceed = window.confirm('You have unsaved changes. Are you sure you want to leave?');
    //         if (proceed) {
    //             blocker.proceed();
    //         } else {
    //             blocker.reset();
    //         }
    //     }
    // }, [blocker]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNoteState(e.target.value);
        setHasUnsavedChanges(true);
    };

    const handleClick = () => {
        mutate(
            { parkId, note: noteState },
            {
                onSuccess: () => {
                    refetch();
                    toast.success('Notes saved!');
                    setHasUnsavedChanges(false);
                },
                onError: () => {
                    toast.error('Failed to save notes');
                    dbg('ERROR', 'NotesMiniTab', 'Failed to save notes');
                },
            },
        );
    };

    if (isLoading) return <div>Loading...</div>;
    const placeholder = parkId === 0 ? 'Add some general notes!' : 'Add some personal notes about this park!';

    return (
        <div className='flex flex-col items-center gap-4 px-4 pt-4'>
            <textarea
                className='h-72 w-full flex-grow resize-none border border-secondary-darkteal bg-supporting-lightblue p-4 focus:border-secondary-darkteal focus:outline-none focus:ring-1 focus:ring-secondary-darkteal focus:ring-opacity-100'
                value={noteState}
                onChange={handleChange}
                placeholder={placeholder}
            />
            <RoundedButton title={'Save'} onClick={handleClick} />
        </div>
    );
};
