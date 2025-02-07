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

const formatTitle = (title: string) => {
  return title
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const Header = () => {
  const location = useLocation();
  var navBarTitle = "NC Parks";
  const pathPieces = location.pathname.split('/');
  const lastPiece = pathPieces.pop();
  if (pathPieces.includes("stamps"))
    navBarTitle = "My Stamps"
  else if (pathPieces.includes("more") && !lastPiece?.includes("more"))
    navBarTitle = formatTitle(lastPiece!)

  const isTopLevel = topLevelCheck(location.pathname);

  return (
    <div className='sticky top-0 right-0 left-0' style={{ zIndex: 9999 }}>
      <header className='flex items-center justify-center bg-secondary_darkteal p-4 relative' style={{ height: '50px' }}>
        {!isTopLevel && (
          <div className='absolute left-4'>
            <BackButton hidden={false} />
          </div>
        )}
        <h4 className='text-system_white'>{navBarTitle}</h4>
        <div className='absolute right-4 w-[70px]' /> {/* Placeholder for balance */}
      </header>
    </div>
  );
};


export default Header;
