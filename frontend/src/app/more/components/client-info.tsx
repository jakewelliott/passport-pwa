import DateHelper from '@/lib/date-helper';

export const ClientInfo = () => {
    // TODO: there's definitely a better way to do this
    const appVersion = '1.0.0';
    // TODO: this doesn't work for some reason
    const connectionStatus = window.navigator.onLine ? 'Online' : 'Offline';
    // TODO: implement this
    const lastCached = DateHelper.toStringLong(new Date());

    return (
        <div className='grid w-full grid-cols-2'>
            <p>App Version:</p>
            <p className='text-right'>{appVersion}</p>
            <p>Connection Status:</p>
            <p className='text-right'>{connectionStatus}</p>
            <p>Last Cached:</p>
            <p className='text-right'>{lastCached}</p>
        </div>
    );
};
