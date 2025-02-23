
using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.Security;
using DigitalPassportBackend.Secutiry;

using Microsoft.OpenApi.Extensions;

using NetTopologySuite.Geometries;

namespace DigitalPassportBackend.Services;

public class ActivityService(
    ICompletedBucketListItemRepository completedBucketListItemRepository,
    ICollectedStampRepository collectedStampRepository,
    IPrivateNoteRepository privateNoteRepository,
    IParkVisitRepository parkVisitRepository,
    ILocationsRepository locationsRepository,
    IUserRepository userRepository) : IActivityService
{
    private readonly ICompletedBucketListItemRepository _completedBucketListItemRepository = completedBucketListItemRepository;
    private readonly ICollectedStampRepository _collectedStampRepository = collectedStampRepository;
    private readonly IPrivateNoteRepository _privateNoteRepository = privateNoteRepository;
    private readonly IParkVisitRepository _parkVisitRepository = parkVisitRepository;
    private readonly ILocationsRepository _locationsRepository = locationsRepository;
    private readonly IUserRepository _userRepository = userRepository;

    public CollectedStamp CollectStamp(
        string park_abbreviation,
        double longitude,
        double latitude,
        double inaccuracyRadius,
        string method,
        DateTime? dateTime,
        int userId)
    {
        // validation checks
        // valid user
        _userRepository.GetById(userId);
        // valid collection method
        StampCollectionMethod methodEnum = StampCollectionMethod.location;
        if (!Enum.TryParse<StampCollectionMethod>(method, true, out methodEnum))
        {
            throw new ServiceException(StatusCodes.Status412PreconditionFailed, "Stamp collection method is not valid.");
        }
        var park = _locationsRepository.GetByAbbreviation(park_abbreviation);
        // not already collected
        if (_collectedStampRepository.GetByParkAndUser(park.id, userId) != null)
        {
            throw new ServiceException(StatusCodes.Status409Conflict, "Stamp already collected for this park.");
        }

        // collect the stamp
        var userLocation = GeometryFactory.Default.CreatePoint(new Coordinate(longitude, latitude));
        if (method == StampCollectionMethod.location.GetDisplayName())
        {
            var locationWithInaccuracy = userLocation.Buffer(inaccuracyRadius);
            if (park.boundaries!.Intersects(locationWithInaccuracy))
            {
                var collectedStamp = CreateStamp(userLocation, methodEnum, _userRepository.GetById(userId), park, dateTime);
                return _collectedStampRepository.Create(collectedStamp);
            }
            else
            {
                throw new ServiceException(StatusCodes.Status405MethodNotAllowed, "Your location doesn't appear to be at the specified park.");
            }
        }
        else
        {
            var collectedStamp = CreateStamp(userLocation, methodEnum, _userRepository.GetById(userId), park, dateTime);
            return _collectedStampRepository.Create(collectedStamp);
        }
    }


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

    private static CollectedStamp CreateStamp(
        Point location,
        StampCollectionMethod method,
        User user,
        Park park,
        DateTime? dateTime)
    {
        return new CollectedStamp()
            {
                location = location,
                method = method,
                user = user,
                park = park,
                createdAt = dateTime == null ? DateTime.UtcNow : dateTime.Value,
            };
    }
}
