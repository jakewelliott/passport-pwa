import { SplashScreen } from '@/components/splash-screen';
import { dbg } from '@/lib/debug';
import type { UseQueryResult } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { type To, useNavigate } from 'react-router-dom';
import { useBucketList } from './queries/useBucketList';
import { useParks } from './queries/useParks';

interface LoadableHook {
	data: any[] | undefined;
	isLoading: boolean;
	refetch: () => void;
}

type Loader = {
	hook: () => LoadableHook | UseQueryResult<any[], Error>;
	validator: (hook: LoadableHook | UseQueryResult<any[], Error>) => boolean;
	onFail?: () => void;
	refetch?: boolean;
	message: string;
	delay?: number;
};

export const useTimeoutEffect = (callback: () => void, delay: number, deps?: any[]) => {
	const d = [callback, delay, ...(deps ?? [])];

	useEffect(() => {
		const timeout = setTimeout(callback, delay);
		return () => clearTimeout(timeout);
	}, d);
};

export const useTimeoutEffectReroute = (route: To, delay: number) => {
	const navigate = useNavigate();
	useTimeoutEffect(() => navigate(route ?? '/'), delay);
};

export const useLoader = (loader: Loader, children: React.ReactNode) => {
	const hook = loader.hook();
	const [valid, setValid] = useState(false);

	const vaildate = () => {
		const v = loader.validator(hook);
		dbg('LOADER', loader.message, v ? 'valid' : 'invalid');
		setValid(v);
		if (!v) {
			// refetch if specified
			if (loader.refetch) {
				dbg('LOADER', loader.message, 'refetching');
				hook.refetch();
			}

			// call fail callback if specified
			if (loader.onFail) {
				loader.onFail();
			}

			// log error if no fail callback/refetch specified
			if (!loader.onFail && !loader.refetch) {
				dbg('ERROR', loader.message, 'no fail callback/refetch specified!');
			}
		}
	};

	useTimeoutEffect(vaildate, loader.delay || 50, [hook]);

	return valid ? children : <h2 className='text-center'>Loading your {loader.message}</h2>;
};

const nestLoaders = (loaders: Loader[], Around: React.ReactNode) =>
	loaders.reverse().reduce((acc, loader) => {
		const Loader = () => useLoader(loader, acc);
		return <Loader key={loader.message} />;
	}, Around);

const Kernel = () => {
	return <SplashScreen />;
};

const loaders: Loader[] = [
	{
		hook: useParks,
		validator: (hook) => hook?.data?.length !== undefined && hook?.data?.length > 0,
		message: 'parks',
		refetch: true,
	},
	{
		hook: useBucketList,
		validator: (hook) => hook?.data?.length !== undefined && hook?.data?.length > 0,
		message: 'bucket list',
		refetch: true,
	},
];
const useLoaders = () => nestLoaders(loaders, <Kernel />);

export const Loaders = () => useLoaders();
