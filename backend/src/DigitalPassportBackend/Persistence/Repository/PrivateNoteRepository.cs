using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class PrivateNoteRepository(DigitalPassportDbContext digitalPassportDbContext) : IPrivateNoteRepository
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    public PrivateNote GetById(int id)
    {
        var result = _digitalPassportDbContext.PrivateNotes.Where(a => a.id.Equals(id)).SingleOrDefault();
        if (result is null)
        {
            throw new NotFoundException($"Private Note not found with id {id}");
        }
        return result;
    }
}