import { usePageTitle } from '@/hooks/usePageTitle';
import { FaChevronLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { HeaderMenuButton } from './header-menu-button';

export const BackButton = ({ hidden }: { hidden: boolean }) => {
    const navigate = useNavigate();
    if (hidden) return <div />;
    return (
        <button onClick={() => navigate(-1)} className='flex items-center text-system_white' type='button'>
            <FaChevronLeft className='mr-1' data-testid='fa-chevron-left' />
            <span>Back</span>
        </button>
    );
};

const Header = () => {
    const { pageTitle, showBackButton } = usePageTitle();

    return (
        <header
            className='static top-0 flex w-full items-center justify-center bg-secondary_darkteal p-4'
            style={{ height: '50px' }}
        >
            {showBackButton && (
                <div className='absolute left-4'>
                    <BackButton hidden={false} />
                </div>
            )}
            <h4 className='text-system_white'>{pageTitle}</h4>
            <div className='absolute right-4' data-testid='balance-placeholder'>
                <HeaderMenuButton />
            </div>
        </header>
    );
};

export default Header;
