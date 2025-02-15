using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Persistence.Repository;

public interface ICollectedStampRepository : IRepository<CollectedStamp>
{
    CollectedStamp? GetByParkAndUser(int locationId, int userId);
}
