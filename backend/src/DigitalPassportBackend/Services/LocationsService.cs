using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Persistence.Repository;

namespace DigitalPassportBackend.Services;

public class LocationsService : ILocationsService
{
    private readonly ILocationsRepository _locationsRepository;
    private readonly IParkAddressRepository _addressRepository;
    private readonly IBucketListItemRepository _bucketListItemRepository;
    private readonly IParkIconRepository _parkIconRepository;
    private readonly IParkPhotoRepository _parkPhotoRepository;

    public LocationsService(
        ILocationsRepository locationsRepository,
        IParkAddressRepository addressRepository,
        IBucketListItemRepository bucketListItemRepository,
        IParkIconRepository parkIconRepository,
        IParkPhotoRepository parkPhotoRepository)
    {
        _locationsRepository = locationsRepository;
        _addressRepository = addressRepository;
        _bucketListItemRepository = bucketListItemRepository;
        _parkIconRepository = parkIconRepository;
        _parkPhotoRepository = parkPhotoRepository;
    }
    
    public List<ParkAddress> GetAddressesByLocationId(int id)
    {
        return _addressRepository.GetByLocationId(id);
    }

    public List<Park> GetAll()
    {
        return _locationsRepository.GetAll();
    }


    public List<BucketListItem> GetBucketListItemsByLocationId(int id)
    {
        return _bucketListItemRepository.GetByLocationId(id);
    }

    public Park GetByAbbreviation(string locationAbbrev)
    {
        return _locationsRepository.GetByAbbreviation(locationAbbrev);
    }

    public List<ParkIcon> GetIconsByLocationId(int id)
    {
        return _parkIconRepository.GetByLocationId(id);
    }

    public List<ParkPhoto> GetParkPhotosByLocationId(int id)
    {
        return _parkPhotoRepository.GetByLocationId(id);
    }
}
