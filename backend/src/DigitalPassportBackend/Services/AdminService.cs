using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Domain.DTO;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.Security;

namespace DigitalPassportBackend.Services;

public class AdminService : IAdminService
{
    private readonly ILocationsRepository _locations;
    private readonly IParkAddressRepository _addresses;
    private readonly IBucketListItemRepository _bucketList;
    private readonly IParkIconRepository _parkIcons;
    private readonly IParkPhotoRepository _parkPhotos;
    private readonly IUserRepository _users;
    private readonly ITrailRepository _trails;
    private readonly ITrailIconRepository _trailIcons;
    private readonly IPasswordHasher _hasher;

    public AdminService(
        ILocationsRepository locationsRepository,
        IParkAddressRepository addressRepository,
        IBucketListItemRepository bucketListItemRepository,
        IParkIconRepository parkIconRepository,
        IParkPhotoRepository parkPhotoRepository,
        IUserRepository userRepository,
        ITrailRepository trailRepository,
        ITrailIconRepository trailIconRepository,
        IPasswordHasher passwordHasher)
    {
        _locations = locationsRepository;
        _addresses = addressRepository;
        _bucketList = bucketListItemRepository;
        _parkIcons = parkIconRepository;
        _parkPhotos = parkPhotoRepository;
        _users = userRepository;
        _trails = trailRepository;
        _trailIcons = trailIconRepository;
        _hasher = passwordHasher;
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
            throw new ServiceException(409, $"Park with abbreviation '{park.parkAbbreviation}' already exists");
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
        SetValues(_addresses.GetByLocationId(park.id), addrs, _addresses);
        SetValues(_parkIcons.GetByLocationId(park.id), icons, _parkIcons);
        SetValues(_bucketList.GetByLocationId(park.id), blItems, _bucketList);
        SetValues(_parkPhotos.GetByLocationId(park.id), photos, _parkPhotos);
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

    public void CreateBucketListItem(BucketListItemDTO item)
    {
        _bucketList.Create(item.ToDomain(_locations.GetById(item.parkId)));
    }
    
    public void UpdateBucketListItem(BucketListItemDTO item)
    {
        _bucketList.Update(item.ToDomain(_locations.GetById(item.parkId)));
    }

    public void DeleteBucketListItem(int id)
    {
        _bucketList.Delete(id);
    }

    //
    // Trails
    //

    public void CreateTrail(Trail trail, List<TrailIcon> icons)
    {
        if (_trails.GetByName(trail.trailName) is null)
        {
            throw new ServiceException(409, $"Trail with name '{trail.trailName}' already exists");
        }

        _trails.Create(trail);
        icons.ForEach(i => _trailIcons.Create(i));
    }

    public void UpdateTrail(Trail trail, List<TrailIcon> icons)
    {
        var t = _trails.GetByName(trail.trailName);
        if (t is not null && t.id != trail.id)
        {
            throw new ServiceException(409, $"Trail with name '{trail.trailName}' already exists");
        }

        _trails.Update(trail);
        SetValues(_trailIcons.GetByTrailId(trail.id), icons, _trailIcons);
    }

    public void DeleteTrail(int id)
    {
        _trailIcons.GetByTrailId(id).ForEach(i => _trailIcons.Delete(i.id));
        _trails.Delete(id);
    }

    //
    // Users
    //

    public void UpdatePassword(int userId, string password)
    {
        var user = _users.GetById(userId);
        user.password = _hasher.HashPassword(password);
        _hasher.ValidatePassword(user);
        _users.Update(user);
    }
    
    public void UpdateRole(int userId, string role)
    {
        var user = _users.GetById(userId);
        user.role = Enum.Parse<UserRole>(role);
        _users.Update(user);
    }

    //
    // Helpers
    //

    private static void SetValues<T>(List<T> currentVals, List<T> newVals, IRepository<T> repo) where T : IEntity
    {
        // Delete difference.
        currentVals.Except(newVals)
            .ToList()
            .ForEach(v => repo.Delete(v.id));
        
        // Create or update new values.
        foreach (var val in newVals)
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
}