using Microsoft.OpenApi.Extensions;

namespace DigitalPassportBackend.Domain.DTO;

public record ParkIconDTO(
    string iconName,
    string? tooltip)
{
    public static ParkIconDTO FromDomain(ParkIcon icon)
    {
        return new ParkIconDTO(
            icon.icon.GetDisplayName().Replace("_", "-"), 
            icon.tooltip
        );
    }

    public ParkIcon ToDomain(Park park)
    {
        return new()
        {
            icon = Enum.Parse<ParkIconNames>(iconName),
            tooltip = tooltip,
            park = park
        };
    }
}