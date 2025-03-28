
using DigitalPassportBackend.Domain;


namespace DigitalPassportBackend.Services;

public interface ILocationsService
{
    List<ParkAddress> GetAddressesByLocationId(int id);
    List<Park> GetAll();

    List<BucketListItem> GetBucketListItemsByLocationId(int id);
    Park GetByAbbreviation(string locationAbbrev);
    List<ParkIcon> GetIconsByLocationId(int id);
    List<ParkPhoto> GetParkPhotosByLocationId(int id);
    string UploadGeoJson(IFormFile file);
    Park GetById(int id);
    List<Trail> GetAllTrails();
    List<TrailIcon> GetTrailIcons(int trailId);
}
