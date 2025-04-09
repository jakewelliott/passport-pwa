namespace DigitalPassportBackend.Domain.DTO;

public record BucketListItemDTO(
    int id,
    string task)
{
    public static BucketListItemDTO FromDomain(BucketListItem bucketListItem)
    {
        return new BucketListItemDTO(bucketListItem.id, bucketListItem.task);
    }
}
