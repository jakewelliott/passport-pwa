public class ParkVisitsService
{
    private readonly ILocationsRepository _locationsRepository;
    private readonly IUserRepository _userRepository;
    private readonly ICollectedStampRepository _collectedStampRepository;

    public StampsService(
        ILocationsRepository locationsRepository,
        IUserRepository userRepository,
        ICollectedStampRepository collectedStampRepository
    )
    {
        _locationsRepository = locationsRepository;
        _userRepository = userRepository;
        _collectedStampRepository = collectedStampRepository;
    }

    // Stamps
    public CollectedStamp Collect(
        int parkId,
        int userId,
        Geopoint geopoint,
        string method,
        DateTime? dateTime)
    {
        // valid user
        var user = _userRepository.GetById(userId);
        var park = _locationsRepository.GetById(parkId);
        var isManual = method == StampCollectionMethod.manual.GetDisplayName();
        var userLocation = GeometryFactory.Default.CreatePoint(new Coordinate(geopoint.latitude, geopoint.longitude));
        var locationWithInaccuracy = userLocation.Buffer(geopoint.inaccuracyRadius);

        // ADAM: i removed this because user won't ever need to know this
        // valid collection method
        // StampCollectionMethod methodEnum = StampCollectionMethod.location;
        // if (!Enum.TryParse<StampCollectionMethod>(method, true, out methodEnum))
        // {
        //     throw new ServiceException(StatusCodes.Status412PreconditionFailed, "Stamp collection method is not valid.");
        // }

        // not already collected
        if (_collectedStampRepository.GetByParkAndUser(park.id, userId) != null)
        {
            throw new ServiceException(StatusCodes.Status409Conflict, "Stamp already collected for this park.");
        }

        // non manual collection & user is not at the park
        if (!isManual && !park.boundaries!.Intersects(userLocation))
        {
            throw new ServiceException(StatusCodes.Status405MethodNotAllowed, "Your location doesn't appear to be at the specified park.");
        }

        // happy path
        var collectedStamp = new CollectedStamp()
        {
            location = userLocation,
            method = methodEnum,
            user = _userRepository.GetById(userId),
            park = park,
            createdAt = dateTime == null ? DateTime.UtcNow : dateTime.Value,
        };
        return _collectedStampRepository.Create(collectedStamp);
    }

    public List<CollectedStamp> GetAll(int userId)
    {
        var stamps = _collectedStampRepository.GetByUser(userId);
        foreach (var stamp in stamps)
        {
            stamp.park = _locationsRepository.GetById(stamp.parkId);
        }
        return _collectedStampRepository.GetByUser(userId);
    }
}