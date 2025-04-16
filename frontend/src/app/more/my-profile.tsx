import { LoadingPlaceholder } from '@/components/loading-placeholder';
import RoundedButton from '@/components/rounded-button';
import { useUser } from '@/hooks/queries/useUser';
import { dbg } from '@/lib/debug';
import type { UserProfile } from '@/types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AccountInfo = ({ user }: { user: UserProfile }) => {
    return (
        <div>
            <p>Username: {user.username}</p>
            <p>Role: {user.role}</p>
            {/* <p>Account created on: {DateHelper.toStringLong(user.createdAt)}</p> */}
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
        <div className='flex flex-col gap-4'>
            <h2>My Profile</h2>
            {user && <AccountInfo user={user} />}
            <RoundedButton onClick={handlePasswordChange} title='Change Password' />
            <RoundedButton onClick={handleLogout} title='Logout' />

            {isModalOpen && <PasswordChangeModal onClose={handleCloseModal} />}
        </div>
    );
}

function PasswordChangeModal({ onClose }: { onClose: () => void }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <div className='fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-system_black bg-opacity-50'>
            <div className='flex w-auto flex-col gap-4 rounded-lg bg-system_white p-5'>
                <h2>Change Password</h2>
                <div className='between flex w-full items-center justify-between'>
                    <label htmlFor='currentPassword'>Current Password:</label>
                    <input
                        type='password'
                        id='currentPassword'
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className='float-right ml-2 rounded-lg p-2 outline'
                    />
                </div>
                <div className='between flex w-full items-center justify-between'>
                    <label htmlFor='newPassword'>New Password:</label>
                    <input
                        id='newPassword'
                        type='password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className='float-right ml-2 rounded-lg p-2 outline'
                    />
                </div>
                <div className='between flex w-full items-center justify-between'>
                    <label htmlFor='confirmPassword'>Confirm New Password:</label>
                    <input
                        type='password'
                        id='confirmPassword'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='float-right ml-2 rounded-lg p-2 outline'
                    />
                </div>
                <div className='flex w-full justify-between'>
                    <RoundedButton title={'Cancel'} onClick={onClose} />
                    <RoundedButton title={'Save'} onClick={() => {}} color='secondary_orange'/>
                </div>
            </div>
        </div>
    );
}
