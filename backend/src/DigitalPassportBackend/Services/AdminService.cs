using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Repository;

namespace DigitalPassportBackend.Services;

public class AdminService : IAdminService
{
    private readonly ILocationsRepository _locations;
    private readonly IParkAddressRepository _addresses;
    private readonly IBucketListItemRepository _bucketList;
    private readonly IParkIconRepository _parkIcons;
    private readonly IParkPhotoRepository _parkPhotos;

    public AdminService(
        ILocationsRepository locationsRepository,
        IParkAddressRepository addressRepository,
        IBucketListItemRepository bucketListItemRepository,
        IParkIconRepository parkIconRepository,
        IParkPhotoRepository parkPhotoRepository)
    {
        _locations = locationsRepository;
        _addresses = addressRepository;
        _bucketList = bucketListItemRepository;
        _parkIcons = parkIconRepository;
        _parkPhotos = parkPhotoRepository;
    }

    //
    // Locations
    //

    public void CreatePark(
        Park park,
        List<ParkAddress> addrs,
        List<ParkIcon> icons,
        List<BucketListItem> blItems,
        List<ParkPhoto> photos)
    {
        try
        {
            _locations.GetByAbbreviation(park.parkAbbreviation);
            throw new ServiceException(409, $"Park {park.parkAbbreviation} already exists.");
        }
        catch (NotFoundException)
        {
            _locations.Create(park);
            addrs.ForEach(a => _addresses.Create(a));
            icons.ForEach(i => _parkIcons.Create(i));
            blItems.ForEach(i => _bucketList.Create(i));
            photos.ForEach(p => _parkPhotos.Create(p));
        }
    }

    public void UpdatePark(Park park)
    {

    }

    public void DeletePark(int id)
    {

    }

    //
    // Bucket List Items
    //

    public void CreateBucketListItem(BucketListItem item)
    {

    }
    
    public void UpdateBucketListItem(BucketListItem item)
    {

    }

    public void DeleteBucketListItem(int id)
    {

    }

    //
    // Trails
    //

    public void CreateTrail(Trail trail)
    {

    }

    public void UpdateTrail(Trail trail)
    {

    }

    public void DeleteTrail(int id)
    {

    }

    //
    // Users
    //

    public void UpdatePassword(int userId, string password)
    {

    }
    
    public void UpdateRole(int userId, string role)
    {

    }

    public void CreatePark(Park park)
    {
        throw new NotImplementedException();
    }

}