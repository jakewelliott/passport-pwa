// TODO: make this the size of the screen and show a spinner
import { dbg } from '@/lib/debug';

/**
 * Loading Placeholder
 *
 * Shows a loading placeholder, used to show a loading state when data is loading
 *
 * @param {LoadingPlaceholderProps} props - The props for the loading placeholder
 */
export const LoadingPlaceholder = ({ what }: { what?: string }) => {
    dbg('RENDER', '<LoadingPlaceholder />', `for ${what}`);
    const whatText = what ? ` Loading ${what}...` : 'Loading...';
    return (
        <div className='animate-pulse' data-testid='loading-placeholder'>
            <p className='text-center text-gray-500 text-sm'>{whatText}</p>
        </div>
    );
};
