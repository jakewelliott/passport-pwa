import { LinkRow } from '@/components/link-row';
import { dbg } from '@/lib/debug';

/**
 * More page
 *
 * List of misc pages
 *
 * @returns {React.ReactNode} The more page
 */
export default function More() {
    dbg('RENDER', '/more');
    return (
        <div className='flex flex-col gap-3.5' data-testid='more-list'>
            <LinkRow to={'/more/trails'} label='Trails' />
            <LinkRow to={'/more/bucket-list'} label='Bucket List' />
            <LinkRow to={'/more/my-notes'} label='My Notes' />
            <LinkRow to={'/more/welcome-message'} label='Welcome Message' />
            <LinkRow to={'/more/staying-safe'} label='Staying Safe' />
            <LinkRow to={'/more/hiking-essentials'} label='Hiking Essentials' />
            <LinkRow to={'/more/icon-legend'} label='Icon Legend' />
            <LinkRow to={'/more/ncdpr-info'} label='NCDPR Info' />
            <LinkRow to={'/more/my-profile'} label='My Profile' />
        </div>
    );
}
