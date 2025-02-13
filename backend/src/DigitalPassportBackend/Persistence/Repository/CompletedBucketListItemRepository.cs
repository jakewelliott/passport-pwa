using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class CompletedBucketListItemRepository(DigitalPassportDbContext digitalPassportDbContext) : ICompletedBucketListItemRepository
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    public CompletedBucketListItem GetById(int id)
    {
        var result = _digitalPassportDbContext.CompletedBucketListItems.Where(a => a.id.Equals(id)).SingleOrDefault();
        if (result is null)
        {
            throw new NotFoundException($"Completed Bucket List Item not found with id {id}");
        }
        return result;
    }

    public CompletedBucketListItem Delete(int id)
    {
        var result = GetById(id);
        _digitalPassportDbContext.CompletedBucketListItems.Remove(result);
        _digitalPassportDbContext.SaveChanges();
        return result;
    }

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

    public CompletedBucketListItem Create(CompletedBucketListItem entity)
    {
        _digitalPassportDbContext.CompletedBucketListItems.Add(entity);
        _digitalPassportDbContext.SaveChanges();
        return entity;
    }
}