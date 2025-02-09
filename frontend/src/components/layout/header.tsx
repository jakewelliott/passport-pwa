import { FaChevronLeft } from 'react-icons/fa6';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useNavigate } from 'react-router-dom';

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
  const { pageTitle, showBackButton } = usePageTitle();

  return (
    <div className='sticky top-0 right-0 left-0' style={{ zIndex: 9999 }}>
      <header
        className='relative flex items-center justify-center bg-secondary_darkteal p-4'
        style={{ height: '50px' }}
      >
        {showBackButton && (
          <div className='absolute left-4'>
            <BackButton hidden={false} />
          </div>
        )}
        <h4 className='text-system_white'>{pageTitle}</h4>
        <div className='absolute right-4 w-[70px]' /> {/* Placeholder for balance */}
      </header>
    </div>
  );
};

export default Header;
