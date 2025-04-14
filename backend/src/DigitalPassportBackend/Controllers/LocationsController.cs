using Microsoft.AspNetCore.Mvc;
using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Domain.DTO;
using DigitalPassportBackend.Services;
using Microsoft.AspNetCore.Authorization;
using DigitalPassportBackend.Errors;

namespace DigitalPassportBackend.Controllers;

[ApiController]
[Route("/api/locations")]
public class LocationsController(ILocationsService locationsService) : ControllerBase
{
    private readonly ILocationsService _locationsService = locationsService;

    // Parks
    [HttpPost("locations")]
    [Authorize(Roles = "admin")]
    public IActionResult CreatePark([FromBody] ParkDTO park)
    {
        var p = park.ToDomain(0, out var addrs, out var icons, out var blItems, out var photos);
        _locationsService.CreatePark(p, addrs, icons, blItems, photos);
        return Ok();
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

    [HttpGet("geo")]
    public IActionResult GetGeoData()
    {
        List<LocationGeoDataResponse> locations = new List<LocationGeoDataResponse>();
        _locationsService.GetAll().ForEach(x => locations.Add(LocationGeoDataResponse.FromDomain(x)));
        return Ok(locations);
    }

    [HttpPut("locations/{parkId}")]
    [Authorize(Roles = "admin")]
    public IActionResult UpdatePark(int parkId, [FromBody] ParkDTO park)
    {
        var p = park.ToDomain(parkId, out var addrs, out var icons, out var blItems, out var photos);
        _locationsService.UpdatePark(p, addrs, icons, blItems, photos);
        return Ok();
    }

    [HttpDelete("locations/{parkId}")]
    [Authorize(Roles = "admin")]
    public IActionResult DeletePark(int parkId)
    {
        _locationsService.DeletePark(parkId);
        return Ok();
    }

    // Trails
    [HttpPost("locations/trails")]
    public IActionResult CreateTrail([FromBody] TrailDTO trail)
    {
        var t = trail.ToDomain(out var icons);
        _locationsService.CreateTrail(t, icons);
        return Ok();
    }

    [HttpGet("trails")]
    public IActionResult GetAllTrails()
    {
        return Ok(_locationsService.GetAllTrails()
            .Select(t => TrailDTO.FromDomain(t, _locationsService.GetTrailIcons(t.id))));
    }

    [HttpPut("locations/trails")]
    public IActionResult UpdateTrail([FromBody] TrailDTO trail)
    {
        var t = trail.ToDomain(out var icons);
        _locationsService.UpdateTrail(t, icons);
        return Ok();
    }

    [HttpDelete("locations/trails/{trailId}")]
    public IActionResult DeleteTrail(int trailId)
    {
        _locationsService.DeleteTrail(trailId);
        return Ok();
    }

    // General
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
