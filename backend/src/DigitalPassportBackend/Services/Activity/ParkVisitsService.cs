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