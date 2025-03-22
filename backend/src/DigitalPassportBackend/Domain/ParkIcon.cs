using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace DigitalPassportBackend.Domain;

[ExcludeFromCodeCoverage]
[Table("park_icons")]
public class ParkIcon : IEntity
{
    public int id { get; init; }
    public required ParkIconNames icon { get; set; }
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

public enum ParkIconNames
{
    Biking_Red,
    BoatRamp_Blue,
    BoatRental_Blue,
    CamperCabins_Green,
    Camping_Black,
    Camping_Green,
    CanoeinCamping_Green,
    EquestrianCamping_Green,
    Exhibits_Blue,
    FBST_Blaze,
    FFST_Blaze,
    Fishing_Red,
    GroupCabins_Green,
    GroupCamp_Green,
    HGST_Blaze,
    Hiking_Red,
    HorsebackRiding_Red,
    MST_Blaze,
    Paddling_Red,
    PicnicShelter_Black,
    Picnicking_Red,
    Playground_Blue,
    PrimitiveCabin_Green,
    RVCamping_Green,
    RockClimbing_Red,
    Swimming_Red,
    VacationCabin_Green,
    VisitorCenter_Blue,
    YRST_Blaze
}