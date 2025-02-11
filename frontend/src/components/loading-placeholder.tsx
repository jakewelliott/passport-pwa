export const LoadingPlaceholder = ({ what }: { what?: string }) => {
	return (
		<div className='animate-pulse'>
			<div className='mb-4 h-32 rounded-md bg-gray-200' />
			<div className='mb-4 h-24 rounded-md bg-gray-200' />
			<div className='h-48 rounded-md bg-gray-200' />
			{what && <p className='text-center text-gray-500 text-sm'>Loading {what}...</p>}
		</div>
	);
};
