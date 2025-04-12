import { Link } from "react-router-dom";
import ListRow from "./list-row";

export const LinkRow = ({ to, label }: { to: string; label: string }) => (
    <Link to={to} className='text-supporting_inactiveblue no-underline'>
        <ListRow>
            <h2 className='mx-4 my-6'>{label}</h2>
        </ListRow>
    </Link>
);