
using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class LocationsRepository(DigitalPassportDbContext digitalPassportDbContext) : ILocationsRepository
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    // CREATE
    public Park Create(Park entity)
    {
        _digitalPassportDbContext.Parks.Add(entity);
        _digitalPassportDbContext.SaveChanges();
        return entity;
    }

    // READ
    public List<Park> GetAll()
    {
        return _digitalPassportDbContext.Parks.ToList();
    }
    
    public Park GetByAbbreviation(string abbreviation)
    {
        var result = _digitalPassportDbContext.Parks.Where(l => l.parkAbbreviation.Equals(abbreviation)).SingleOrDefault();
        if (result is null)
        {
            throw new NotFoundException($"Park not found with abbreviation {abbreviation}");
        }
        return result;
    }

    public Park GetById(int id)
    {
        var result = _digitalPassportDbContext.Parks.Where(a => a.id.Equals(id)).SingleOrDefault();
        if (result is null)
        {
            throw new NotFoundException($"Park not found with id {id}");
        }
        return result;
    }

    public int Count()
    {
        return _digitalPassportDbContext.Parks.Count();
    }

    // UPDATE
    public Park Update(Park entity)
    {
        var existingItem = GetById(entity.id);
        _digitalPassportDbContext.Entry(existingItem).CurrentValues.SetValues(entity);
        _digitalPassportDbContext.SaveChanges();
        return existingItem;
    }

    // DELETE
    public Park Delete(int id)
    {
        var result = GetById(id);
        _digitalPassportDbContext.Parks.Remove(result);
        _digitalPassportDbContext.SaveChanges();
        return result;
    }
}