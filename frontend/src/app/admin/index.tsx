import { dbg } from '@/lib/debug';
import { LinkRow } from '@/components/link-row';

export const AdminPage = () => {
    dbg('RENDER', 'AdminPage');
    return (
        <div>
            Welcome to the Admin Page!!
            <div className='flex flex-col gap-3.5' data-testid='more-list'>
                <LinkRow to={'/admin/edit-parks'} label='Edit Parks' />
                <LinkRow to={'/more/bucket-list'} label='Edit Trails' />
                <LinkRow to={'/more/my-notes'} label='Edit Users' />
                <LinkRow to={'/more/welcome-message'} label='Upload GeoJson Data' />
            </div>
        </div>
    );
};
