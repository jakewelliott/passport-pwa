using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Services;

public interface IAdminService
{
    // Locations
    void CreatePark(
        Park park,
        List<ParkAddress> addrs,
        List<ParkIcon> icons,
        List<BucketListItem> blItems,
        List<ParkPhoto> photos);
    void UpdatePark(Park park);
    void DeletePark(int id);

    // Bucket List Items
    void CreateBucketListItem(BucketListItem item);
    void UpdateBucketListItem(BucketListItem item);
    void DeleteBucketListItem(int id);

    // Trails
    void CreateTrail(Trail trail);
    void UpdateTrail(Trail trail);
    void DeleteTrail(int id);

    // Users
    void UpdatePassword(int userId, string password);
    void UpdateRole(int userId, string role);
}