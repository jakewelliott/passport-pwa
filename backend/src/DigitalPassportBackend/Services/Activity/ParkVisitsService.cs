using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Persistence.Repository;

using NetTopologySuite.Geometries;

namespace DigitalPassportBackend.Services.Activity;

public class ParkVisitsService : IParkVisitsService
{
    private readonly ILocationsRepository _locationsRepository;
    private readonly IUserRepository _userRepository;
    private readonly IParkVisitRepository _parkVisitRepository;

    public ParkVisitsService(
        ILocationsRepository locationsRepository,
        IUserRepository userRepository,
        IParkVisitRepository parkVisitRepository
    )
    {
        _locationsRepository = locationsRepository;
        _userRepository = userRepository;
        _parkVisitRepository = parkVisitRepository;
    }

    public ParkVisit Create(int userId, int parkId, Geopoint geopoint)
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

    public List<ParkVisit> GetAll(int userId)
    {
        return _parkVisitRepository.GetAllByUser(userId);
    }
}