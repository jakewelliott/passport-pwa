using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Services;

public class AdminService : IAdminService
{
    private readonly IActivityService _activity;
    private readonly IAuthService _auth;
    private readonly ILocationsService _locations;

    public AdminService(
        IActivityService activityService,
        IAuthService authService,
        ILocationsService locationsService)
    {
        _activity = activityService;
        _auth = authService;
        _locations = locationsService;
    }

    //
    // Locations
    //

    public void CreatePark(Park park)
    {

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
}