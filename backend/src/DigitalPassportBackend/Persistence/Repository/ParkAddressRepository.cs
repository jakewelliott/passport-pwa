using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class ParkAddressRepository(DigitalPassportDbContext digitalPassportDbContext)
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    public List<ParkAddress> GetByLocationId(int locationId)
    {
        return _digitalPassportDbContext.ParkAddresses.Where(a => a.parkId.Equals(locationId)).ToList();
    }
}