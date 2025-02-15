import { useUser } from '@/hooks/queries/useUser';
import { ReactNode } from 'react';

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	const { data: user, isLoading } = useUser();
	const showNavigation = user && !isLoading;

	if (!showNavigation) {
		return <div className="min-h-screen">{children}</div>;
	}

	return (
		<div className="min-h-screen">
			<div
				className="overflow-y-auto pt-12 pb-16 h-dvh"
			>
				{children}
			</div>
		</div>
	);
};

export default Layout; 