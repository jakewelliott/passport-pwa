import { dbg } from '@/lib/debug';
import { GeoJsonLogger } from './components/GeoJsonLogger';

export const AdminPage = () => {
    dbg('RENDER', 'AdminPage');
    return (
        <div>
            Welcome to the Admin Page!!
            <GeoJsonLogger />
        </div>
    );
};
