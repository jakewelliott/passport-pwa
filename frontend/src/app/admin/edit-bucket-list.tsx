import { useBucketListItems } from '@/hooks/queries/useBucketList';
import { useParks } from '@/hooks/queries/useParks';
import type { BucketListItem } from '@/types/tables';
import { type MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';

const EditBucketList = () => {
    const { data: items } = useBucketListItems();
    const { data: parks } = useParks();
    const [editedItems, setEditedItems] = useState<BucketListItem[]>([]);
    const [allItems, setAllItems] = useState<BucketListItem[]>(items || []);

    useEffect(() => {
        if (items) {
            setAllItems(() => items.map((item) => editedItems.find((ep) => ep.id === item.id) || item));
        }
    }, [items, editedItems]);

    const handleAddNewItem = () => {
        // Create a blank item object with default values
        const newItem: BucketListItem = {
            id: Date.now(), // Use timestamp as unique ID
            task: '',
            parkId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            deleted: false,
        };

        // Add the new item to the beginning of the allItems array
        setAllItems((prev) => [newItem, ...prev]);
    };

    const handleInputChange = (itemId: number, path: string, value: unknown) => {
        setAllItems((prev) =>
            prev.map((item) =>
                item.id === itemId
                    ? {
                          ...item,
                          [path]: value,
                      }
                    : item,
            ),
        );
    };

    const handleInputBlur = (itemId: number, path: string, value: any) => {
        setEditedItems((prev) => {
            const originalItem = items?.find((p) => p.id === itemId);
            if (!originalItem) return prev;

            const itemIndex = prev.findIndex((p) => p.id === itemId);
            const baseItem = itemIndex === -1 ? originalItem : prev[itemIndex];
            const newItem = structuredClone(baseItem);

            setDeepProperty(newItem, path, value);

            return itemIndex === -1 ? [...prev, newItem] : prev.map((p) => (p.id === itemId ? newItem : p));
        });
    };

    function handleSave(editedItems: BucketListItem[]): void {
        console.log(editedItems);
    }

    const setDeepProperty = (obj: Record<string, any>, path: string, value: any): void => {
        const keys = path.split('.');
        let current = obj;

        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            // Ensure the intermediate objects exist
            if (!current[key] || typeof current[key] !== 'object') {
                current[key] = {};
            }
            current = current[key];
        }

        // Set the final property value
        current[keys[keys.length - 1]] = value;
    };

    //should be memoized or stable
    const columns = useMemo<MRT_ColumnDef<BucketListItem>[]>(
        () => [
            {
                accessorKey: 'task',
                header: 'Task',
                size: 150,
                Cell: ({ cell, row }) => (
                    <input
                        defaultValue={cell.getValue<string>()}
                        onChange={(e) => handleInputChange(row.original.id, 'task', e.target.value)}
                        onBlur={(e) => handleInputBlur(row.original.id, 'task', e.target.value)}
                        className='w-full'
                    />
                ),
            },
            {
                accessorKey: 'parkId',
                header: 'Park',
                size: 75,
                Cell: ({ cell, row }) => (
                    <select
                        defaultValue={
                            parks?.find((x) => x.id === cell.getValue<number>())?.parkName ||
                            'No park associated'
                        }
                        onChange={(e) =>
                            handleInputChange(
                                row.original.id,
                                'parkId',
                                parks?.find((x) => x.parkName === e.target.value)?.id,
                            )
                        }
                        onBlur={(e) =>
                            handleInputBlur(
                                row.original.id,
                                'parkId',
                                parks?.find((x) => x.parkName === e.target.value)?.id,
                            )
                        }
                    >
                        <option>No park associated</option>
                        {parks?.map((park) => (
                            <option key={park.id} value={park.parkName}>
                                {park.parkName}
                            </option>
                        ))}
                    </select>
                ),
            },
        ],
        [],
    );

    return (
        <div>
            <MaterialReactTable<BucketListItem>
                columns={columns}
                data={allItems ?? []}
                enableKeyboardShortcuts={false}
                renderBottomToolbarCustomActions={() => (
                    <div className='w-8/12'>
                        <button
                            className='float-right rounded-lg bg-secondary_orange p-3 text-system_white'
                            onClick={() => handleSave(editedItems)}
                            disabled={editedItems.length === 0}
                            type='button'
                        >
                            Save Changes
                        </button>
                        <button
                            className='float-left rounded-lg bg-secondary_orange p-3 text-system_white'
                            onClick={() => handleAddNewItem}
                            type='button'
                        >
                            Add New Item
                        </button>
                    </div>
                )}
            />
        </div>
    );
};

export default EditBucketList;
