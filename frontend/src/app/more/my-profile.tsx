import { LoadingPlaceholder } from '@/components/loading-placeholder';
import RoundedButton from '@/components/rounded-button';
import { useUser } from '@/hooks/queries/useUser';
import { dbg } from '@/lib/debug';
import type { UserProfile } from '@/types';
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

    const handleLogout = () => {
        const popup = window.confirm('Are you sure you want to logout?');
        if (popup) {
            navigate('/logout');
        }
    };

    const handlePasswordChange = () => {
        // TODO: implement password change
    };

    if (isLoading) return <LoadingPlaceholder what='your profile' />;

    return (
        <div className='flex flex-col gap-4'>
            <h2>My Profile</h2>
            {user && <AccountInfo user={user} />}
            <RoundedButton onClick={handlePasswordChange} title='Change Password' />
            <RoundedButton onClick={handleLogout} title='Logout' />
        </div>
    );
}
