import { dbg } from '@/lib/debug';
import { LinkRow } from '@/components/link-row';

export const AdminPage = () => {
    dbg('RENDER', 'AdminPage');
    return (
        <div>
            Welcome to the Admin Page!!
            <div className='flex flex-col gap-3.5' data-testid='more-list'>
                <LinkRow to={'/admin/edit-parks'} label='Edit Parks' />
                <LinkRow to={'/admin/edit-trails'} label='Edit Trails' />
                <LinkRow to={'/admin/edit-bucket-list'} label='Edit Bucket List' />
                <LinkRow to={'/admin/edit-users'} label='Edit Users' />
                <LinkRow to={'/admin/upload-geo'} label='Upload GeoJson Data' />
            </div>
        </div>
    );
};
