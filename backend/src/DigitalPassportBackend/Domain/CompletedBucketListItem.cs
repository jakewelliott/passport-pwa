using System.ComponentModel.DataAnnotations.Schema;
using NetTopologySuite.Geometries;

namespace DigitalPassportBackend.Domain;

[Table("completed_bucket_list_items")]
public class CompletedBucketListItem
{
    public int id { get; init; }
    public required Point location { get; set; }

    [Column("created_at")]
    public DateTime created_at { get; set; } = DateTime.UtcNow;
    [Column("updated_at")]
    public DateTime updated_at { get; set; } = DateTime.UtcNow;

    // References
    [ForeignKey("park")]
    [Column("park")]
    public int parkId { get; set; }
    public required Park park { get; set; }
    [ForeignKey("bucket_list_item")]
    [Column("bucket_list_item")]
    public int bucketListItemId { get; set; }
    public required BucketListItem bucketListItem { get; set; }
    [ForeignKey("user")]
    [Column("user")]
    public int userId { get; set; }
    public required User user { get; set; }
}