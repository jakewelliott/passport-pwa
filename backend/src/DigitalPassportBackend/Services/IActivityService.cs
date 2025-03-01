
using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Services;
public interface IActivityService
{
    List<CollectedStamp> GetCollectedStamps(int userId);
    CollectedStamp CollectStamp(string park_abbreviation, double latitude, double longitude, double inaccuracyRadius, string method, DateTime? dateTime, int userId);
    ParkActivity GetParkActivity(int locationId, int userId);
    PrivateNote CreateUpdatePrivateNote(string parkAbbr, int userId, string note, string updatedAt);
}
