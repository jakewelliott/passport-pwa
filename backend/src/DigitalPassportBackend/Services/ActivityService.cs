using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.Security;
using DigitalPassportBackend.Secutiry;

namespace DigitalPassportBackend.Services;

public class ActivityService(
    ICompletedBucketListItemRepository completedBucketListItemRepository,
    ICollectedStampRepository collectedStampRepository,
    IPrivateNoteRepository privateNoteRepository,
    IParkVisitRepository parkVisitRepository) : IActivityService
{
    private readonly ICompletedBucketListItemRepository _completedBucketListItemRepository = completedBucketListItemRepository;
    private readonly ICollectedStampRepository _collectedStampRepository = collectedStampRepository;
    private readonly IPrivateNoteRepository _privateNoteRepository = privateNoteRepository;
    private readonly IParkVisitRepository _parkVisitRepository = parkVisitRepository;

    public ParkActivity GetParkActivity(int locationId, int userId)
    {
        var bucketListItems = _completedBucketListItemRepository.GetByParkAndUser(locationId, userId);
        var stampCollectedAt = _collectedStampRepository.GetByParkAndUser(locationId, userId);
        var privateNote = _privateNoteRepository.GetByParkAndUser(locationId, userId);
        var lastVisited = _parkVisitRepository.GetByParkAndUser(locationId, userId).FirstOrDefault();

        return new ParkActivity
        {
            CompletedBucketListItems = bucketListItems.Select(item => new BucketListItemOverview
            {
                Id = item.bucketListItemId,
            }).ToList(),
            StampCollectedAt = stampCollectedAt?.updatedAt,
            PrivateNote = privateNote == null ? null : new PrivateNoteOverview
            {
                Id = privateNote.id,
                Note = privateNote.note
            },
            LastVisited = lastVisited?.createdAt
        };
    }

}
