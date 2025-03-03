using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class ParkVisitRepository(DigitalPassportDbContext digitalPassportDbContext) : IParkVisitRepository
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    public ParkVisit GetById(int id)
    {
        var result = _digitalPassportDbContext.ParkVisits.Where(a => a.id.Equals(id)).SingleOrDefault();
        if (result is null)
        {
            throw new NotFoundException($"Park Visit not found with id {id}");
        }
        return result;
    }

    public ParkVisit Delete(int id)
    {
        var result = GetById(id);
        _digitalPassportDbContext.ParkVisits.Remove(result);
        _digitalPassportDbContext.SaveChanges();
        return result;
    }

    public ParkVisit Update(ParkVisit entity)
    {
        var existingItem = GetById(entity.id);
        _digitalPassportDbContext.Entry(existingItem).CurrentValues.SetValues(entity);
        _digitalPassportDbContext.SaveChanges();
        return existingItem;
    }

    public int Count()
    {
        return _digitalPassportDbContext.ParkVisits.Count();
    }

    public ParkVisit Create(ParkVisit entity)
    {
        _digitalPassportDbContext.ParkVisits.Add(entity);
        _digitalPassportDbContext.SaveChanges();
        return entity;
    }

    public List<ParkVisit> GetByParkAndUser(int locationId, int userId)
    {
        return _digitalPassportDbContext.ParkVisits.Where(s => s.parkId == locationId && s.userId == userId).OrderByDescending(v => v.createdAt).ToList();
    }

    public List<ParkVisit> GetLatestByUser(int userId)
    {
        return [.. _digitalPassportDbContext.ParkVisits
            .Where(i => i.userId == userId)
            .OrderByDescending(i => i.createdAt)
            .GroupBy(i => i.parkId)
            .Select(i => i.First())];
    }
}
