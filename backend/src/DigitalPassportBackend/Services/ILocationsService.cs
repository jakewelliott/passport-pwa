using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Services;

public interface ILocationsService
{
    List<ParkAddress> GetAddressesByLocationId(int id);
    List<BucketListItem> GetBucketListItemsByLocationId(int id);
    Park GetByAbbreviation(string locationAbbrev);
    List<ParkIcon> GetIconsByLocationId(int id);
    List<ParkSummary> GetLocationSummary();
    List<ParkPhoto> GetParkPhotosByLocationId(int id);
}
