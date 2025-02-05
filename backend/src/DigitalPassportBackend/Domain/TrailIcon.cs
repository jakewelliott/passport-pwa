using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DigitalPassportBackend.Domain;

[Table("trail_icons")]
public class TrailIcon
{
    public int id { get; init; }
    public required TrailIconName icon { get; set; }
    [Column("created_at")]
    public DateTime createdAt { get; set; } = DateTime.UtcNow;
    [Column("updated_at")]
    public DateTime updatedAt { get; set; } = DateTime.UtcNow;

    // References
    [ForeignKey("trail")]
    [Column("trail")]
    public int trailId { get; set; }
    public required Trail trail { get; set; }
}

public enum TrailIconName
{
  [Display(Name = "4WDBeach")]
  FourWDBeach,
  Accessible,
  Amphiteater,
  BackpackCamping,
  Bathhouse,
  Biking,
  BoatRamp,
  Boating,
  CamperCabin,
  Camping,
  DumpStation,
  ElectricHookup,
  ElectricWaterHookups,
  EquestrianCamping,
  Firewood,
  Fishing,
  GroupCamp,
  Hiking,
  HorseTrailerParking,
  HorsebackRiding,
  Hospital,
  IE_Exhibits,
  Information,
  Marina,
  PaddleInCamping,
  Paddling,
  ParkGate,
  Picnic,
  PicnicShelter,
  PointofInterest,
  PrimitiveCabin,
  Restroom,
  RockClimbing,
  SewerHookup,
  Swimming,
  TRACKTrail,
  TentTrailerCamping,
  VacationCabin,
  ViewingSymbol,
  VisitorCenter,
  WaterHookup,
  WaterSpigot
}