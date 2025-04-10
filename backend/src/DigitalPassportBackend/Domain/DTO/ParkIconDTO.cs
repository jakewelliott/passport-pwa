using Microsoft.OpenApi.Extensions;

namespace DigitalPassportBackend.Domain.DTO;

public record ParkIconDTO(
    string iconName,
    string? tooltip,
    int parkId)
{
    public static ParkIconDTO FromDomain(ParkIcon icon)
    {
        return new ParkIconDTO(
            icon.icon.GetDisplayName().Replace("_", "-"), 
            icon.tooltip,
            icon.parkId
        );
    }

    public ParkIcon ToDomain(Park park)
    {
        return new()
        {
            icon = Enum.Parse<ParkIconNames>(iconName),
            tooltip = tooltip,
            parkId = parkId,
            park = park
        };
    }
}