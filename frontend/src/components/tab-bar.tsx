import { useUser } from '@/hooks/queries/useUser';
import { FaStamp } from 'react-icons/fa';
import { MdMoreHoriz } from 'react-icons/md';
import { TbMap } from 'react-icons/tb';
import { Link, useLocation } from 'react-router-dom';

const TabBar = () => {
  const { data: user, isLoading } = useUser();
  if (!user || isLoading) return null;

  const location = useLocation();
  const tabs = [
    { name: 'Locations', path: '/locations', icon: <TbMap size={'24px'} />, roles: ['visitor', 'admin'] },
    { name: 'Stamps', path: '/stamps', icon: <FaStamp size={'24px'} />, roles: ['visitor'] },
    { name: 'More', path: '/more', icon: <MdMoreHoriz size={'24px'} />, roles: ['visitor', 'admin'] },
  ];

  return (
    <nav className='fixed right-0 bottom-0 left-0 bg-secondary_darkteal'>
      <ul className='flex h-16 items-center justify-around'>
        {tabs.map((tab) => (
          tab.roles.includes(user.role) && (
          <li key={tab.name}>
            <Link to={tab.path} style={{ textDecoration: 'none' }}>
              <div
                className={`flex flex-col items-center p-2 ${
                  location.pathname.startsWith(tab.path) ? 'text-system_white' : 'text-supporting_inactiveblue'
                }`}
              >
                {tab.icon}
                <span className='p-mini'>{tab.name}</span>
              </div>
            </Link>
          </li>
          )
        ))}
      </ul>
    </nav>
  );
};

export default TabBar;
