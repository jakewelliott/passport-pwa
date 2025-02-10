using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class ParkIconRepository(DigitalPassportDbContext digitalPassportDbContext) : IParkIconRepository
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    public ParkIcon GetById(int id)
    {
        var result = _digitalPassportDbContext.ParkIcons.Where(a => a.id.Equals(id)).SingleOrDefault();
        if (result is null)
        {
            throw new NotFoundException($"Park Icon not found with id {id}");
        }
        return result;
    }


    public List<ParkIcon> GetByLocationId(int locationId)
    {
        return _digitalPassportDbContext.ParkIcons.Where(a => a.parkId.Equals(locationId)).ToList();
    }
}