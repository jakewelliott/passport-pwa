import { useUser } from "@/hooks/queries/useUser";
import { useLogout } from "@/hooks/auth/useLogout";

export const LoggedInAs = () => {
	const { data: user } = useUser();
	const logout = useLogout();

	// ADAM: jake, this component won't render if the user is not logged in. just leave this here for now pls. im so tired.
	const message = user?.username ? `You are currently logged in as '${user.username}'` : 'You are not logged in';

	return (
		<div className='text-center'>
			{message}
			<br />
			<button className='link' onClick={() => logout()} type='button'>Log out</button>
		</div>
	);
};
