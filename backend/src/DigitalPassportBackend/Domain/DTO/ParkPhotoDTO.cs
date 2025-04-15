namespace DigitalPassportBackend.Domain.DTO;

public record ParkPhotoDTO(
    int id,
    string photoPath,
    string alt,
    int parkId)
{
    public static ParkPhotoDTO FromDomain(ParkPhoto photo)
    {
        return new ParkPhotoDTO(
            id: photo.id,
            photoPath: photo.photo,
            alt: photo.alt,
            parkId: photo.parkId
        );
    }

    public ParkPhoto ToDomain(Park park)
    {
        return new ParkPhoto()
        {
            id = id,
            photo = photoPath,
            alt = alt,
            parkId = parkId,
            park = park
        };
    }
}
