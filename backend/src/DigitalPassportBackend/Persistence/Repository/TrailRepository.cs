using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class TrailRepository(DigitalPassportDbContext digitalPassportDbContext) : ITrailRepository
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    // CREATE
    public Trail Create(Trail entity)
    {
        _digitalPassportDbContext.Trails.Add(entity);
        _digitalPassportDbContext.SaveChanges();
        return entity;
    }

    // READ
    public Trail GetById(int id)
    {
        var result = _digitalPassportDbContext.Trails.Where(a => a.id.Equals(id)).SingleOrDefault();
        if (result is null)
        {
            throw new NotFoundException($"Trail not found with id {id}");
        }
        return result;
    }

    public List<Trail> GetAll()
    {
        return [.. _digitalPassportDbContext.Trails];
    }

    public Trail? GetByName(string name)
    {
        return _digitalPassportDbContext.Trails
            .Where(t => t.trailName == name)
            .FirstOrDefault();
    }

    public int Count()
    {
        return _digitalPassportDbContext.Trails.Count();
    }

    // UPDATE
    public Trail Update(Trail entity)
    {
        var existingItem = GetById(entity.id);
        _digitalPassportDbContext.Entry(existingItem).CurrentValues.SetValues(entity);
        _digitalPassportDbContext.SaveChanges();
        return existingItem;
    }

    // DELETE
    public Trail Delete(int id)
    {
        var result = GetById(id);
        _digitalPassportDbContext.Trails.Remove(result);
        _digitalPassportDbContext.SaveChanges();
        return result;
    }
}