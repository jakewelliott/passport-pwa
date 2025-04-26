using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Domain.DTO;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Repository;

using Microsoft.OpenApi.Extensions;

using NetTopologySuite.Geometries;
using static DigitalPassportBackend.Controllers.ActivityController;


namespace DigitalPassportBackend.Services;

public class ActivityService(
    IBucketListItemRepository bucketListItemRepository,
    ICompletedBucketListItemRepository completedBucketListItemRepository,
    ICollectedStampRepository collectedStampRepository,
    IPrivateNoteRepository privateNoteRepository,
    IParkVisitRepository parkVisitRepository,
    IFavoriteParkRepository favoriteParkRepository,
    ILocationsRepository locationsRepository,
    IUserRepository userRepository) : IActivityService
{
    private readonly IBucketListItemRepository _bucketListItemRepository = bucketListItemRepository;
    private readonly ICompletedBucketListItemRepository _completedBucketListItemRepository = completedBucketListItemRepository;
    private readonly ICollectedStampRepository _collectedStampRepository = collectedStampRepository;
    private readonly IPrivateNoteRepository _privateNoteRepository = privateNoteRepository;
    private readonly IParkVisitRepository _parkVisitRepository = parkVisitRepository;
    private readonly IFavoriteParkRepository _favoriteParkRepository = favoriteParkRepository;
    private readonly ILocationsRepository _locationsRepository = locationsRepository;
    private readonly IUserRepository _userRepository = userRepository;

    // Stamps
    public CollectedStamp CollectStamp(
        int parkId,
        int userId,
        Geopoint geopoint,
        string method,
        DateTime? dateTime)
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
        var park = _locationsRepository.GetById(parkId);
        // not already collected
        if (_collectedStampRepository.GetByParkAndUser(park.id, userId) != null)
        {
            throw new ServiceException(StatusCodes.Status409Conflict, "Stamp already collected for this park.");
        }

        // collect the stamp
        var userLocation = GeometryFactory.Default.CreatePoint(new Coordinate(geopoint.longitude, geopoint.latitude));

        if (method == StampCollectionMethod.location.GetDisplayName())
        {
            double metersToDegrees = geopoint.inaccuracyRadius / 111000.0;
            var locationWithInaccuracy = userLocation.Buffer(metersToDegrees);
            Console.WriteLine(locationWithInaccuracy);
            Console.WriteLine(park.boundaries);
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

    // Bucket List
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

    // Park Visit
    public ParkVisit VisitPark(int userId, int parkId, Geopoint geopoint)
    {
        var park = _locationsRepository.GetById(parkId);
        var userLocation = GeometryFactory.Default.CreatePoint(new Coordinate(geopoint.latitude, geopoint.longitude));
        var locationWithInaccuracy = userLocation.Buffer(geopoint.inaccuracyRadius);

        return _parkVisitRepository.GetParkVisitToday(userId, park.id)
            ?? _parkVisitRepository.Create(new()
        {
            location = userLocation,
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

    // Private Notes
    public PrivateNote GetParkNote(int userId, int parkId)
    {
        var note = _privateNoteRepository.GetByParkAndUser(userId, parkId);
        if (note == null)
        {
            note = CreateUpdatePrivateNote(userId, parkId, "", DateTime.UtcNow);
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

    public PrivateNote CreateUpdatePrivateNote(int userId, int parkId, string note, DateTime updatedAt)
    {
        // Check if there is already a note in the database.
        var locationId = parkId == 0 ? 0 : _locationsRepository.GetById(parkId).id;
        var privateNote = _privateNoteRepository.GetByParkAndUser(userId, locationId);
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

    // Favorite parks
    public void AddFavoritePark(int userId, int parkId)
    {
        if (_favoriteParkRepository.GetByUserAndPark(userId, parkId) is null)
        {
            _favoriteParkRepository.Create(new()
            {
                parkId = parkId,
                park = _locationsRepository.GetById(parkId),
                userId = userId,
                user = _userRepository.GetById(userId)
            });
        }
    }

    public List<int> GetFavoriteParks(int userId)
    {
        return [.. _favoriteParkRepository.GetByUser(userId)
            .Select(f => (int)f.parkId!)];
    }

    public void DeleteFavoritePark(int userId, int parkId)
    {
        var fav = _favoriteParkRepository.GetByUserAndPark(userId, parkId);
        if (fav is not null)
        {
            _favoriteParkRepository.Delete(fav.id);
        }
    }
}
