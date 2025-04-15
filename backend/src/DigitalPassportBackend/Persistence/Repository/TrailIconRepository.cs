using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class TrailIconRepository(DigitalPassportDbContext digitalPassportDbContext) : ITrailIconRepository
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    // CREATE
    public TrailIcon Create(TrailIcon entity)
    {
        _digitalPassportDbContext.TrailIcons.Add(entity);
        _digitalPassportDbContext.SaveChanges();
        return entity;
    }

    // READ
    public TrailIcon GetById(int id)
    {
        var result = _digitalPassportDbContext.TrailIcons.Where(a => a.id.Equals(id)).SingleOrDefault();
        if (result is null)
        {
            throw new NotFoundException($"Trail Icon not found with id {id}");
        }
        return result;
    }

    public List<TrailIcon> GetByTrailId(int trailId)
    {
        return [.. _digitalPassportDbContext.TrailIcons
            .Where(i => i.trailId == trailId)];
    }

    public int Count()
    {
        return _digitalPassportDbContext.TrailIcons.Count();
    }

    // UPDATE
    public TrailIcon Update(TrailIcon entity)
    {
        var existingItem = GetById(entity.id);
        _digitalPassportDbContext.Entry(existingItem).CurrentValues.SetValues(entity);
        _digitalPassportDbContext.SaveChanges();
        return existingItem;
    }

    // DELETE
    public TrailIcon Delete(int id)
    {
        var result = GetById(id);
        _digitalPassportDbContext.TrailIcons.Remove(result);
        _digitalPassportDbContext.SaveChanges();
        return result;
    }
}