using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class LocationsRepository(DigitalPassportDbContext digitalPassportDbContext) : ILocationsRepository
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    public Park GetByAbbreviation(string abbreviation)
    {
        var result = _digitalPassportDbContext.Parks.Where(l => l.parkAbbreviation.Equals(abbreviation)).SingleOrDefault();
        if (result is null)
        {
            throw new NotFoundException($"Park not found with abbreviation {abbreviation}");
        }
        return result;
    }

    public Park GetById(int id)
    {
        var result = _digitalPassportDbContext.Parks.Where(a => a.id.Equals(id)).SingleOrDefault();
        if (result is null)
        {
            throw new NotFoundException($"Park not found with id {id}");
        }
        return result;
    }
}