import RoundedButton from '@/components/rounded-button';
import { useLogin } from '@/hooks/auth/useLogin';
import { useRegister } from '@/hooks/auth/useRegister';
import { cn } from '@/lib/cn-helper';
import { dbg } from '@/lib/debug';
import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SuperAdminButton } from './components/superadmin-button';

const getInputStyles = (isError: boolean) =>
  cn(
    'w-80 rounded-lg border p-3 focus:outline-none focus:ring-1 focus:ring-opacity-100',
    isError
      ? 'border-system_red focus:border-system_red ring-system_red ring-1'
      : 'border-system_gray focus:border-secondary_darkteal focus:ring-secondary_darkteal',
  );

export default function LoginPage() {
  dbg('RENDER', 'LoginPage');
  const [errors, setErrors] = useState({ username: false, password: false });
  const [searchParams] = useSearchParams();
  if (!searchParams.get('redirect')) searchParams.set('redirect', '/');
  const formRef = useRef<HTMLFormElement>(null);
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const validateFields = (formData: FormData) => {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const newErrors = { username: !username, password: !password };
    setErrors(newErrors);

    if (newErrors.username || newErrors.password) {
      const missingFields = Object.entries(newErrors)
        .filter(([_, isError]) => isError)
        .map(([field]) => field.charAt(0).toUpperCase() + field.slice(1));

      toast.error(`${missingFields.join(' and ')} ${missingFields.length > 1 ? 'are' : 'is'} required.`);
      return false;
    }
    return { username, password };
  };

  const handleAuth = (isLogin: boolean) => async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const validatedData = validateFields(formData);
    if (!validatedData) return;

    const mutation = isLogin ? loginMutation : registerMutation;
    mutation.mutate(
      {
        ...validatedData,
      },
      {
        onError: (err) => {
          const errorMessage = err.message.toLowerCase();
          setErrors({
            username: errorMessage.includes('username') || errorMessage.includes('invalid'),
            password: errorMessage.includes('password'),
          });
        },
      },
    );
  };

  return (
    <div
      className='flex min-h-screen w-full items-center justify-center bg-center bg-cover bg-no-repeat'
      style={{ backgroundImage: "url('/photos/SILA-BackCover.jpg')" }}
    >
      <form
        ref={formRef}
        className='m-auto flex max-w-96 flex-col items-center gap-3 rounded-3xl bg-supporting_lightblue bg-opacity-75 p-8'
        onSubmit={handleAuth(true)}
      >
        <input type='text' placeholder='Username' name='username' className={getInputStyles(errors.username)} />
        <input type='password' placeholder='Password' name='password' className={getInputStyles(errors.password)} />
        <p className='text-center'>
          By using this application, you agree to the State of NC's{' '}
          <a
            href='https://www.nc.gov/privacy'
            target='_blank'
            rel='noopener noreferrer'
            className='text-secondary_darkteal hover:underline'
          >
            Privacy Policy
          </a>
        </p>
        <div className='flex flex-row gap-4'>
          <RoundedButton type='button' title='Register' onClick={handleAuth(false)} />
          <RoundedButton type='submit' title='Login' color='secondary_orange' onClick={handleAuth(true)} />
        </div>
        <SuperAdminButton />
      </form>
    </div>
  );
}
