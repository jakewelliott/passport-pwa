using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Persistence.Repository;

public interface IPrivateNoteRepository : IRepository<PrivateNote>
{
    PrivateNote? GetByParkAndUser(int locationId, int userId);
    List<PrivateNote> GetByUser(int userId);
}
