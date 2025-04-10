using Microsoft.AspNetCore.Mvc;
using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Domain.DTO;
using DigitalPassportBackend.Services;
using Microsoft.OpenApi.Extensions;
using Microsoft.AspNetCore.Authorization;
using DigitalPassportBackend.Errors;

namespace DigitalPassportBackend.Controllers;

[ApiController]
[Route("/api/locations")]
public class LocationsController(ILocationsService locationsService) : ControllerBase
{
    private readonly ILocationsService _locationsService = locationsService;

    [HttpGet("{locationAbbrev}")]
    public IActionResult Get(string locationAbbrev)
    {
        // Check if the input is a number
        Park location;
        if (int.TryParse(locationAbbrev, out int locationId))
        {
            // If it's a number, use GetById
            location = _locationsService.GetById(locationId);
        }
        else
        {
            // Otherwise use GetByAbbreviation
            location = _locationsService.GetByAbbreviation(locationAbbrev);
        }
        
        // Rest of the method remains the same
        var addresses = _locationsService.GetAddressesByLocationId(location.id);
        var icons = _locationsService.GetIconsByLocationId(location.id);
        var bucketListItems = _locationsService.GetBucketListItemsByLocationId(location.id);
        var parkPhotos = _locationsService.GetParkPhotosByLocationId(location.id);
        var locationDataResponse = ParkDTO.FromDomain(location, addresses, icons, bucketListItems, parkPhotos);
        // return 200 ok
        return Ok(locationDataResponse);
    }

    [HttpGet()]
    public IActionResult GetAll()
    {
        // invoking the use case
        List<ParkDTO> parks = new List<ParkDTO>();
        var locations = _locationsService.GetAll();
        foreach (var location in locations)
        {
            var addresses = _locationsService.GetAddressesByLocationId(location.id);
            var icons = _locationsService.GetIconsByLocationId(location.id);
            var bucketListItems = _locationsService.GetBucketListItemsByLocationId(location.id);
            var parkPhotos = _locationsService.GetParkPhotosByLocationId(location.id);
            var locationDataResponse = ParkDTO.FromDomain(location, addresses, icons, bucketListItems, parkPhotos);
            parks.Add(locationDataResponse);
        }
        // return 200 ok
        return Ok(parks);
    }

    [HttpGet("trails")]
    public IActionResult GetAllTrails()
    {
        return Ok(_locationsService.GetAllTrails()
            .Select(t => TrailResponse.FromDomain(t, _locationsService.GetTrailIcons(t.id))));
    }

    [HttpPost("uploadGeoJson")]
    [Authorize(Roles = "admin")]
    public IActionResult UploadGeoJson(IFormFile file)
    {
        if (file == null || file.ContentType != "application/json")
        {
            throw new ServiceException(StatusCodes.Status415UnsupportedMediaType, "You must upload a GeoJson file (ends in .json).");
        }
        return Ok(_locationsService.UploadGeoJson(file));
    }

    [HttpGet("geo")]
    public IActionResult GetGeoData()
    {
        List<LocationGeoDataResponse> locations = new List<LocationGeoDataResponse>();
        _locationsService.GetAll().ForEach(x => locations.Add(LocationGeoDataResponse.FromDomain(x)));
        return Ok(locations);
    }

    public record TrailResponse(
        int id,
        string trailName,
        string? distance,
        string description,
        List<TrailIconResponse> icons)
    {
        public static TrailResponse FromDomain(Trail trail, List<TrailIcon> icons)
        {
            return new(
                trail.id,
                trail.trailName,
                distance: trail.length,
                trail.description,
                icons.Select(i => new TrailIconResponse(
                    i.icon.GetDisplayName(),
                    i.tooltip
                )).ToList());
        }
    }

    public record TrailIconResponse(string iconName, string? tooltip);

    public record LocationGeoDataResponse(
        int id,
        string abbreviation,
        string parkName,
        object coordinates,
        string? boundaries
    )
    {
        public static LocationGeoDataResponse FromDomain(
            Park location
        )
        {
            var lonLatObject = new
            {
                longitude = location.coordinates == null ? 0 : location.coordinates.X,
                latitude = location.coordinates == null ? 0 : location.coordinates.Y
            };

            return new LocationGeoDataResponse(
                location.id,
                location.parkAbbreviation,
                location.parkName,
                lonLatObject,
                location.boundaries?.ToString()
            );
        }
    };
}
