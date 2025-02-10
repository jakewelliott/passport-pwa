using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class ParkPhotoRepository(DigitalPassportDbContext digitalPassportDbContext) : IRepository<ParkPhoto>
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    public List<ParkPhoto> GetByLocationId(int locationId)
    {
        return _digitalPassportDbContext.ParkPhotos.Where(a => a.parkId.Equals(locationId)).ToList();
    }

    public ParkPhoto GetById(int id)
    {
        var result = _digitalPassportDbContext.ParkPhotos.Where(a => a.id.Equals(id)).SingleOrDefault();
        if (result is null)
        {
            throw new NotFoundException($"ParkPhoto not found with id {id}");
        }
        return result;
    }
}