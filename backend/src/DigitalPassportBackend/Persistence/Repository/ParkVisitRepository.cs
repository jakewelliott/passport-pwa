using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class ParkVisitRepository(DigitalPassportDbContext digitalPassportDbContext) : IParkVisitRepository
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    public ParkVisit GetById(int id)
    {
        var result = _digitalPassportDbContext.ParkVisits.Where(a => a.id.Equals(id)).SingleOrDefault();
        if (result is null)
        {
            throw new NotFoundException($"Park Visit not found with id {id}");
        }
        return result;
    }
}