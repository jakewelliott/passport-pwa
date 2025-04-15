using Microsoft.OpenApi.Extensions;

namespace DigitalPassportBackend.Domain.DTO;

public record ParkIconDTO(
    int id,
    string iconName,
    string? tooltip,
    int parkId)
{
    public static ParkIconDTO FromDomain(ParkIcon icon)
    {
        return new ParkIconDTO(
            icon.id,
            // TODO: do we need to do this or can we just store the name with hyphens?
            icon.icon.GetDisplayName().Replace("_", "-"), 
            icon.tooltip,
            icon.parkId
        );
    }

    public ParkIcon ToDomain(Park park)
    {
        return new()
        {
            id = id,
            // TODO: do we need to do this or can we just store the name with hyphens?
            icon = Enum.Parse<ParkIconNames>(iconName.Replace("-", "_")),
            tooltip = tooltip,
            parkId = parkId,
            park = park
        };
    }
}