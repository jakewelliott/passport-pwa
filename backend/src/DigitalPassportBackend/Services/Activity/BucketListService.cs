using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Domain.DTO;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Repository;

public class BucketListService
{
    private readonly IBucketListItemRepository _bucketListItemRepository;
    private readonly ICompletedBucketListItemRepository _completedBucketListItemRepository;
    private readonly ILocationsRepository _locationsRepository;

    public BucketListService(
        IBucketListItemRepository bucketListItemRepository,
        ICompletedBucketListItemRepository completedBucketListItemRepository,
        ILocationsRepository locationsRepository
    )
    {
        _bucketListItemRepository = bucketListItemRepository;
        _completedBucketListItemRepository = completedBucketListItemRepository;
        _locationsRepository = locationsRepository;
    }

    public List<BucketListItem> GetAll()
    {
        return _bucketListItemRepository.GetAll();
    }

    public List<BucketListItem> GetByParkId(int parkId)
    {
        return _bucketListItemRepository.GetByParkId(parkId);
    }

    public List<CompletedBucketListItem> GetCompleted(int userId)
    {
        return [.. _completedBucketListItemRepository.GetByUser(userId)
            .Where(i => !i.deleted)];
    }

    public CompletedBucketListItem ToggleCompleted(int itemId, int userId, Geopoint geopoint)
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

    //
    // ADMIN SERVICES
    //

    public void Create(BucketListItemDTO item)
    {
        _bucketListItemRepository.Create(item.ToDomain(_locationsRepository.GetById(item.parkId)));
    }

    public void Update(BucketListItemDTO item)
    {
        _bucketListItemRepository.Update(item.ToDomain(_locationsRepository.GetById(item.parkId)));
    }

    public void Delete(int id)
    {
        _bucketListItemRepository.Delete(id);
    }
}