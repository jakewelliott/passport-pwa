import { dbg } from '@/lib/debug';
import { NotesMiniTab } from '../locations/components/notes-minitab';

/**
 * General Notes screen
 *
 * Page for notes not associated with a specific park
 *
 * @returns {React.ReactNode} The general notes screen
 */
export const EditGeneralNotes = () => {
    dbg('RENDER', '/more/general-notes');
    return (
        <div className='container mx-auto'>
            <div className='flex h-[calc(100vh-1.5rem-100px)] flex-col'>
                <NotesMiniTab parkId={0} />
            </div>
        </div>
    );
};
