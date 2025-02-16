
using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Persistence.Repository;

public interface ILocationsRepository : IRepository<Park>
{
    List<Park> GetAll();

    Park GetByAbbreviation(string abbreviation);
}
