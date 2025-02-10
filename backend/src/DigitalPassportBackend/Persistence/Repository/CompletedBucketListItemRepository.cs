using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class CompletedBucketListItemRepository(DigitalPassportDbContext digitalPassportDbContext) : ICompletedBucketListItemRepository
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    public Park? GetByAbbreviation(string abbreviation)
    {
        return _digitalPassportDbContext.Parks.Where(l => l.parkAbbreviation.Equals(abbreviation)).Single();
    }

    public CompletedBucketListItem GetById(int id)
    {
        var result = _digitalPassportDbContext.CompletedBucketListItems.Where(a => a.id.Equals(id)).SingleOrDefault();
        if (result is null)
        {
            throw new NotFoundException($"Completed Bucket List Item not found with id {id}");
        }
        return result;
    }
}