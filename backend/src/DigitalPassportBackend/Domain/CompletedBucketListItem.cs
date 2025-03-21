using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

using NetTopologySuite.Geometries;

namespace DigitalPassportBackend.Domain;

[ExcludeFromCodeCoverage]
[Table("completed_bucket_list_items")]
public class CompletedBucketListItem : IEntity
{
    public int id { get; init; }
    public required Point location { get; set; }

    [Column("created_at")]
    public DateTime createdAt { get; set; } = DateTime.UtcNow;
    [Column("updated_at")]
    public DateTime updatedAt { get; set; } = DateTime.UtcNow;
    [Column("deleted")]
    public required bool deleted { get; set; } = false;

    // References
    [ForeignKey("park")]
    [Column("park")]
    public int? parkId { get; set; }
    public Park? park { get; set; }

    [ForeignKey("bucket_list_item")]
    [Column("bucket_list_item")]
    public int bucketListItemId { get; set; }
    public BucketListItem? bucketListItem { get; set; }

    [ForeignKey("user")]
    [Column("user")]
    public int userId { get; set; }
    public User? user { get; set; }
}