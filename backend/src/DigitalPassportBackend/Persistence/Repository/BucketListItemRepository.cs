using System.Threading.Tasks;

using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class BucketListItemRepository(DigitalPassportDbContext digitalPassportDbContext) : IBucketListItemRepository
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    public List<BucketListItem> GetByLocationId(int locationId)
    {
        return _digitalPassportDbContext.BucketListItems.Where(b => b.parkId.Equals(locationId)).ToList();
    }

    public BucketListItem GetById(int id)
    {
        var result = _digitalPassportDbContext.BucketListItems.Where(a => a.id.Equals(id)).SingleOrDefault();
        if (result is null)
        {
            throw new NotFoundException($"Bucket List Item not found with id {id}");
        }
        return result;
    }

    public BucketListItem Delete(int id)
    {
        var result = GetById(id);
        _digitalPassportDbContext.BucketListItems.Remove(result);
        _digitalPassportDbContext.SaveChanges();
        return result;
    }

    public BucketListItem Update(BucketListItem entity)
    {
        var existingItem = GetById(entity.id);
        _digitalPassportDbContext.Entry(existingItem).CurrentValues.SetValues(entity);
        _digitalPassportDbContext.SaveChanges();
        return existingItem;
    }

    public int Count()
    {
        return _digitalPassportDbContext.BucketListItems.Count();
    }

    public BucketListItem Create(BucketListItem entity)
    {
        _digitalPassportDbContext.BucketListItems.Add(entity);
        _digitalPassportDbContext.SaveChanges();
        return entity;
    }
}