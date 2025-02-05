using System.ComponentModel.DataAnnotations.Schema;
using NetTopologySuite.Geometries;

namespace DigitalPassportBackend.Domain;

[Table("parks")]
public class Park
{
    public int id { get; init; }
    public required string park_abbreviation { get; set; }
    public required ParkType park_type { get; set; }
    public required string park_name { get; set; }
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
    public DateTime created_at { get; set; } = DateTime.UtcNow;
    public DateTime updated_at { get; set; } = DateTime.UtcNow;
}

public enum ParkType
{
  SL,
  SNA,
  SPA,
  SRA,
  ST
}