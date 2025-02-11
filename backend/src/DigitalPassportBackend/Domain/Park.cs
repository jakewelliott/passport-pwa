using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

using NetTopologySuite.Geometries;

namespace DigitalPassportBackend.Domain;

[ExcludeFromCodeCoverage]
[Table("parks")]
public class Park
{
    public int id { get; init; }
    [Column("park_abbreviation")]
    public required string parkAbbreviation { get; set; }
    [Column("park_type")]
    public required ParkType parkType { get; set; }
    [Column("park_name")]
    public required string parkName { get; set; }
    public string? city { get; set; }
    [Column(TypeName = "point")]
    public Point? coordinates { get; set; }
    public long? phone { get; set; }
    public string? email { get; set; }
    [Column("stamp_image", TypeName = "text")]
    public string? stampImage { get; set; }
    [Column("established_year")]
    public string? establishedYear { get; set; }
    [Column(TypeName="longtext")]
    public string? landmark { get; set; }
    [Column("you_can_find", TypeName="longtext")]
    public string? youCanFind { get; set; }
    [Column(TypeName="longtext")]
    public string? trails { get; set; }
    [Column(TypeName="polygon")]
    public Polygon? boundaries { get; set; }
    [Column(TypeName="longtext")]
    public string? accesses { get; set; }
    public required string website { get; set; } = "https://www.ncparks.gov/state-parks";
    [Column("created_at")]
    public DateTime createdAt { get; set; } = DateTime.UtcNow;
    [Column("updated_at")]
    public DateTime updatedAt { get; set; } = DateTime.UtcNow;
}

public enum ParkType
{
  SL,
  SNA,
  SPA,
  SRA,
  ST
}