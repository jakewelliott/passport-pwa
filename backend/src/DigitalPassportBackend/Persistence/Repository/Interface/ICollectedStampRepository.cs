using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Persistence.Repository;

public interface ICollectedStampRepository : IRepository<CollectedStamp>
{
    // CREATE

    // READ
    CollectedStamp? GetByParkAndUser(int locationId, int userId);
    List<CollectedStamp> GetByUser(int userId);

    // UPDATE

    // DELETE
}
