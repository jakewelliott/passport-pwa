using DigitalPassportBackend.Domain;
using System.Collections.Generic;

namespace DigitalPassportBackend.Persistence.Repository;

public interface IBucketListItemRepository : IRepository<BucketListItem>
{
    // CREATE

    // READ
    List<BucketListItem> GetByLocationId(int locationId);
    List<BucketListItem> GetAll();

    // UPDATE

    // DELETE
}
