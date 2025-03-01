
using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Services;
public interface IActivityService
{
    List<CollectedStamp> GetCollectedStamps(int userId);
    CollectedStamp CollectStamp(string park_abbreviation, double latitude, double longitude, double inaccuracyRadius, string method, DateTime? dateTime, int userId);
    ParkActivity GetParkActivity(int locationId, int userId);
    PrivateNote CreatePrivateNote(string parkAbbr, int userId, string note);
    PrivateNote UpdatePrivateNote(int noteId, int userId, string note);
}
