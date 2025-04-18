import { LinkRow } from '@/components/link-row';
import ListRow from '@/components/list-row';
import { dbg } from '@/lib/debug';
import { API_UPLOADGEO_URL, fetchPost } from '@/lib/fetch';

export const AdminPage = () => {
    dbg('RENDER', 'AdminPage');

    return (
        <div>
            <div className='flex flex-col gap-3.5' data-testid='more-list'>
                <LinkRow to={'/admin/edit-parks'} label='Edit Parks' />
                <LinkRow to={'/admin/edit-trails'} label='Edit Trails' />
                <LinkRow to={'/admin/edit-bucket-list'} label='Edit Bucket List' />
                <LinkRow to={'/admin/edit-users'} label='Edit Users' />
                <label className='cursor-pointer text-supporting-inactiveblue no-underline'>
                    <ListRow>
                        <h2 className='mx-4 my-6'>Upload GeoJson Data</h2>
                    </ListRow>
                    <input
                        type='file'
                        className='hidden'
                        onChange={async (event) => {
                            const file = event.target.files?.[0];
                            if (file) {
                                console.log('Selected file:', file);
                                console.log(await fetchPost(API_UPLOADGEO_URL, file));
                            }
                        }}
                    />
                </label>
            </div>
        </div>
    );
};
