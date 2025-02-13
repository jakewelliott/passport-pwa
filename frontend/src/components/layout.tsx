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
			{/* Main content area with proper spacing for fixed elements */}
			<div
				className="h-screen overflow-y-auto"
				style={{
					paddingTop: '50px',    // Height of header
					paddingBottom: '64px',  // Height of tab bar
					height: '100dvh'        // Use dynamic viewport height
				}}
			>
				{children}
			</div>
		</div>
	);
};

export default Layout; 