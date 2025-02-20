using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Services;

public interface IActivityService
{
    ParkActivity GetParkActivity(int locationId, int userId);
}
