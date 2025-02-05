using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Persistence.Repository;

namespace DigitalPassportBackend.Services;
public class LocationsService(LocationsRepository locationsRepository, ParkAddressRepository addressRepository, BucketListItemRepository bucketListItemRepository, ParkIconRepository parkIconRepository, ParkPhotoRepository parkPhotoRepository)
{

    private readonly LocationsRepository _locationsRepository = locationsRepository;
    private readonly ParkAddressRepository _addressRepository = addressRepository;
    private readonly BucketListItemRepository _bucketListItemRepository = bucketListItemRepository;
    private readonly ParkIconRepository _parkIconRepository = parkIconRepository;
    private readonly ParkPhotoRepository _parkPhotoRepository = parkPhotoRepository;
    
    public List<ParkAddress> GetAddressesByLocationId(int id)
    {
        return _addressRepository.GetByLocationId(id);
    }

    public List<BucketListItem> GetBucketListItemsByLocationId(int id)
    {
        return _bucketListItemRepository.GetByLocationId(id);
    }

    public Park? GetByAbbreviation(string locationAbbrev)
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