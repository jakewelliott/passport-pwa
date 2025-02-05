using System.ComponentModel.DataAnnotations.Schema;

namespace DigitalPassportBackend.Domain;

[Table("park_photos")]
public class ParkPhoto
{
    public int id { get; init; }
    public required string photo { get; set; }
    public required string alt { get; set; }
    [Column("created_at")]
    public DateTime createdAt { get; set; } = DateTime.UtcNow;
    [Column("updated_at")]
    public DateTime updatedAt { get; set; } = DateTime.UtcNow;

    // References
    [ForeignKey("park")]
    [Column("park")]
    public int parkId { get; set; }
    public required Park park { get; set; }
}