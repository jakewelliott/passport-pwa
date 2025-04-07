import { useParams } from 'react-router-dom';

export default function EditPark() {
    const { id } = useParams();
    return (
        <div>
            <h1>Edit Park</h1>
            <p>Park ID: {id}</p>
        </div>
    );
}
