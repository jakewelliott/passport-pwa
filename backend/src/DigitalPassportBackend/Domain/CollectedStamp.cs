using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

using NetTopologySuite.Geometries;

namespace DigitalPassportBackend.Domain;

[ExcludeFromCodeCoverage]
[Table("collected_stamps")]
public class CollectedStamp : IEntity
{
    public int id { get; init; }
    public required StampCollectionMethod method { get; set; }
    public required Point location { get; set; }
    [Column("created_at")]
    public DateTime createdAt { get; set; } = DateTime.UtcNow;
    [Column("updated_at")]
    public DateTime updatedAt { get; set; } = DateTime.UtcNow;

    // References
    [ForeignKey("user")]
    [Column("user")]
    public int userId { get; set; }
    public required User user { get; set; }
    [ForeignKey("park")]
    [Column("park")]
    public int parkId { get; set; }
    public required Park park { get; set; }
}

public enum StampCollectionMethod
{
    manual,
    location
}