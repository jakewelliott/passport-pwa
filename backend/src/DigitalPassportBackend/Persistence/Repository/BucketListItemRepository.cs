using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class BucketListItemRepository(DigitalPassportDbContext digitalPassportDbContext) : IRepository<BucketListItem>
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
            throw new NotFoundException($"ParkPhoto not found with id {id}");
        }
        return result;
    }
}