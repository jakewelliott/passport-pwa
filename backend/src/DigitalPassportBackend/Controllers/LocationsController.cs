using Microsoft.AspNetCore.Mvc;
using DigitalPassportBackend.Domain;
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
        var locationDataResponse = LocationResponse.FromDomain(location, addresses, icons, bucketListItems, parkPhotos);
        // return 200 ok
        return Ok(locationDataResponse);
    }

    [HttpGet()]
    public IActionResult GetAll()
    {
        // invoking the use case
        List<LocationResponse> parks = new List<LocationResponse>();
        var locations = _locationsService.GetAll();
        foreach (var location in locations)
        {
            var addresses = _locationsService.GetAddressesByLocationId(location.id);
            var icons = _locationsService.GetIconsByLocationId(location.id);
            var bucketListItems = _locationsService.GetBucketListItemsByLocationId(location.id);
            var parkPhotos = _locationsService.GetParkPhotosByLocationId(location.id);
            var locationDataResponse = LocationResponse.FromDomain(location, addresses, icons, bucketListItems, parkPhotos);
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

    public record AddressResponse(string title, string addressLineOne, string? addressLineTwo, string city, string state, int zipcode)
    {
        public static AddressResponse FromDomain(ParkAddress address)
        {
            return new AddressResponse(
                address.title,
                address.addressLineOne,
                address.addressLineTwo,
                address.city,
                address.state.GetDisplayName(),
                address.zipcode
            );
        }
    }

    public record IconResponse(string iconName)
    {
        public static IconResponse FromDomain(ParkIcon icon)
        {
            return new IconResponse(icon.icon.GetDisplayName().Replace("_", "-"));
        }
    }

    public record BucketListItemResponse(int id,string task)
    {
        public static BucketListItemResponse FromDomain(BucketListItem bucketListItem)
        {
            return new BucketListItemResponse(bucketListItem.id, bucketListItem.task);
        }
    }

    public record PhotosResponse(string photoPath, string alt)
    {
        public static PhotosResponse FromDomain(ParkPhoto photo)
        {
            return new PhotosResponse(
                photo.photo,
                photo.alt
            );
        }
    }

    public record LocationResponse(
        int id,
        string abbreviation,
        string parkName,
        object coordinates,
        long? phone,
        string? email,
        string? establishedYear,
        string? landmark,
        string? youCanFind,
        string? trails,
        string website,
        AddressResponse[] addresses,
        IconResponse[] icons,
        BucketListItemResponse[] bucketListItems,
        PhotosResponse[] photos)
    {
        public static LocationResponse FromDomain(
            Park location,
            List<ParkAddress> locationAddresses,
            List<ParkIcon> locationIcons,
            List<BucketListItem> locationBucketListItems,
            List<ParkPhoto> locationPhotos
        )
        {
            var addressesArray = new List<AddressResponse>();
            foreach (ParkAddress addy in locationAddresses)
            {
                addressesArray.Add(AddressResponse.FromDomain(addy));
            }

            var iconsArray = new List<IconResponse>();
            foreach (ParkIcon newIcon in locationIcons)
            {
                iconsArray.Add(IconResponse.FromDomain(newIcon));
            }

            var bucketListItemsArray = new List<BucketListItemResponse>();
            foreach (BucketListItem newBLI in locationBucketListItems)
            {
                bucketListItemsArray.Add(BucketListItemResponse.FromDomain(newBLI));
            }

            var photosArray = new List<PhotosResponse>();
            foreach (ParkPhoto newPhoto in locationPhotos)
            {
                photosArray.Add(PhotosResponse.FromDomain(newPhoto));
            }

            var lonLatObject = new
            {
                longitude = location.coordinates == null ? 0 : location.coordinates.X,
                latitude = location.coordinates == null ? 0 : location.coordinates.Y
            };

            return new LocationResponse(
                location.id,
                location.parkAbbreviation,
                location.parkName,
                lonLatObject,
                location.phone,
                location.email,
                location.establishedYear,
                location.landmark,
                location.youCanFind,
                location.trails,
                location.website,
                addressesArray.ToArray(),
                iconsArray.ToArray(),
                bucketListItemsArray.ToArray(),
                photosArray.ToArray()
            );
        }

    };

    public record TrailResponse(
        int id,
        string trailName,
        string? distance,
        string description,
        List<string> icons)
    {
        public static TrailResponse FromDomain(Trail trail, List<TrailIcon> icons)
        {
            return new(
                trail.id,
                trail.trailName,
                distance: trail.length,
                trail.description,
                [.. icons.Select(i => i.icon.GetDisplayName())]);
        }
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
