import { useBucketList } from '@/hooks/queries/useBucketList';
import { useParks } from '@/hooks/queries/useParks';
import { useUser } from '@/hooks/queries/useUser';
import type { BucketListCompletion, BucketListItem } from '@/types';
import { useState } from 'react';
import { BucketListItemView } from './bucket-list-item';
import { EditBucketListItemModal } from './edit-bucket-list-modal';
import { GenericIcon } from './generic-icon';
import { LoadingPlaceholder } from './loading-placeholder';
import RoundedButton from './rounded-button';

interface BucketListProps {
    parkId?: number;
    showAddress?: boolean;
}

/** Leave parkId blank to show all bucket list items. */
export const BucketList = ({ parkId, showAddress: showParkName = false }: BucketListProps) => {
    const { data: items, completed, toggleCompletion, isLoading } = useBucketList(parkId);
    const { data: parks } = useParks();
    const { data: user } = useUser();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState<BucketListItem | undefined>();

    const handleEditItemPress = (item: BucketListItem) => {
        setItemToEdit(item);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setItemToEdit(undefined);
        setIsEditModalOpen(false);
    };

    if (isLoading || !items)
        return (
            <div className='m-6 flex flex-col'>
                <LoadingPlaceholder />
            </div>
        );

    const parkNameHelper = (item: BucketListItem) => {
        const park = parks?.find((park) => park.id === item.parkId);
        return park?.parkName;
    };

    const completedHelper = (item: BucketListItem) =>
        completed?.find((completed: BucketListCompletion) => completed.bucketListItemId === item.id);

    return (
        <>
            <div className='flex flex-col gap-2'>
                <GenericIcon name='ballot' text='Park Bucket List:' />
                {items.map((item: BucketListItem) => (
                    <BucketListItemView
                        key={item.id}
                        item={item}
                        completion={completedHelper(item)}
                        handler={() => toggleCompletion(item.id)}
                        address={showParkName ? parkNameHelper(item) : undefined}
                        testId={'bucket-list-item'}
                        handleEditItem={() => handleEditItemPress(item)}
                    />
                ))}
            </div>
            {user?.role === 'admin' && (
                <div className={`flex pl-5 ${parkId === undefined ? 'mt-4 items-center justify-center' : '-mt-5'}`}>
                    <RoundedButton
                        title='+ New Bucket List Item'
                        color={parkId === undefined ? 'secondary_orange' : ''}
                        textColor={parkId === undefined ? 'system_white' : 'system_black'}
                        textSize={''}
                        onClick={() => {
                            setIsEditModalOpen(true);
                        }}
                    />
                </div>
            )}
            {isEditModalOpen && (
                <EditBucketListItemModal
                    isOpen={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    isNew={itemToEdit === undefined}
                    itemProp={itemToEdit}
                />
            )}
        </>
    );
};
