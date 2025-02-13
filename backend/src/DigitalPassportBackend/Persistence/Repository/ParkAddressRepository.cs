using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class ParkAddressRepository(DigitalPassportDbContext digitalPassportDbContext) : IParkAddressRepository
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    public List<ParkAddress> GetByLocationId(int locationId)
    {
        return _digitalPassportDbContext.ParkAddresses.Where(a => a.parkId.Equals(locationId)).ToList();
    }

    public ParkAddress GetById(int id)
    {
        var result = _digitalPassportDbContext.ParkAddresses.Where(a => a.id.Equals(id)).SingleOrDefault();
        if (result is null)
        {
            throw new NotFoundException($"Park Address not found with id {id}");
        }
        return result;
    }

    public ParkAddress Delete(int id)
    {
        var result = GetById(id);
        _digitalPassportDbContext.ParkAddresses.Remove(result);
        _digitalPassportDbContext.SaveChanges();
        return result;
    }

    public ParkAddress Update(ParkAddress entity)
    {
        var existingItem = GetById(entity.id);
        _digitalPassportDbContext.Entry(existingItem).CurrentValues.SetValues(entity);
        _digitalPassportDbContext.SaveChanges();
        return existingItem;
    }

    public int Count()
    {
        return _digitalPassportDbContext.ParkAddresses.Count();
    }

    public ParkAddress Create(ParkAddress entity)
    {
        _digitalPassportDbContext.ParkAddresses.Add(entity);
        _digitalPassportDbContext.SaveChanges();
        return entity;
    }
}