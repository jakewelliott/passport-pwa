using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class CollectedStampRepository(DigitalPassportDbContext digitalPassportDbContext) : ICollectedStampRepository
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    public Park? GetByAbbreviation(string abbreviation)
    {
        return _digitalPassportDbContext.Parks.Where(l => l.parkAbbreviation.Equals(abbreviation)).Single();
    }

    public CollectedStamp GetById(int id)
    {
        var result = _digitalPassportDbContext.CollectedStamps.Where(a => a.id.Equals(id)).SingleOrDefault();
        if (result is null)
        {
            throw new NotFoundException($"Collected Stamp not found with id {id}");
        }
        return result;
    }

    public CollectedStamp Delete(int id)
    {
        var result = GetById(id);
        _digitalPassportDbContext.CollectedStamps.Remove(result);
        _digitalPassportDbContext.SaveChanges();
        return result;
    }

    public CollectedStamp Update(CollectedStamp entity)
    {
        var existingItem = GetById(entity.id);
        _digitalPassportDbContext.Entry(existingItem).CurrentValues.SetValues(entity);
        _digitalPassportDbContext.SaveChanges();
        return existingItem;
    }

    public int Count()
    {
        return _digitalPassportDbContext.CollectedStamps.Count();
    }

    public CollectedStamp Create(CollectedStamp entity)
    {
        _digitalPassportDbContext.CollectedStamps.Add(entity);
        _digitalPassportDbContext.SaveChanges();
        return entity;
    }
}