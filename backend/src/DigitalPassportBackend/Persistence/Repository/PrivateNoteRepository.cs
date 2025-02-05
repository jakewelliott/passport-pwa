using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class PrivateNoteRepository(DigitalPassportDbContext digitalPassportDbContext)
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    public Park? GetByAbbreviation(string abbreviation)
    {
        return _digitalPassportDbContext.Parks.Where(l => l.park_abbreviation.Equals(abbreviation)).Single();
    }
}