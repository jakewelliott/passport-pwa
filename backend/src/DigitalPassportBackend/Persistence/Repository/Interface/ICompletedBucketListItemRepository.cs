using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Persistence.Repository;

public interface ICompletedBucketListItemRepository : IRepository<CompletedBucketListItem>
{
	// CREATE

	// READ
    List<CompletedBucketListItem> GetByParkAndUser(int locationId, int userId);
	List<CompletedBucketListItem> GetByUser(int userId);
	CompletedBucketListItem? GetByItemAndUser(int itemId, int userId);

	// UPDATE

	// DELETE
}
