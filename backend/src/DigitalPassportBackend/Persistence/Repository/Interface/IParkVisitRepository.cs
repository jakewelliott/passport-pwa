using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Persistence.Repository;

public interface IParkVisitRepository : IRepository<ParkVisit>
{
    // CREATE

    // READ
    List<ParkVisit> GetByParkAndUser(int locationId, int userId);
    List<ParkVisit> GetAllByUser(int userId);
		ParkVisit? GetParkVisitToday(int userId, int parkId);

    // UPDATE

    // DELETE
}
