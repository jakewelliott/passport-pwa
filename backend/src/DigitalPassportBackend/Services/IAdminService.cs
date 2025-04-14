using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Domain.DTO;

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
    void UpdatePark(
        Park park,
        List<ParkAddress> addrs,
        List<ParkIcon> icons,
        List<BucketListItem> blItems,
        List<ParkPhoto> photos);
    void DeletePark(int id);

    // Bucket List Items
    void CreateBucketListItem(BucketListItemDTO item);
    void UpdateBucketListItem(BucketListItemDTO item);
    void DeleteBucketListItem(int id);

    // Trails
    void CreateTrail(Trail trail, List<TrailIcon> icons);
    void UpdateTrail(Trail trail, List<TrailIcon> icons);
    void DeleteTrail(int id);

    // Users
    void UpdatePassword(int userId, string password);
    void UpdateRole(int userId, string role);
}