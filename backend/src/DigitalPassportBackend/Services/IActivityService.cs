
using DigitalPassportBackend.Domain;

using NetTopologySuite.Geometries;

namespace DigitalPassportBackend.Services;

public interface IActivityService
{
    CollectedStamp CollectStamp(string park_abbreviation, double latitude, double longitude, double inaccuracyRadius, string method, DateTime? dateTime, int userId);

    ParkActivity GetParkActivity(int locationId, int userId);
}
