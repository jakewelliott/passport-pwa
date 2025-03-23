import { LoadingPlaceholder } from '@/components/loading-placeholder';
import { SplashScreenView } from '@/components/splash-screen-view';
import { dbg } from '@/lib/debug';
import type { UseQueryResult } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { type To, useNavigate } from 'react-router-dom';
import { useBucketList } from './queries/useBucketList';
import { useGetAllNotes } from './queries/useNotes';
import { useParks } from './queries/useParks';

const DEFAULT_DELAY = 2000;

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
	what: string;
	delay?: number;
};

export const useTimeoutEffect = (callback: () => void, delay = DEFAULT_DELAY, deps?: any[]) => {
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
		dbg('LOADER', loader.what, v ? 'valid' : 'invalid');
		setValid(v);
		if (!v) {
			// refetch if specified
			if (loader.refetch) {
				dbg('LOADER', loader.what, 'refetching');
				hook.refetch();
			}

			// call fail callback if specified
			if (loader.onFail) {
				loader.onFail();
			}

			// log error if no fail callback/refetch specified
			if (!loader.onFail && !loader.refetch) {
				dbg('ERROR', loader.what, 'no fail callback/refetch specified!');
			}
		}
	};

	useTimeoutEffect(vaildate, loader.delay, [hook]);

	return valid ? children : <LoadingPlaceholder what={loader.what} />;
};

const nestLoaders = (loaders: Loader[], Around: React.ReactNode) =>
	loaders.reduce((acc, loader) => {
		const Loader = () => useLoader(loader, acc);
		return <Loader key={loader.what} />;
	}, Around);

const AllDone = ({ mark }: { mark: () => void }) => {
	useEffect(() => {
		mark();
	}, []);

	return <p>All done!</p>;
};

const APP_LOADERS: Loader[] = [
	{
		hook: useParks,
		validator: (hook) => hook?.data?.length !== undefined && hook?.data?.length > 0,
		what: 'parks',
		refetch: true,
	},
	{
		hook: useBucketList,
		validator: (hook) => hook?.data?.length !== undefined && hook?.data?.length > 0,
		what: 'bucket list',
		refetch: true,
	},
	{
		hook: useGetAllNotes,
		validator: (hook) => hook?.data?.length !== undefined && hook?.data?.length > 0,
		what: 'notes',
		refetch: true,
	},
];

export const useSplashScreen = () => {
	const [splashFinished, setSplashFinished] = useState(false);
	const allDone = <AllDone mark={() => setSplashFinished(true)} />;
	const loaders = nestLoaders(APP_LOADERS, allDone);

	const SplashScreen = () => <SplashScreenView>{loaders}</SplashScreenView>;

	return {
		SplashScreen,
		splashFinished,
	};
};
