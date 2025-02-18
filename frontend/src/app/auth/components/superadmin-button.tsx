import RoundedButton from "@/components/rounded-button";
import { dbg, PRODUCTION } from "@/lib/debug";
import { useLogin } from "@/hooks/auth/useLogin";

const username = process.env.ADMIN_USER || '';
const password = process.env.ADMIN_PASS || '';

if (!username || !password) {
	dbg('MISC', 'SuperAdminButton', 'ADMIN_USER or ADMIN_PASS env var not set');
}

const credentials = { username, password };

export const SuperAdminButton = () => {

	const login = useLogin();
	if (PRODUCTION) return null;

	const handleClick = async (e: React.FormEvent) => {
		e.preventDefault();
		dbg('AUTH', 'SUPER ADMIN LOGIN', credentials);
		login.mutate(credentials);
	};

	return (
		<button type="button" onClick={handleClick} data-testid="super-admin-button">
			<RoundedButton title="SUPERADMIN" />
		</button>
	)
};
