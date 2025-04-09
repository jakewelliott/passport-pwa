namespace DigitalPassportBackend.Domain.DTO;

public record ParkPhotoDTO(
    string photoPath,
    string alt)
{
    public static ParkPhotoDTO FromDomain(ParkPhoto photo)
    {
        return new ParkPhotoDTO(
            photo.photo,
            photo.alt
        );
    }
}
