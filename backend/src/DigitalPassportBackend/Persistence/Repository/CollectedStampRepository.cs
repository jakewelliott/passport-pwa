using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class CollectedStampRepository(DigitalPassportDbContext digitalPassportDbContext) : ICollectedStampRepository
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    // CREATE
    public CollectedStamp Create(CollectedStamp entity)
    {
        _digitalPassportDbContext.CollectedStamps.Add(entity);
        _digitalPassportDbContext.SaveChanges();
        return entity;
    }

    // READ
    public CollectedStamp GetById(int id)
    {
        var result = _digitalPassportDbContext.CollectedStamps.Where(a => a.id.Equals(id)).SingleOrDefault();
        if (result is null)
        {
            throw new NotFoundException($"Collected Stamp not found with id {id}");
        }
        return result;
    }

    public CollectedStamp? GetByParkAndUser(int locationId, int userId)
    {
        return _digitalPassportDbContext.CollectedStamps.Where(s => s.parkId == locationId && s.userId == userId).OrderByDescending(v => v.createdAt).FirstOrDefault();
    }

    public List<CollectedStamp> GetByUser(int userId)
    {
        return _digitalPassportDbContext.CollectedStamps.Where(s => s.userId == userId).ToList();
    }

    public int Count()
    {
        return _digitalPassportDbContext.CollectedStamps.Count();
    }

    // UPDATE
    public CollectedStamp Update(CollectedStamp entity)
    {
        var existingItem = GetById(entity.id);
        _digitalPassportDbContext.Entry(existingItem).CurrentValues.SetValues(entity);
        _digitalPassportDbContext.SaveChanges();
        return existingItem;
    }

    // DELETE
    public CollectedStamp Delete(int id)
    {
        var result = GetById(id);
        _digitalPassportDbContext.CollectedStamps.Remove(result);
        _digitalPassportDbContext.SaveChanges();
        return result;
    }
}
