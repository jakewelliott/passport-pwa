// TODO: make this the size of the screen and show a spinner
// and then use it instead of null to render a loading state
export const LoadingPlaceholder = ({ what }: { what?: string }) => {
	const whatText = what ? ` Loading ${what}...` : 'Loading...';
	return (
		<div className='animate-pulse' data-testid='loading-placeholder'>
			<p className='text-center text-gray-500 text-sm'>{whatText}</p>
		</div>
	);
};
