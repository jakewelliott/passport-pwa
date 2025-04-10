namespace DigitalPassportBackend.Domain.DTO;

public record BucketListItemDTO(
    int id,
    string task)
{
    public static BucketListItemDTO FromDomain(BucketListItem bucketListItem)
    {
        return new BucketListItemDTO(bucketListItem.id, bucketListItem.task);
    }

    public BucketListItem ToDomain(Park park)
    {
        return new()
        {
            id = id,
            task = task,
            park = park
        };
    }
}
