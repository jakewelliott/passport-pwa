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

    public PrivateNote Delete(int id)
    {
        var result = GetById(id);
        _digitalPassportDbContext.PrivateNotes.Remove(result);
        _digitalPassportDbContext.SaveChanges();
        return result;
    }

    public PrivateNote Update(PrivateNote entity)
    {
        var existingItem = GetById(entity.id);
        _digitalPassportDbContext.Entry(existingItem).CurrentValues.SetValues(entity);
        _digitalPassportDbContext.SaveChanges();
        return existingItem;
    }

    public int Count()
    {
        return _digitalPassportDbContext.PrivateNotes.Count();
    }

    public PrivateNote Create(PrivateNote entity)
    {
        _digitalPassportDbContext.PrivateNotes.Add(entity);
        _digitalPassportDbContext.SaveChanges();
        return entity;
    }

    public PrivateNote? GetByParkAndUser(int? locationId, int userId)
    {
        if (locationId == 0)
            locationId = null;
        return _digitalPassportDbContext.PrivateNotes.Where(s => s.parkId == locationId && s.userId == userId).FirstOrDefault();
    }

    public List<PrivateNote> GetByUser(int userId)
    {
        return _digitalPassportDbContext.PrivateNotes.Where(s => s.userId == userId).ToList();
    }

}
