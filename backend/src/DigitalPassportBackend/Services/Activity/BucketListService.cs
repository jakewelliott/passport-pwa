using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Domain.DTO;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Repository;


// Bucket List
public class BucketListService(
    IBucketListItemRepository bucketListItemRepository,
    ICompletedBucketListItemRepository completedBucketListItemRepository,
    ILocationsRepository locationsRepository
)
{
    public void CreateBucketListItem(BucketListItemDTO item)
    {
        _bucketListItemRepository.Create(item.ToDomain(_locationsRepository.GetById(item.parkId)));
    }

    public List<BucketListItem> GetBucketListItems()
    {
        return _bucketListItemRepository.GetAll();
    }

    public List<CompletedBucketListItem> GetCompletedBucketListItems(int userId)
    {
        return [.. _completedBucketListItemRepository.GetByUser(userId)
            .Where(i => !i.deleted)];
    }

    public CompletedBucketListItem ToggleBucketListItemCompletion(int itemId, int userId, Geopoint geopoint)
    {
        var userLocation = GeometryFactory.Default.CreatePoint(new Coordinate(geopoint.latitude, geopoint.longitude));

        _bucketListItemRepository.GetById(itemId);

        // see if the user has already completed the item
        var completion = _completedBucketListItemRepository.GetByItemAndUser(itemId, userId);
        if (completion != null)
        {
            completion.deleted = !completion.deleted;
            return _completedBucketListItemRepository.Update(completion);
        }
        else
        {
            // make sure the bucket list item is valid
            var bucketListItem = _bucketListItemRepository.GetById(itemId);

            return _completedBucketListItemRepository.Create(new()
            {
                bucketListItemId = itemId,
                userId = userId,
                deleted = false,
                location = userLocation,
                parkId = bucketListItem.parkId
            });
        }
    }
    
    public void UpdateBucketListItem(BucketListItemDTO item)
    {
        _bucketListItemRepository.Update(item.ToDomain(_locationsRepository.GetById(item.parkId)));
    }

    public void DeleteBucketListItem(int id)
    {
        _bucketListItemRepository.Delete(id);
    }
}