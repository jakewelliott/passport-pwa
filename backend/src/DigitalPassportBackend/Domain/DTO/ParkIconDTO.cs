namespace DigitalPassportBackend.Domain.DTO;

public record ParkIconDTO(
    string iconName,
    string? tooltip)
{
    public static ParkIconDTO FromDomain(ParkIcon icon)
    {
        return new IconResponse(
            icon.icon.GetDisplayName().Replace("_", "-"), 
            icon.tooltip
        );
    }
}