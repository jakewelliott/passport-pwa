using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Domain.DTO;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Repository;

public class FavoritesService
{
    private readonly IFavoriteParkRepository _favoriteParkRepository;
    private readonly ILocationsRepository _locationsRepository;
    private readonly IUserRepository _userRepository;

    public FavoritesService(
        IFavoriteParkRepository favoriteParkRepository,
        ILocationsRepository locationsRepository,
        IUserRepository userRepository
    )
    {
        _favoriteParkRepository = favoriteParkRepository;
        _locationsRepository = locationsRepository;
        _userRepository = userRepository;
    }

    public List<int> Get(int userId)
    {
        return [.. _favoriteParkRepository.GetByUser(userId)
            .Select(f => (int)f.parkId!)];
    }

    public void Toggle(int userId, int parkId)
    {
        var fav = _favoriteParkRepository.GetByUserAndPark(userId, parkId);
        if (fav is not null)
        {
            _favoriteParkRepository.Delete(fav.id);
        } else {
            _favoriteParkRepository.Create(new()
            {
                parkId = parkId,
                park = _locationsRepository.GetById(parkId),
                userId = userId,
                user = _userRepository.GetById(userId)
            });
        }
    }
}