using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

using NetTopologySuite.Geometries;

namespace DigitalPassportBackend.Domain;

[ExcludeFromCodeCoverage]
[Table("parks")]
public class Park : IEntity
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
    [Column(TypeName="GEOMETRYCOLLECTION")]
    public GeometryCollection? boundaries { get; set; }
    [Column(TypeName="longtext")]
    public string? accesses { get; set; }
    public required string website { get; set; } = "https://www.ncparks.gov/state-parks";
    [Column("created_at")]
    public DateTime createdAt { get; set; } = DateTime.UtcNow;
    [Column("updated_at")]
    public DateTime updatedAt { get; set; } = DateTime.UtcNow;

    public override bool Equals(object? obj)
    {
        return obj is Park o
			&& o.GetHashCode() == GetHashCode();
    }

    public override int GetHashCode()
    {
		var hash = new HashCode();
		hash.Add(parkAbbreviation);
		hash.Add(parkType);
		hash.Add(parkName);
		hash.Add(city);
		hash.Add(coordinates);
		hash.Add(phone);
		hash.Add(email);
		hash.Add(stampImage);
		hash.Add(establishedYear);
		hash.Add(landmark);
		hash.Add(youCanFind);
		hash.Add(trails);
		hash.Add(accesses);
		hash.Add(website);
		return hash.ToHashCode();
    }
}

public enum ParkType
{
	SL,
	SNA,
	SPA,
	SRA,
	ST
}