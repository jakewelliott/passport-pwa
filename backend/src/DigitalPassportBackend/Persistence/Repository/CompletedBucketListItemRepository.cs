using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class CompletedBucketListItemRepository(DigitalPassportDbContext digitalPassportDbContext) : ICompletedBucketListItemRepository
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    // CREATE
    public CompletedBucketListItem Create(CompletedBucketListItem entity)
    {
        _digitalPassportDbContext.CompletedBucketListItems.Add(entity);
        _digitalPassportDbContext.SaveChanges();
        return entity;
    }

    // READ
    public CompletedBucketListItem GetById(int id)
    {
        var result = _digitalPassportDbContext.CompletedBucketListItems.Where(a => a.id.Equals(id)).SingleOrDefault();
        if (result is null)
        {
            throw new NotFoundException($"Completed Bucket List Item not found with id {id}");
        }
        return result;
    }

    public List<CompletedBucketListItem> GetByParkAndUser(int locationId, int userId)
    {
        return _digitalPassportDbContext.CompletedBucketListItems.Where(s => s.parkId == locationId && s.userId == userId).ToList();
    }

    public List<CompletedBucketListItem> GetByUser(int userId)
    {
        return _digitalPassportDbContext.CompletedBucketListItems.Where(s => s.userId == userId).ToList();
    }

    public CompletedBucketListItem? GetByItemAndUser(int itemId, int userId)
    {
        return _digitalPassportDbContext.CompletedBucketListItems.Where(s => s.bucketListItemId == itemId && s.userId == userId).SingleOrDefault();
    }

    // UPDATE
    public CompletedBucketListItem Update(CompletedBucketListItem entity)
    {
        var existingItem = GetById(entity.id);
        _digitalPassportDbContext.Entry(existingItem).CurrentValues.SetValues(entity);
        _digitalPassportDbContext.SaveChanges();
        return existingItem;
    }

    public int Count()
    {
        return _digitalPassportDbContext.CompletedBucketListItems.Count();
    }

    // DELETE
    public CompletedBucketListItem Delete(int id)
    {
        var result = GetById(id);
        _digitalPassportDbContext.CompletedBucketListItems.Remove(result);
        _digitalPassportDbContext.SaveChanges();
        return result;
    }
}
