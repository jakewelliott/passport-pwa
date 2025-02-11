using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Persistence.Repository;

public interface ICompletedBucketListItemRepository : IRepository<CompletedBucketListItem>
{
    Park? GetByAbbreviation(string abbreviation);
}
