using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class BucketListItemRepository(DigitalPassportDbContext digitalPassportDbContext)
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    public List<BucketListItem> GetByLocationId(int locationId)
    {
        return _digitalPassportDbContext.BucketListItems.Where(b => b.parkId.Equals(locationId)).ToList();
    }
}