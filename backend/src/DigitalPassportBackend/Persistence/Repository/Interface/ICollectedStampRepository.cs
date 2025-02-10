using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Persistence.Repository;

public interface ICollectedStampRepository : IRepository<CollectedStamp>
{
    Park? GetByAbbreviation(string abbreviation);
}
