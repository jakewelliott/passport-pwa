using Microsoft.OpenApi.Extensions;

namespace DigitalPassportBackend.Domain.DTO;

public record TrailIconDTO(
    int id,
    string iconName,
    string? tooltip)
{
    public static TrailIconDTO FromDomain(TrailIcon icon)
    {
        return new(
            icon.id,
            icon.icon.GetDisplayName(),
            icon.tooltip
        );
    }

    public TrailIcon ToDomain(Trail trail)
    {
        return new()
        {
            id = id,
            icon = Enum.Parse<TrailIconName>(iconName),
            tooltip = tooltip,
            trailId = trail.id,
            trail = trail
        };
    }
}