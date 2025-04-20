import { LoadingPlaceholder } from '@/components/loading-placeholder';
import RoundedButton from '@/components/rounded-button';
import { useUser } from '@/hooks/queries/useUser';
import DateHelper from '@/lib/date-helper';
import { dbg } from '@/lib/debug';
import type { UserProfile } from '@/types';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ClientInfo } from './components/client-info';
const InfoSection = ({ title, text }: { title: string; text: string }) => {
    return (
        <div className='grid w-full grid-cols-2'>
            <p className='text-left'>{title}:</p>
            <p className='text-right'>{text}</p>
        </div>
    );
};
const AccountInfo = ({ user }: { user: UserProfile }) => {
    return (
        <div className='w-full rounded-lg bg-main-blue p-4 text-system-white'>
            <InfoSection title='Username' text={user.username} />
            {user.role === 'admin' && <InfoSection title='Admin Account' text='Yes' />}
            <InfoSection title='Account Created' text={DateHelper.toStringShort(new Date())} />
        </div>
    );
};

export default function MyProfileScreen() {
    dbg('RENDER', '/more/my-profile');

    const { data: user, isLoading } = useUser();
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleLogout = () => {
        const popup = window.confirm('Are you sure you want to logout?');
        if (popup) {
            navigate('/logout');
        }
    };

    const handlePasswordChange = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    if (isLoading) return <LoadingPlaceholder what='your profile' />;

    return (
        <div className='flex h-full w-full flex-col items-center'>
            <div className='flex flex-grow flex-col items-center gap-3'>
                <h2>My Profile</h2>
                <div className='w-1/2 min-w-[300px] max-w-[450px]'>{user && <AccountInfo user={user} />}</div>
                <RoundedButton onClick={handlePasswordChange} title='Change Password' variant='wide' />
            </div>
            <div className='flex w-full max-w-[500px] flex-col items-center gap-4'>
                <h2>App Info</h2>
                <ClientInfo />
                <RoundedButton color='bg-secondary-orange' onClick={handleLogout} title='Logout' variant='wide' />
            </div>
            {isModalOpen && <PasswordChangeModal onClose={handleCloseModal} />}
        </div>
    );
}

function PasswordChangeModal({ onClose }: { onClose: () => void }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <div className='absolute top-0 left-0 flex h-svh w-svw items-center justify-center'>
            <div className='absolute top-0 left-0 h-svh w-svw bg-black opacity-50' />
            <div className='z-50 p-2'>
                <div className='flex w-full flex-col gap-4 rounded-lg bg-system-white p-6 '>
                    <h2>Change Password</h2>
                    <label htmlFor='currentPassword'>Current Password:</label>
                    <input
                        type='password'
                        id='currentPassword'
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className='h-8 w-64 rounded-lg outline'
                    />

                    <label htmlFor='newPassword'>New Password:</label>
                    <input
                        id='newPassword'
                        type='password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className='h-8 w-64 rounded-lg outline'
                    />
                    <label htmlFor='confirmPassword'>Confirm New Password:</label>
                    <input
                        type='password'
                        id='confirmPassword'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='h-8 w-64 rounded-lg outline'
                    />
                    <div className='mt-2 flex w-full justify-evenly'>
                        <RoundedButton color='bg-secondary-orange' variant='small' title={'Cancel'} onClick={onClose} />
                        <RoundedButton variant='small' title={'Save'} onClick={() => {}} />
                    </div>
                </div>
            </div>
        </div>
    );
}
