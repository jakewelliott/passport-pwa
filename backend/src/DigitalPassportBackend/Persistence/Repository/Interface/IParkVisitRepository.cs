using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Persistence.Repository;

public interface IParkVisitRepository : IRepository<ParkVisit>
{
    List<ParkVisit> GetByParkAndUser(int locationId, int userId);
    List<ParkVisit> GetLatestByUser(int userId);
}
