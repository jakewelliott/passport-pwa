using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace DigitalPassportBackend.Domain;

[ExcludeFromCodeCoverage]
[Table("favorite_parks")]
public class FavoriteParks : IEntity
{
    public int id { get; init; }
    [Column("created_at")]
    public DateTime createdAt { get; set; } = DateTime.UtcNow;
    [Column("updated_at")]
    public DateTime updatedAt { get; set; } = DateTime.UtcNow;

    // References
    [ForeignKey("park")]
    [Column("park")]
    public int? parkId { get; set; }
    public Park? park { get; set; }
    [ForeignKey("user")]
    [Column("user")]
    public int userId { get; set; }
    public required User user { get; set; }
}