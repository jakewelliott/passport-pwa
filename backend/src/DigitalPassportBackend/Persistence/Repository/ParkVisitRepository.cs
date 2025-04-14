using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class ParkVisitRepository(DigitalPassportDbContext digitalPassportDbContext) : IParkVisitRepository
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    // CREATE
    public ParkVisit Create(ParkVisit entity)
    {
        _digitalPassportDbContext.ParkVisits.Add(entity);
        _digitalPassportDbContext.SaveChanges();
        return entity;
    }

    // READ
    public ParkVisit GetById(int id)
    {
        var result = _digitalPassportDbContext.ParkVisits.Where(a => a.id.Equals(id)).SingleOrDefault();
        if (result is null)
        {
            throw new NotFoundException($"Park Visit not found with id {id}");
        }
        return result;
    }

    public List<ParkVisit> GetByParkAndUser(int locationId, int userId)
    {
        return _digitalPassportDbContext.ParkVisits.Where(s => s.parkId == locationId && s.userId == userId).OrderByDescending(v => v.createdAt).ToList();
    }

    public List<ParkVisit> GetAllByUser(int userId)
    {
        return _digitalPassportDbContext.ParkVisits
            .Where(i => i.userId == userId)
            .OrderByDescending(i => i.createdAt)
            .ToList();
    }

    public ParkVisit? GetParkVisitToday(int userId, int parkId)
    {
        return _digitalPassportDbContext.ParkVisits
            .Where(v => v.userId == userId && v.parkId == parkId && v.createdAt.Date == DateTime.Today)
            .FirstOrDefault();
    }

    public int Count()
    {
        return _digitalPassportDbContext.ParkVisits.Count();
    }

    // UPDATE
    public ParkVisit Update(ParkVisit entity)
    {
        var existingItem = GetById(entity.id);
        _digitalPassportDbContext.Entry(existingItem).CurrentValues.SetValues(entity);
        _digitalPassportDbContext.SaveChanges();
        return existingItem;
    }
    
    // DELETE
    public ParkVisit Delete(int id)
    {
        var result = GetById(id);
        _digitalPassportDbContext.ParkVisits.Remove(result);
        _digitalPassportDbContext.SaveChanges();
        return result;
    }
}
