namespace DigitalPassportBackend.Domain.DTO;

public record BucketListItemDTO(
    int id,
    string task,
    int parkId)
{
    public static BucketListItemDTO FromDomain(BucketListItem bucketListItem)
    {
        return new(
            id: bucketListItem.id,
            task: bucketListItem.task,
            parkId: bucketListItem.parkId ?? 0
        );
    }

    public BucketListItem ToDomain(Park park)
    {
        return new()
        {
            id = id,
            task = task,
            parkId = parkId,
            park = park
        };
    }
}
