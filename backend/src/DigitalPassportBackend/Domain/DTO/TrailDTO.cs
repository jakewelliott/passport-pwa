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
        var trailIcons = new List<TrailIconDTO>();
        foreach (var icon in icons)
        {
            trailIcons.Add(TrailIconDTO.FromDomain(icon));
        }

        return new(
            id: trail.id,
            trailName: trail.trailName,
            distance: trail.length,
            description: trail.description,
            icons: trailIcons
        );
    }

    public Trail ToDomain(out List<TrailIcon> icons)
    {
        var trail = new Trail()
        {
            id = id,
            trailName = trailName,
            length = distance,
            description = description,
            Icons = new List<TrailIcon>()
        };

        icons = [];
        foreach (var icon in this.icons)
        {
            icons.Add(icon.ToDomain(trail));
        }

        // ADAM: gotta do this bc TrailIconDTO relies on Trail
        trail.Icons = icons;

        return trail;
    }
}
