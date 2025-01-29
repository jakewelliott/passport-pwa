import { useNavigate, useLocation } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa6';

const topLevelCheck = (path: string) => path.split('/').length <= 2; // will split into ['', 'stamps']

const BackButton = ({ hidden }: { hidden: boolean }) => {
  const navigate = useNavigate();
  if (hidden) return <div />;
  return (
    <button onClick={() => navigate(-1)} className='flex items-center text-system_white' type='button'>
      <FaChevronLeft className='mr-1' />
      <span>Back</span>
    </button>
  );
};

const Header = () => {
  const location = useLocation();
  const locationName = location.pathname.split('/').pop()?.toUpperCase();

  return (
    <div className='sticky top-0 right-0 left-0' style={{ zIndex: 9999 }}>
      <header className='flex items-center justify-between bg-secondary_darkteal p-4' style={{ height: '50px' }}>
        <BackButton hidden={topLevelCheck(location.pathname)} />
        <h4 className='text-system_white'>{locationName}</h4>
        <div />
      </header>
    </div>
  );
};

export default Header;
