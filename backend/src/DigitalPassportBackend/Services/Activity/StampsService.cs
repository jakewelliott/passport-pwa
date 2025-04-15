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
        var userLocation = GeometryFactory.Default.CreatePoint(new Coordinate(geopoint.latitude, geopoint.longitude));
        if (method == StampCollectionMethod.location.GetDisplayName())
        {
            var locationWithInaccuracy = userLocation.Buffer(geopoint.inaccuracyRadius);
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