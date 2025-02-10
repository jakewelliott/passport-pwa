using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class ParkPhotoRepository(DigitalPassportDbContext digitalPassportDbContext) : IParkPhotoRepository
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    public List<ParkPhoto> GetByLocationId(int locationId)
    {
        return _digitalPassportDbContext.ParkPhotos.Where(a => a.parkId.Equals(locationId)).ToList();
    }

    public ParkPhoto GetById(int id)
    {
        var result = _digitalPassportDbContext.ParkPhotos.Where(a => a.id.Equals(id)).SingleOrDefault();
        if (result is null)
        {
            throw new NotFoundException($"Park Photo not found with id {id}");
        }
        return result;
    }

    public ParkPhoto Delete(int id)
    {
        var result = GetById(id);
        _digitalPassportDbContext.ParkPhotos.Remove(result);
        _digitalPassportDbContext.SaveChanges();
        return result;
    }

    public ParkPhoto Update(ParkPhoto entity)
    {
        var existingItem = GetById(entity.id);
        _digitalPassportDbContext.Entry(existingItem).CurrentValues.SetValues(entity);
        _digitalPassportDbContext.SaveChanges();
        return existingItem;
    }

    public int Count()
    {
        return _digitalPassportDbContext.ParkPhotos.Count();
    }

    public ParkPhoto Create(ParkPhoto entity)
    {
        _digitalPassportDbContext.ParkPhotos.Add(entity);
        _digitalPassportDbContext.SaveChanges();
        return entity;
    }
}