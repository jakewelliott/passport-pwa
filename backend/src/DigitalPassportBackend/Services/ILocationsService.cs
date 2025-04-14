
using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Services;

public interface ILocationsService
{
    // Parks
    public void CreatePark(
        Park park,
        List<ParkAddress> addrs,
        List<ParkIcon> icons,
        List<BucketListItem> blItems,
        List<ParkPhoto> photos);

    public List<Park> GetAll();

    public Park GetById(int id);

    public Park GetByAbbreviation(string locationAbbrev);

    public void UpdatePark(
        Park park,
        List<ParkAddress> addrs,
        List<ParkIcon> icons,
        List<BucketListItem> blItems,
        List<ParkPhoto> photos);

    public void DeletePark(int id);

    // Park Addresses
    public List<ParkAddress> GetAddressesByLocationId(int id);

    // Park Icons
    public List<ParkIcon> GetIconsByLocationId(int id);

    // Park Photos
    public List<ParkPhoto> GetParkPhotosByLocationId(int id);

    // Trails
    public void CreateTrail(Trail trail, List<TrailIcon> icons);

    public List<Trail> GetAllTrails();

    public void UpdateTrail(Trail trail, List<TrailIcon> icons);

    public void DeleteTrail(int id);

    // Trail Icons
    public List<TrailIcon> GetTrailIcons(int trailId);

    // Bucket List
    public List<BucketListItem> GetBucketListItemsByLocationId(int id);

    // General
    public string UploadGeoJson(IFormFile file);

}
