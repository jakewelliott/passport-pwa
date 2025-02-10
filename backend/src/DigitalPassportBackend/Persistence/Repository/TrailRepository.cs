using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class TrailRepository(DigitalPassportDbContext digitalPassportDbContext) : ITrailRepository
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    public Trail GetById(int id)
    {
        var result = _digitalPassportDbContext.Trails.Where(a => a.id.Equals(id)).SingleOrDefault();
        if (result is null)
        {
            throw new NotFoundException($"Trail not found with id {id}");
        }
        return result;
    }
}