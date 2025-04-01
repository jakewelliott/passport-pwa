import ListRow from '@/components/list-row';
import { Link } from 'react-router-dom';
import { LoggedInAs } from './components/logged-in-as';

const LinkRow = ({ to, label }: { to: string; label: string }) => (
    <Link to={to} className='text-supporting_inactiveblue no-underline'>
        <ListRow>
            <h2 className='mx-4 my-6'>{label}</h2>
        </ListRow>
    </Link>
);

export default function More() {
    return (
        <div className='mx-4 my-4 flex flex-col gap-3.5' data-testid='more-list'>
            <LinkRow to={'/more/trails'} label='Trails' />
            <LinkRow to={'/more/bucket-list'} label='Bucket List' />
            <LinkRow to={'/more/my-notes'} label='My Notes' />
            <LinkRow to={'/more/welcome-message'} label='Welcome Message' />
            <LinkRow to={'/more/staying-safe'} label='Staying Safe' />
            <LinkRow to={'/more/hiking-essentials'} label='Hiking Essentials' />
            <LinkRow to={'/more/icon-legend'} label='Icon Legend' />
            <LinkRow to={'/more/app-info'} label='App Info' />
            <LoggedInAs />
        </div>
    );
}
