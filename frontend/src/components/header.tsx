import { useUser } from '@/hooks/queries/useUser';
import { usePageTitle } from '@/hooks/usePageTitle';
import { FaChevronLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { ManualStampButton } from './header-menu-button';

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
	const { data: user } = useUser();
	if (!user) return null;

	return (
		<div className='fixed top-0 right-0 left-0 z-50'>
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
				<div className='absolute right-4 w-[70px] bg-red-500' data-testid='balance-placeholder'>
					{pageTitle === 'Park Details' && <ManualStampButton />}
				</div>
			</header>
		</div>
	);
};

export default Header;
