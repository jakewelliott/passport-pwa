namespace DigitalPassportBackend.Domain.DTO;

public record ParkPhotoDTO(
    string photoPath,
    string alt,
    int parkId)
{
    public static ParkPhotoDTO FromDomain(ParkPhoto photo)
    {
        return new ParkPhotoDTO(
            photo.photo,
            photo.alt,
            photo.parkId
        );
    }

    public ParkPhoto ToDomain(Park park)
    {
        return new()
        {
            photo = photoPath,
            alt = alt,
            parkId = parkId,
            park = park
        };
    }
}
