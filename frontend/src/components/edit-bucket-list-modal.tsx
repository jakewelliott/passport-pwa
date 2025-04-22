import { useParks } from '@/hooks/queries/useParks';
import type { BucketListItem, Park } from '@/types';
import { useEffect, useState } from 'react';
import { FormField } from './form-field';
import RoundedButton from './rounded-button';

const defaultItem: BucketListItem = {
    id: 0, // Use ID 0 for new items
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
    parkId: null,
    task: '',
};

interface EditBucketListItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    itemProp?: BucketListItem;
    isNew?: boolean;
}

export function EditBucketListItemModal({
    isOpen,
    onClose,
    itemProp = defaultItem,
    isNew = false,
}: EditBucketListItemModalProps) {
    const [editedItem, setEditedItem] = useState({ ...itemProp });
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState(false);
    const { data: parks } = useParks();
    const [selectedPark, setSelectedPark] = useState<Park | null>(
        editedItem.parkId ? parks?.find((x) => x.id === editedItem.parkId) || null : null,
    );

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300); // Match transition duration
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editedItem.task.trim()) {
            setError(true);
            return;
        }
        setError(false);
        // TODO: Implement bucket list item update mutation
        if (isNew) {
            // Handle creating a bucket list item
        } else {
            // Handle updating a bucket list item
        }
        onClose();
    };

    const handleDelete = () => {
        // handle deleting a bucket list item
        onClose();
    };

    const handleSelectedPark = () => {
        if (selectedPark) {
            setEditedItem((prev) => ({
                ...prev,
                parkId: selectedPark.id,
            }));
        } else {
            setEditedItem((prev) => ({
                ...prev,
                parkId: null,
            }));
        }
    };

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-system-black transition-opacity duration-300 ${isOpen ? 'bg-opacity-40' : 'bg-opacity-0'}`}
        >
            <div
                className={`m-auto flex max-w-96 transform flex-col items-center gap-3 rounded-3xl bg-supporting-lightblue bg-opacity-100 p-8 shadow-xl transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            >
                <h2>{isNew ? 'New Bucket List Item' : 'Edit Bucket List Item'}</h2>
                <div
                    className='absolute top-4 right-4 cursor-pointer text-h2'
                    onClick={onClose}
                    onKeyUp={(e) => e.key === 'Enter' && onClose()}
                    onKeyDown={(e) => e.key === 'Enter' && onClose()}
                    aria-label='Close'
                >
                    &times;
                </div>
                <form onSubmit={handleSubmit} className='w-full'>
                    <FormField
                        label='Task'
                        id='task'
                        value={editedItem.task}
                        onChange={(value) => {
                            setEditedItem((prev) => ({ ...prev, task: value }));
                            setError(false);
                        }}
                        error={error}
                    />
                    <div className='mt-4 w-full'>
                        <label htmlFor='park' className='block'>
                            Park
                        </label>
                        <select
                            value={selectedPark?.parkName || ''}
                            onChange={(e) => {
                                const icon = parks?.find((i) => i.parkName === e.target.value);
                                setSelectedPark(icon || null);
                                handleSelectedPark();
                            }}
                            id='park'
                            className='mt-1 w-full rounded-lg border border-system-gray p-3 focus:border-secondary-darkteal focus:outline-none focus:ring-1 focus:ring-secondary-darkteal focus:ring-opacity-100'
                        >
                            <option value=''>No Park Selected</option>
                            {parks?.map((park) => (
                                <option key={park.id} value={park.parkName}>
                                    {park.parkName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='mt-6 flex justify-end space-x-3'>
                        <RoundedButton title={'Cancel'} onClick={onClose} />
                        <RoundedButton title='Delete' color='bg-system-red' onClick={handleDelete} />
                    </div>
                    <div className='mt-6 flex justify-center space-x-3'>
                        <RoundedButton
                            type='submit'
                            title='Save Changes'
                            color='bg-secondary-orange'
                            onClick={handleSubmit}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
