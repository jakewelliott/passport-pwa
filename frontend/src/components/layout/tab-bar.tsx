import { Link, useLocation } from 'react-router-dom';
import { TbMap } from "react-icons/tb";
import { MdMoreHoriz } from "react-icons/md";
import { FaStamp } from "react-icons/fa";

const TabBar = () => {
  const location = useLocation();

  const tabs = [
    { name: 'Stamps', path: '/stamps', icon: <FaStamp size={'24px'} /> },
    { name: 'Locations', path: '/locations', icon: <TbMap size={'24px'} /> },
    { name: 'More', path: '/more', icon: <MdMoreHoriz size={'24px'} /> }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-secondary_darkteal" style={{zIndex:'9998'}}>
      <ul className="flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <li key={tab.name}>
            <Link to={tab.path} style={{textDecoration: 'none'}}>
              <div className={`flex flex-col items-center p-2 ${
                location.pathname.startsWith(tab.path)
                ? 'text-system_white' 
                : 'text-supporting_inactiveblue'
              }`}>
                {tab.icon}
                <span className="p-mini">{tab.name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TabBar;
