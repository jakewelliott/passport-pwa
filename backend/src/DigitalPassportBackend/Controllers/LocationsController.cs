using Microsoft.AspNetCore.Mvc;
using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Services;
using Microsoft.OpenApi.Extensions;

namespace DigitalPassportBackend.Controllers;

[ApiController]
[Route("/api/locations")]
public class LocationsController(ILocationsService locationsService) : ControllerBase
{

    private readonly ILocationsService _locationsService = locationsService;

    [HttpGet("{locationAbbrev}")]
    public IActionResult Get(string locationAbbrev)
    {
        // invoking the use case
        var location = _locationsService.GetByAbbreviation(locationAbbrev);
        var addresses = _locationsService.GetAddressesByLocationId(location.id);
        var icons = _locationsService.GetIconsByLocationId(location.id);
        var bucketListItems = _locationsService.GetBucketListItemsByLocationId(location.id);
        var parkPhotos = _locationsService.GetParkPhotosByLocationId(location.id);
        var locationDataResponse = LocationResponse.FromDomain(location, addresses, icons, bucketListItems, parkPhotos);
        // return 200 ok
        return Ok(locationDataResponse);
    }

    public record AddressResponse(string title, string addressesLineOne, string? addressesLineTwo, string city, string state, int zipcode)
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

    public record BucketListItemResponse(string task)
    {
        public static BucketListItemResponse FromDomain(BucketListItem bucketListItem)
        {
            return new BucketListItemResponse(bucketListItem.task);
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
        PhotosResponse[] photos
    )
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
}