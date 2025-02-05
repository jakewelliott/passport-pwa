using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class TrailRepository(DigitalPassportDbContext digitalPassportDbContext)
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    public Park? GetByAbbreviation(string abbreviation)
    {
        return _digitalPassportDbContext.Parks.Where(l => l.parkAbbreviation.Equals(abbreviation)).Single();
    }
}