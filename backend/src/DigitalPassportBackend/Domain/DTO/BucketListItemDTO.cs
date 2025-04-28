namespace DigitalPassportBackend.Domain.DTO;
using System.Diagnostics.CodeAnalysis;

[ExcludeFromCodeCoverage]
public record BucketListItemDTO(
    int id,
    string task,
    int parkId)
{
    public static BucketListItemDTO FromDomain(BucketListItem bucketListItem)
    {
        return new BucketListItemDTO(bucketListItem.id, bucketListItem.task, bucketListItem.parkId!.Value);
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
