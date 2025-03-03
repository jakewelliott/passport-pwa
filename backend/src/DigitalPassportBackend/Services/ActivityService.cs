using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Repository;

using Microsoft.OpenApi.Extensions;

using NetTopologySuite.Geometries;

namespace DigitalPassportBackend.Services;

public class ActivityService(
    ICompletedBucketListItemRepository completedBucketListItemRepository,
    IBucketListItemRepository bucketListItemRepository,
    ICollectedStampRepository collectedStampRepository,
    IPrivateNoteRepository privateNoteRepository,
    IParkVisitRepository parkVisitRepository,
    ILocationsRepository locationsRepository,
    IUserRepository userRepository) : IActivityService
{
    private readonly ICompletedBucketListItemRepository _completedBucketListItemRepository = completedBucketListItemRepository;
    private readonly IBucketListItemRepository _bucketListItemRepository = bucketListItemRepository;
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

    public List<CollectedStamp> GetCollectedStamps(int userId) {
        var stamps = _collectedStampRepository.GetByUser(userId);
        foreach (var stamp in stamps)
        {
            stamp.park = _locationsRepository.GetById(stamp.parkId);
        }
        return _collectedStampRepository.GetByUser(userId);
    }

    public ParkActivity GetParkActivity(int locationId, int userId)
    {
        // Verify that the location and user exists.
        _locationsRepository.GetById(locationId);
        _userRepository.GetById(userId);

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

    public PrivateNote CreateUpdatePrivateNote(string parkAbbr, int userId, string note, string updatedAt)
    {
        // Check if there is already a note in the database.
        var location = _locationsRepository.GetByAbbreviation(parkAbbr);
        var privateNote = _privateNoteRepository.GetByParkAndUser(location.id, userId);
        if (privateNote != null)
        {
            // Update it
            privateNote.note = note;
            privateNote.updatedAt = DateTime.Parse(updatedAt);
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
                park = location,
                parkId = location.id,
                createdAt = DateTime.Parse(updatedAt),
                updatedAt = DateTime.Parse(updatedAt)
            });
        }
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

		public List<BucketListItem> GetBucketListItems() {
			return _bucketListItemRepository.GetAll();
		}

		public List<CompletedBucketListItem> GetCompletedBucketListItems(int userId) {
			return _completedBucketListItemRepository.GetByUser(userId);
		}

		public CompletedBucketListItem ToggleBucketListItemCompletion(int itemId, int userId, double longitude, double latitude, double inaccuracyRadius) {
			var userLocation = GeometryFactory.Default.CreatePoint(new Coordinate(longitude, latitude));
			var locationWithInaccuracy = userLocation.Buffer(inaccuracyRadius);
		
			var item = _bucketListItemRepository.GetById(itemId);
			if (item == null) {
				throw new ServiceException(StatusCodes.Status404NotFound, "Bucket list item not found.");
			}
			var completion = _completedBucketListItemRepository.GetByItemAndUser(itemId, userId);
			if (completion != null) {
				completion.deleted = !completion.deleted;
				return _completedBucketListItemRepository.Update(completion);
			}
			else {
				// make sure we're in the park
				var park = item.parkId.HasValue ? _locationsRepository.GetById(item.parkId.Value) : null;
				if (park == null) {
					throw new ServiceException(StatusCodes.Status404NotFound, "Park not found.");
				}

				if (!park.boundaries!.Intersects(locationWithInaccuracy)) {
					throw new ServiceException(StatusCodes.Status405MethodNotAllowed, "Your location doesn't appear to be at the specified park.");
				}
				// get the park it from the regular bucket list item repository
				var bucketListItem = _bucketListItemRepository.GetById(itemId);
				if (bucketListItem.parkId == null) {
					throw new ServiceException(StatusCodes.Status404NotFound, "Park not found.");
				}
				return _completedBucketListItemRepository.Create(new() { 
					bucketListItemId = itemId, 
					userId = userId, 
					location = (Point)userLocation, 
					parkId = bucketListItem.parkId.Value 
				});
			}
		}
}
