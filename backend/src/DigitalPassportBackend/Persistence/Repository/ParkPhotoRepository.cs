using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class ParkPhotoRepository(DigitalPassportDbContext digitalPassportDbContext)
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    public List<ParkPhoto> GetByLocationId(int locationId)
    {
        return _digitalPassportDbContext.ParkPhotos.Where(a => a.parkId.Equals(locationId)).ToList();
    }
}