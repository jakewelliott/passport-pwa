using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Persistence.Repository;

public interface IPrivateNoteRepository : IRepository<PrivateNote>
{
    // CREATE

    // READ
    PrivateNote? GetByParkAndUser(int userId, int locationId);
    List<PrivateNote> GetByUser(int userId);

    // UPDATE

    // DELETE
}
