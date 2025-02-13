import RoundedButton from "@/components/rounded-button";
import { dbg } from "@/lib/debug";
import { useLogin } from "@/hooks/auth/useLogin";
import { DEBUG } from "@/lib/debug";

const username = process.env.ADMIN_USER || 'superadmin';
const password = process.env.ADMIN_PASS || 'adminpassword';
const credentials = { username, password };

export const SuperAdminButton = () => {

	dbg('RENDER', 'SuperAdminButton', credentials);

	const login = useLogin();

	if (!DEBUG) return null;

	const handleClick = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log('WTF!!!');
		dbg('AUTH', 'SUPER ADMIN BUTTON', credentials);
		login.mutate(credentials);
	};

	return (
		<button type="button" onClick={handleClick}>
			<RoundedButton title="SUPERADMIN" />
		</button>
	)
};
