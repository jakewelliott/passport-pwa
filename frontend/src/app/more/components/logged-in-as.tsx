import { useUser } from "@/hooks/queries/useUser";
import { useLogout } from "@/hooks/auth/useLogout";
import { dbg } from "@/lib/debug";

export const LoggedInAs = () => {
	const { data: user } = useUser();
	const logout = useLogout();

	const message = user?.username ? `You are currently logged in as '${user.username}'` : 'You are not logged in';

	return (
		<div className='text-center'>
			{message}
			<br />
			<button className='link' onClick={() => logout()} type='button'>Log out</button>
		</div>
	);
};
