import { useUser } from '@/hooks/queries/useUser';
import { cn } from '@/lib/cn-helper';
import { FaStamp, FaUserShield } from 'react-icons/fa';
import { MdMoreHoriz } from 'react-icons/md';
import { TbMap } from 'react-icons/tb';
import { Link, useLocation } from 'react-router';

interface TabProps {
    name: string;
    path: string;
    roles: string[];
    icon: React.ReactNode;
}
const Tab = ({ tab, selected }: { tab: TabProps; selected: boolean }) => {
    return (
        <li key={tab.name}>
            <Link to={tab.path} style={{ textDecoration: 'none' }}>
                <div
                    className={cn(
                        'flex flex-col items-center p-2',
                        selected ? 'text-system-white' : 'text-supporting-inactiveblue',
                    )}
                >
                    {tab.icon}
                    <span className='p-mini'>{tab.name}</span>
                </div>
            </Link>
        </li>
    );
};

const TabBar = () => {
    const { isLoggedIn, data: user } = useUser();
    const location = useLocation();
    const isSelected = (tab: TabProps) => location.pathname.startsWith(tab.path);

    const tabs = [
        { name: 'Locations', path: '/locations', roles: ['admin', 'visitor'], icon: <TbMap size={'24px'} /> },
        { name: 'Stamps', path: '/stamps', roles: ['visitor'], icon: <FaStamp size={'24px'} /> },
        { name: 'Admin', path: '/admin', roles: ['admin'], icon: <FaUserShield size={'24px'} /> },
        { name: 'More', path: '/more', roles: ['admin', 'visitor'], icon: <MdMoreHoriz size={'24px'} /> },
    ];

    if (!isLoggedIn || !user) return null;

    return (
        <nav className='fixed bottom-0 h-16 w-full bg-secondary-darkteal'>
            <ul className='flex h-full items-center justify-around'>
                {tabs.map(
                    (tab) =>
                        tab.roles.includes(user.role) && <Tab key={tab.name} tab={tab} selected={isSelected(tab)} />,
                )}
            </ul>
        </nav>
    );
};

export default TabBar;
