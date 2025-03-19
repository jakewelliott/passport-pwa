import { useUser } from '@/hooks/queries/useUser';
import { useNavigate } from 'react-router-dom';

export const LoggedInAs = () => {
	const { data: user } = useUser();
	const navigate = useNavigate();


	const message = user?.username ? `You are currently logged in as '${user.username}'` : 'You are not logged in';

	return (
		<div className='text-center'>
			{message}
			<br />
			<button className='link' onClick={() => navigate('/logout')} type='button'>
				Log out
			</button>
		</div>
	);
};
