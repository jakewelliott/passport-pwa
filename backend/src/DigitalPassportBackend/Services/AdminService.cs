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

    public void UpdatePark(
        Park park,
        List<ParkAddress> addrs,
        List<ParkIcon> icons,
        List<BucketListItem> blItems,
        List<ParkPhoto> photos)
    {
        // Check if the park needs to be updated.
        if (_locations.GetById(park.id).Equals(park))
        {
            // Verify that there isn't an abbreviation collision.
            try {
                var existing = _locations.GetByAbbreviation(park.parkAbbreviation);
                if (existing.id == park.id)
                {
                    // Update park.
                    _locations.Update(park);
                }
                else
                {
                    throw new ServiceException(409, $"Park with abbreviation '{park.parkAbbreviation}' already exists");
                }
            }
            catch (NotFoundException)
            {
                // Update park.
                _locations.Update(park);
            }
        }

        // Update or create park data.
        addrs.ForEach(a => UpdateOrCreate(a, _addresses));
        icons.ForEach(i => UpdateOrCreate(i, _parkIcons));
        blItems.ForEach(i => UpdateOrCreate(i, _bucketList));
        photos.ForEach(p => UpdateOrCreate(p, _parkPhotos));
    }

    public void DeletePark(int id)
    {
        // Park addresses.
        _addresses.GetByLocationId(id)
            .ForEach(a => _addresses.Delete(a.id));
        
        // Park icons.
        _parkIcons.GetByLocationId(id)
            .ForEach(i => _parkIcons.Delete(i.id));

        // Bucket list items.
        _bucketList.GetByLocationId(id)
            .ForEach(i => _bucketList.Delete(i.id));

        // Park photos.
        _parkPhotos.GetByLocationId(id)
            .ForEach(i => _parkPhotos.Delete(i.id));

        // Park.
        _locations.Delete(id);
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

    //
    // Helpers
    //

    private static void UpdateOrCreate<T>(T val, IRepository<T> repo) where T : IEntity
    {
        try
        {
            if (!repo.GetById(val.id).Equals(val))
            {
                repo.Update(val);
            }
        }
        catch (NotFoundException)
        {
            repo.Create(val);
        }
    }
}