using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Repository;

namespace DigitalPassportBackend.Services;

public class LocationsService : ILocationsService
{
    private readonly ILocationsRepository _locationsRepository;
    private readonly IParkAddressRepository _addressRepository;
    private readonly IBucketListItemRepository _bucketListItemRepository;
    private readonly IParkIconRepository _parkIconRepository;
    private readonly IParkPhotoRepository _parkPhotoRepository;
    private readonly ITrailRepository _trailRepository;
    private readonly ITrailIconRepository _trailIconRepository;

    public LocationsService(
        ILocationsRepository locationsRepository,
        IParkAddressRepository addressRepository,
        IBucketListItemRepository bucketListItemRepository,
        IParkIconRepository parkIconRepository,
        IParkPhotoRepository parkPhotoRepository,
        ITrailRepository trailRepository,
        ITrailIconRepository trailIconRepository)
    {
        _locationsRepository = locationsRepository;
        _addressRepository = addressRepository;
        _bucketListItemRepository = bucketListItemRepository;
        _parkIconRepository = parkIconRepository;
        _parkPhotoRepository = parkPhotoRepository;
        _trailRepository = trailRepository;
        _trailIconRepository = trailIconRepository;
    }

    // Parks

    // Trails



    // Trail Icons

    // Bucket List
    public List<BucketListItem> GetBucketListItemsByLocationId(int id)
    {
        return _bucketListItemRepository.GetByLocationId(id);
    }

    // General

    // Helpers
}

