using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Persistence.Repository;

public interface ILocationsRepository : IRepository<Park>
{
    Park GetByAbbreviation(string abbreviation);
}
