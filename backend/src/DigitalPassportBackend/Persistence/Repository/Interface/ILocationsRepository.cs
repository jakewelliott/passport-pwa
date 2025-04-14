
using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Persistence.Repository;

public interface ILocationsRepository : IRepository<Park>
{
    // CREATE

    // READ
    List<Park> GetAll();
    Park GetByAbbreviation(string abbreviation);

    // UPDATE

    // DELETE
}
