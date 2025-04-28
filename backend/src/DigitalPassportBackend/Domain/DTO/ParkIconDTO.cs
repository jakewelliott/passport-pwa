using Microsoft.OpenApi.Extensions;

namespace DigitalPassportBackend.Domain.DTO;

using System.Diagnostics.CodeAnalysis;
[ExcludeFromCodeCoverage]
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
            icon = Enum.Parse<ParkIconNames>(iconName.Replace("-", "_")),
            tooltip = tooltip,
            parkId = parkId,
            park = park
        };
    }
}