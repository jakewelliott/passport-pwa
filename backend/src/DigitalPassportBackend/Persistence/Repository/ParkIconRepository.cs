using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class ParkIconRepository(DigitalPassportDbContext digitalPassportDbContext)
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    public List<ParkIcon> GetByLocationId(int locationId)
    {
        return _digitalPassportDbContext.ParkIcons.Where(a => a.parkId.Equals(locationId)).ToList();
    }
}