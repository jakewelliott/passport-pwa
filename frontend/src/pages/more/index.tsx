import { useEffect } from "react";
import { useTitle } from "../../context/title-context";
import ListRow from "../../components/common/list-row";
import { Link } from "react-router-dom";

export default function More() {
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle('More');
  }, [setTitle]);

  return (
    <div className="mx-4 my-4 gap-3.5 flex flex-col">
      <Link to={'/more/trails'} className="text-supporting_inactiveblue no-underline">
        <ListRow>
          <h2 className="my-6 mx-4">Trails</h2>
        </ListRow>
      </Link>
      <Link to={'/more/bucket-list'} className="text-supporting_inactiveblue no-underline">
        <ListRow>
          <h2 className="my-6 mx-4">Bucket List</h2>
        </ListRow>
      </Link>
      <Link to={'/more/my-notes'} className="text-supporting_inactiveblue no-underline">
        <ListRow>
          <h2 className="my-6 mx-4">My Notes</h2>
        </ListRow>
      </Link>
      <Link to={'/more/welcome-message'} className="text-supporting_inactiveblue no-underline">
        <ListRow>
          <h2 className="my-6 mx-4">Welcome Message</h2>
        </ListRow>
      </Link>
      <Link to={'/more/staying-safe'} className="text-supporting_inactiveblue no-underline">
        <ListRow>
          <h2 className="my-6 mx-4">Staying Safe</h2>
        </ListRow>
      </Link>
      <Link to={'/more/hiking-essentials'} className="text-supporting_inactiveblue no-underline">
        <ListRow>
          <h2 className="my-6 mx-4">Hiking Essentials</h2>
        </ListRow>
      </Link>
      <Link to={'/more/icon-legend'} className="text-supporting_inactiveblue no-underline">
        <ListRow>
          <h2 className="my-6 mx-4">Icon Legend</h2>
        </ListRow>
      </Link>
      <Link to={'/more/app-info'} className="text-supporting_inactiveblue no-underline">
        <ListRow>
          <h2 className="my-6 mx-4">App Info</h2>
        </ListRow>
      </Link>
      <div className="text-center">You are currently logged in as<br />Log Out</div>
    </div>
  );
}
