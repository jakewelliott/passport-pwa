import { useUser } from '@/hooks/queries/useUser';
import type { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const { data: user, isLoading } = useUser();
    const showNavigation = user && !isLoading;

    if (!showNavigation) {
        return <div className='min-h-screen'>{children}</div>;
    }

    return (
        <div className='min-h-screen'>
            <main className='layout no-scrollbar h-dvh overflow-y-auto pt-12 pb-16'>{children}</main>
        </div>
    );
};

export default Layout;
