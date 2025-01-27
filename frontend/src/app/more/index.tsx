import ListRow from '../../components/common/list-row';
import { Link } from 'react-router-dom';

export default function More() {
  return (
    <div className='mx-4 my-4 flex flex-col gap-3.5'>
      <Link to={'/more/trails'} className='text-supporting_inactiveblue no-underline'>
        <ListRow>
          <h2 className='mx-4 my-6'>Trails</h2>
        </ListRow>
      </Link>
      <Link to={'/more/bucket-list'} className='text-supporting_inactiveblue no-underline'>
        <ListRow>
          <h2 className='mx-4 my-6'>Bucket List</h2>
        </ListRow>
      </Link>
      <Link to={'/more/my-notes'} className='text-supporting_inactiveblue no-underline'>
        <ListRow>
          <h2 className='mx-4 my-6'>My Notes</h2>
        </ListRow>
      </Link>
      <Link to={'/more/welcome-message'} className='text-supporting_inactiveblue no-underline'>
        <ListRow>
          <h2 className='mx-4 my-6'>Welcome Message</h2>
        </ListRow>
      </Link>
      <Link to={'/more/staying-safe'} className='text-supporting_inactiveblue no-underline'>
        <ListRow>
          <h2 className='mx-4 my-6'>Staying Safe</h2>
        </ListRow>
      </Link>
      <Link to={'/more/hiking-essentials'} className='text-supporting_inactiveblue no-underline'>
        <ListRow>
          <h2 className='mx-4 my-6'>Hiking Essentials</h2>
        </ListRow>
      </Link>
      <Link to={'/more/icon-legend'} className='text-supporting_inactiveblue no-underline'>
        <ListRow>
          <h2 className='mx-4 my-6'>Icon Legend</h2>
        </ListRow>
      </Link>
      <Link to={'/more/app-info'} className='text-supporting_inactiveblue no-underline'>
        <ListRow>
          <h2 className='mx-4 my-6'>App Info</h2>
        </ListRow>
      </Link>
      <div className='text-center'>
        You are currently logged in as
        <br />
        Log Out
      </div>
    </div>
  );
}
