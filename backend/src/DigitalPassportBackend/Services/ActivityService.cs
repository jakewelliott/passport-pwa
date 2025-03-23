using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Repository;

using Microsoft.OpenApi.Extensions;

using NetTopologySuite.Geometries;

namespace DigitalPassportBackend.Services;

public class ActivityService(
    IBucketListItemRepository bucketListItemRepository,
    ICompletedBucketListItemRepository completedBucketListItemRepository,
    ICollectedStampRepository collectedStampRepository,
    IPrivateNoteRepository privateNoteRepository,
    IParkVisitRepository parkVisitRepository,
    ILocationsRepository locationsRepository,
    IUserRepository userRepository) : IActivityService
{
    private readonly IBucketListItemRepository _bucketListItemRepository = bucketListItemRepository;
    private readonly ICompletedBucketListItemRepository _completedBucketListItemRepository = completedBucketListItemRepository;
    private readonly ICollectedStampRepository _collectedStampRepository = collectedStampRepository;
    private readonly IPrivateNoteRepository _privateNoteRepository = privateNoteRepository;
    private readonly IParkVisitRepository _parkVisitRepository = parkVisitRepository;
    private readonly ILocationsRepository _locationsRepository = locationsRepository;
    private readonly IUserRepository _userRepository = userRepository;

    public CollectedStamp CollectStamp(
        string park_abbreviation,
        double latitude,
        double longitude,
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
        var userLocation = GeometryFactory.Default.CreatePoint(new Coordinate(latitude, longitude));
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

    public List<CollectedStamp> GetCollectedStamps(int userId)
    {
        var stamps = _collectedStampRepository.GetByUser(userId);
        foreach (var stamp in stamps)
        {
            stamp.park = _locationsRepository.GetById(stamp.parkId);
        }
        return _collectedStampRepository.GetByUser(userId);
    }

    public PrivateNote CreateUpdatePrivateNote(int parkId, int userId, string note, DateTime updatedAt)
    {
        // Check if there is already a note in the database.
        var locationId = parkId == 0 ? 0 : _locationsRepository.GetById(parkId).id;
        var privateNote = _privateNoteRepository.GetByParkAndUser(locationId, userId);
        if (privateNote != null)
        {
            // Update it
            privateNote.note = note;
            privateNote.updatedAt = updatedAt;
            return _privateNoteRepository.Update(privateNote);
        }
        else
        {
            // Create it
            return _privateNoteRepository.Create(new()
            {
                note = note,
                user = _userRepository.GetById(userId),
                userId = userId,
                park = locationId == 0 ? null : _locationsRepository.GetById(locationId),
                parkId = locationId == 0 ? null : locationId,
                createdAt = updatedAt,
                updatedAt = updatedAt
            });
        }
    }

    public List<CompletedBucketListItem> GetCompletedBucketListItems(int userId)
    {
        return [.. _completedBucketListItemRepository.GetByUser(userId)
            .Where(i => !i.deleted)];
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

    public List<BucketListItem> GetBucketListItems()
    {
        return _bucketListItemRepository.GetAll();
    }

    public CompletedBucketListItem ToggleBucketListItemCompletion(int itemId, int userId, double latitude, double longitude)
    {
        var userLocation = GeometryFactory.Default.CreatePoint(new Coordinate(latitude, longitude));

        var item = _bucketListItemRepository.GetById(itemId);
				if (item == null) {
          throw new ServiceException(StatusCodes.Status404NotFound, $"Bucket list item {itemId} not found.");
        }

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

    public ParkVisit VisitPark(int userId, string parkAbbr, double latitude, double longitude, double inaccuracyRadius)
    {
        var park = _locationsRepository.GetByAbbreviation(parkAbbr);
        var userLocation = GeometryFactory.Default.CreatePoint(new Coordinate(latitude, longitude));
        var locationWithInaccuracy = userLocation.Buffer(inaccuracyRadius);

        Console.WriteLine($"User Location: {userLocation}, Location with Inaccuracy: {locationWithInaccuracy}");

        // TODO: @V
        // we can't visit a park manually, rn its just automatically done
        // so throwing an error for the user to read will prolly confuse them
        // we should throw an error but not show it on the frontend
        // what error code should we throw? 409?

        // TODO: test this
        if (_parkVisitRepository.HasVisitedParkToday(userId, park.id))
        {
            throw new ServiceException(StatusCodes.Status409Conflict, "You have already visited this park today.");
        }

        // TODO: I couldn't get this to work, I tried plotting it on the map and it was correct
        // I tried different points, digits, and inaccuracies

        // if (park.boundaries!.Intersects(locationWithInaccuracy) == false) {
        // 		throw new ServiceException(StatusCodes.Status409Conflict, "Client thinks we are in the park but backend disagrees.");
        // }

        return _parkVisitRepository.Create(new()
        {
            location = new(latitude, longitude),
            createdAt = DateTime.Now,
            updatedAt = DateTime.Now,
            parkId = park.id,
            park = park,
            userId = userId,
            user = _userRepository.GetById(userId)
        });
    }

    public List<ParkVisit> GetParkVisits(int userId)
    {
        return _parkVisitRepository.GetAllByUser(userId);
    }

    public PrivateNote GetParkNote(int parkId, int userId)
    {
        var note = _privateNoteRepository.GetByParkAndUser(parkId, userId);
        if (note == null)
        {
            note = CreateUpdatePrivateNote(parkId, userId, "", DateTime.UtcNow);
        }
        note.parkId = parkId;
        return note;
    }

    public List<PrivateNote> GetNotes(int userId)
    {
        return _privateNoteRepository.GetByUser(userId)
            .Select(x =>
            {
                var note = new PrivateNote
                {
                    id = x.id,
                    note = x.note,
                    createdAt = x.createdAt,
                    updatedAt = x.updatedAt,
                    userId = x.userId,
                    user = x.user,
                    parkId = x.parkId == null ? 0 : x.parkId,
                    park = x.parkId != null ? _locationsRepository.GetById(x.parkId.Value) : null
                };
                return note;
            })
            .ToList();
    }

}
