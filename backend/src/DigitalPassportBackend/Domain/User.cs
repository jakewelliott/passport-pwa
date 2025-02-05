using System.ComponentModel.DataAnnotations.Schema;

namespace DigitalPassportBackend.Domain;

[Table("users")]
public class User
{
    public int id { get; init; }
    public required string username { get; set; }
    public required string password { get; set; }
    public required UserRole role { get; set; }
    [Column("created_at")]
    public DateTime createdAt { get; set; } = DateTime.UtcNow;
    [Column("updated_at")]
    public DateTime updatedAt { get; set; } = DateTime.UtcNow;
}

public enum UserRole
{
  visitor,
  admin
}