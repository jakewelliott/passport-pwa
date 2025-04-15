using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Collections.Generic;

namespace DigitalPassportBackend.Domain;

[ExcludeFromCodeCoverage]
[Table("trails")]
public class Trail : IEntity
{
    public int id { get; init; }
    [Column("trail_name")]
    public required string trailName { get; set; }
    [Column("length")]
    public string? length { get; set; }
    [Column(TypeName="longtext")]
    public required string description { get; set; }
    [Column("created_at")]
    public DateTime createdAt { get; set; } = DateTime.UtcNow;
    [Column("updated_at")]
    public DateTime updatedAt { get; set; } = DateTime.UtcNow;

    public virtual ICollection<TrailIcon> Icons { get; set; } = new List<TrailIcon>();
}