using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Persistence.Repository;

public interface IParkVisitRepository : IRepository<ParkVisit>
{
    List<ParkVisit> GetByParkAndUser(int locationId, int userId);
    List<ParkVisit> GetAllByUser(int userId);
		bool HasVisitedParkToday(int userId, int parkId);
}
