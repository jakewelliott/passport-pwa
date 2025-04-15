using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.ComponentModel.DataAnnotations;

using NetTopologySuite.Geometries;

namespace DigitalPassportBackend.Domain;

[ExcludeFromCodeCoverage]
[Table("park_visits")]
public class ParkVisit : IEntity
{
    public int id { get; init; }
    
    [Column("created_at")]
    public DateTime createdAt { get; set; } = DateTime.UtcNow;
    [Column("updated_at")]
    public DateTime updatedAt { get; set; } = DateTime.UtcNow;

    [Column("geopoint")]
    public required Geopoint geopoint { get; set; }

	[Required]
    [Column("park")]
    public int parkId { get; set; }

    [Required]
    [Column("user")]
    public int userId { get; set; }

	[ForeignKey("userId")]
    public User? user { get; set; }

	[ForeignKey("parkId")]
    public Park? park { get; set; }

}