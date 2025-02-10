using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class TrailIconRepository(DigitalPassportDbContext digitalPassportDbContext) : ITrailIconRepository
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    public TrailIcon GetById(int id)
    {
        var result = _digitalPassportDbContext.TrailIcons.Where(a => a.id.Equals(id)).SingleOrDefault();
        if (result is null)
        {
            throw new NotFoundException($"Trail Icon not found with id {id}");
        }
        return result;
    }
}