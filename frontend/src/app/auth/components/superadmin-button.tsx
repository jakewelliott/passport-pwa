import RoundedButton from '@/components/rounded-button';
import { useLogin } from '@/hooks/auth/useLogin';
import { PRODUCTION, dbg } from '@/lib/debug';

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
    <div data-testid='button' onClick={handleClick}>
      <RoundedButton title='SUPERADMIN' />
    </div>
  );
};
