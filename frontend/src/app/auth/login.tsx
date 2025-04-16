import RoundedButton from '@/components/rounded-button';
import { useLogin } from '@/hooks/auth/useLogin';
import { useRegister } from '@/hooks/auth/useRegister';
import { useUser } from '@/hooks/queries/useUser';
import { cn } from '@/lib/cn-helper';
import { dbg } from '@/lib/debug';
import { useRef, useState } from 'react';
import { Navigate } from 'react-router';
import { toast } from 'react-toastify';
import { SuperAdminButton } from './components/superadmin-button';

const getInputStyles = (isError: boolean) =>
    cn(
        'w-full rounded-lg border p-3 focus:outline-none focus:ring-1 focus:ring-opacity-100',
        isError
            ? 'border-system-red focus:border-system-red ring-system-red ring-1'
            : 'border-system-gray focus:border-secondary-darkteal focus:ring-secondary-darkteal',
    );

// hook lives here since it's only used on this page
// const useRedirectIfLoggedIn = () => {
//     const navigate = useNavigate();
//     const { isLoggedIn } = useUser();

//     useEffect(() => {
//         dbg('EFFECT', 'LoginPage', 'checking if user logged in');
//         if (isLoggedIn) {
//             dbg('EFFECT', 'LoginPage', 'User already logged in, redirecting...');
//             navigate('/');
//         }
//     }, [isLoggedIn, navigate]);
// };

export default function LoginPage() {
    dbg('RENDER', '/login');
    const { isLoggedIn } = useUser();
    const [errors, setErrors] = useState({ username: false, password: false });
    const formRef = useRef<HTMLFormElement>(null);
    const loginMutation = useLogin();
    const registerMutation = useRegister();
    // useRedirectIfLoggedIn(); // redirect user if they are logged in

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

        if (!formRef.current) throw new Error('Form ref is not set');
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

    // if user is logged in, redirect to home page
    if (isLoggedIn) return <Navigate to='/' />;

    return (
        <div
            className='flex h-full items-center justify-center bg-center bg-cover bg-no-repeat p-12'
            style={{ backgroundImage: "url('/photos/SILA-BackCover.jpg')" }}
        >
            {!navigator.onLine && (
                <div className='flex max-w-80 flex-col items-center rounded-3xl bg-supporting-lightblue bg-opacity-75 p-8'>
                    <p className='pl text-center'>
                        It appears as though your device is offline. In order to log in to the application, you must be
                        online.
                    </p>
                </div>
            )}
            {navigator.onLine && (
                <form
                    ref={formRef}
                    className='flex flex-col items-center gap-3 rounded-3xl bg-supporting-lightblue bg-opacity-75 p-8'
                    onSubmit={handleAuth(true)}
                >
                    <input
                        type='text'
                        placeholder='Username'
                        name='username'
                        className={getInputStyles(errors.username)}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        className={getInputStyles(errors.password)}
                    />
                    <p className='text-center'>
                        By using this application, you agree to the State of NC's{' '}
                        <a
                            href='https://www.nc.gov/privacy'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-secondary-darkteal hover:underline'
                        >
                            Privacy Policy
                        </a>
                    </p>
                    <div className='flex flex-row gap-4'>
                        <RoundedButton type='button' title='Register' onClick={handleAuth(false)} />
                        <RoundedButton
                            type='submit'
                            title='Login'
                            color='bg-secondary-orange'
                            onClick={handleAuth(true)}
                        />
                    </div>
                    <SuperAdminButton />
                </form>
            )}
        </div>
    );
}
