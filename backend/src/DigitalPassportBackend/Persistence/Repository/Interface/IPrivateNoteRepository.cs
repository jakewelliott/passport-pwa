using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Persistence.Repository;

public interface IPrivateNoteRepository : IRepository<PrivateNote>
{
    PrivateNote? GetByParkAndUser(int userId, int locationId);
    List<PrivateNote> GetByUser(int userId);
}
