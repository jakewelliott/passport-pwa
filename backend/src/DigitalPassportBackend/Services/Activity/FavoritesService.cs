

    public List<int> GetFavoriteParks(int userId)
    {
        return [.. _favoriteParkRepository.GetByUser(userId)
            .Select(f => (int)f.parkId!)];
    }

    // ADAM: turn this into a toggle!

    public void DeleteFavoritePark(int userId, int parkId)
    {
        var fav = _favoriteParkRepository.GetByUserAndPark(userId, parkId);
        if (fav is not null)
        {
            _favoriteParkRepository.Delete(fav.id);
        }
    }

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