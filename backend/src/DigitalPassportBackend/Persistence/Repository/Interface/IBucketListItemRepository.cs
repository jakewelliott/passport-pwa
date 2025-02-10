using DigitalPassportBackend.Domain;
using System.Collections.Generic;

namespace DigitalPassportBackend.Persistence.Repository;

public interface IBucketListItemRepository : IRepository<BucketListItem>
{
    List<BucketListItem> GetByLocationId(int locationId);
}
