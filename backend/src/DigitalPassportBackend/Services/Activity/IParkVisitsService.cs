using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Services.Activity;

public interface IParkVisitsService
{
    ParkVisit Create(int userId, int parkId, Geeopoint geopoint);
    List<ParkVisit> GetAll(int userId);
}