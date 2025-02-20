using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Persistence.Repository;

public interface ICompletedBucketListItemRepository : IRepository<CompletedBucketListItem>
{
    List<CompletedBucketListItem> GetByParkAndUser(int locationId, int userId);
}
