using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace DigitalPassportBackend.Domain;

[ExcludeFromCodeCoverage]
[Table("park_addresses")]
public class ParkAddress : IEntity
{
    public int id { get; init; }
    // public required int park { get; set; }
    public required string title { get; set; }
    [Column("address_line_one")]
    public required string addressLineOne { get; set; }
    [Column("address_line_two")]
    public string? addressLineTwo { get; set; }
    public required string city { get; set; }
    public required State state { get; set; }
    public required int zipcode { get; set; }
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

public enum State
{
    NC
}