using Microsoft.OpenApi.Extensions;

namespace DigitalPassportBackend.Domain.DTO;

public record TrailDTO(
    int id,
    string trailName,
    string? distance,
    string description,
    List<TrailIconDTO> icons)
{
    public static TrailDTO FromDomain(Trail trail, List<TrailIcon> icons)
    {
        return new(
            trail.id,
            trail.trailName,
            distance: trail.length,
            trail.description,
            [.. icons.Select(TrailIconDTO.FromDomain)]
            );
    }

    public Trail ToDomain(out List<TrailIcon> icons)
    {
        var trail = new Trail()
        {
            id = id,
            trailName = trailName,
            length = distance,
            description = description
        };

        icons = [.. this.icons
            .Select(i => TrailIconDTO.ToDomain(trail))];
        
        return trail;
    }
}
