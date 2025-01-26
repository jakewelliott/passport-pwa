import { useNavigate, useLocation } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa6';
import { useTitle } from '../../context/title-context';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const canGoBack =
    location.pathname !== '/' &&
    location.pathname !== '/stamps' &&
    location.pathname !== '/more' &&
    location.pathname !== '/locations';

  const { title } = useTitle();

  return (
    <div className='sticky top-0 right-0 left-0' style={{ zIndex: 9999 }}>
      <header className='flex items-center justify-between bg-secondary_darkteal p-4' style={{ height: '50px' }}>
        <div>
          {canGoBack && (
            <button onClick={() => navigate(-1)} className='flex items-center text-system_white'>
              <FaChevronLeft className='mr-1' />
              <span>Back</span>
            </button>
          )}
        </div>
        <h4 className='text-system_white'>{title}</h4>
        <div />
      </header>
    </div>
  );
};

export default Header;
