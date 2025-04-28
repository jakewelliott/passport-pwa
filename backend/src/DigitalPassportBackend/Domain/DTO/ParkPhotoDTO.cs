namespace DigitalPassportBackend.Domain.DTO;

using System.Diagnostics.CodeAnalysis;
[ExcludeFromCodeCoverage]
public record ParkPhotoDTO(
    int id,
    string photoPath,
    string alt,
    int parkId)
{
    public static ParkPhotoDTO FromDomain(ParkPhoto photo)
    {
        return new ParkPhotoDTO(
            photo.id,
            photo.photo,
            photo.alt,
            photo.parkId
        );
    }

    public ParkPhoto ToDomain(Park park)
    {
        return new()
        {
            id = id,
            photo = photoPath,
            alt = alt,
            parkId = parkId,
            park = park
        };
    }
}
