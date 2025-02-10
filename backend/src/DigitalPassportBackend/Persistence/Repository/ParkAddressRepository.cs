using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class ParkAddressRepository(DigitalPassportDbContext digitalPassportDbContext) : IRepository<ParkAddress>
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    public List<ParkAddress> GetByLocationId(int locationId)
    {
        return _digitalPassportDbContext.ParkAddresses.Where(a => a.parkId.Equals(locationId)).ToList();
    }

    public ParkAddress GetById(int id)
    {
        var result = _digitalPassportDbContext.ParkAddresses.Where(a => a.id.Equals(id)).SingleOrDefault();
        if (result is null)
        {
            throw new NotFoundException($"ParkPhoto not found with id {id}");
        }
        return result;
    }
}