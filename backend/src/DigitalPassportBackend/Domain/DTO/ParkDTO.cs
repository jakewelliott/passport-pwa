using Microsoft.OpenApi.Extensions;

using NetTopologySuite.Geometries;

using static DigitalPassportBackend.Domain.DTO.ParkDTO;

namespace DigitalPassportBackend.Domain.DTO;

using System.Diagnostics.CodeAnalysis;
[ExcludeFromCodeCoverage]
public record ParkDTO(
    int id,
    string abbreviation,
    string parkName,
    string? city,
    string parkType,
    CoordinateDTO coordinates,
    long? phone,
    string? email,
    string? establishedYear,
    string? landmark,
    string? youCanFind,
    string? trails,
    string website,
    string stampImage,
    string accesses,
    ParkAddressDTO[] addresses,
    ParkIconDTO[] icons,
    BucketListItemDTO[] bucketListItems,
    ParkPhotoDTO[] photos)
{
    public static ParkDTO FromDomain(
        Park location,
        List<ParkAddress> locationAddresses,
        List<ParkIcon> locationIcons,
        List<BucketListItem> locationBucketListItems,
        List<ParkPhoto> locationPhotos
    )
    {
        var addressesArray = new List<ParkAddressDTO>();
        foreach (ParkAddress addy in locationAddresses)
        {
            addressesArray.Add(ParkAddressDTO.FromDomain(addy));
        }

        var iconsArray = new List<ParkIconDTO>();
        foreach (ParkIcon newIcon in locationIcons)
        {
            iconsArray.Add(ParkIconDTO.FromDomain(newIcon));
        }

        var bucketListItemsArray = new List<BucketListItemDTO>();
        foreach (BucketListItem newBLI in locationBucketListItems)
        {
            bucketListItemsArray.Add(BucketListItemDTO.FromDomain(newBLI));
        }

        var photosArray = new List<ParkPhotoDTO>();
        foreach (ParkPhoto newPhoto in locationPhotos)
        {
            photosArray.Add(ParkPhotoDTO.FromDomain(newPhoto));
        }

        return new ParkDTO(
            location.id,
            location.parkAbbreviation,
            location.parkName,
            location.city,
            location.parkType.GetDisplayName(),
            CoordinateDTO.FromDomain(location.coordinates),
            location.phone,
            location.email,
            location.establishedYear,
            location.landmark,
            location.youCanFind,
            location.trails,
            location.website,
            string.IsNullOrEmpty(location.stampImage) ? "" : location.stampImage,
            string.IsNullOrEmpty(location.accesses) ? "" : location.accesses,
            [.. addressesArray],
            [.. iconsArray],
            [.. bucketListItemsArray],
            [.. photosArray]
        );
    }

    public Park ToDomain(int parkId,
        out List<ParkAddress> addrs,
        out List<ParkIcon> icons,
        out List<BucketListItem> blItems,
        out List<ParkPhoto> photos)
    {
        var p = new Park()
        {
            id = parkId,
            parkAbbreviation = abbreviation,
            parkName = parkName,
            city = city,
            parkType = Enum.Parse<ParkType>(parkType),
            coordinates = coordinates.ToDomain(),
            phone = phone,
            email = email,
            establishedYear = establishedYear,
            landmark = landmark,
            youCanFind = youCanFind,
            trails = trails,
            website = website,
            stampImage = stampImage,
            accesses = accesses
        };

        addrs = [];
        icons = [];
        blItems = [];
        photos = [];

        foreach (var addr in addresses)
        {
            addrs.Add(addr.ToDomain(p));
        }

        foreach (var icon in this.icons)
        {
            icons.Add(icon.ToDomain(p));
        }

        foreach (var blItem in bucketListItems)
        {
            blItems.Add(blItem.ToDomain(p));
        }

        foreach (var photo in this.photos)
        {
            photos.Add(photo.ToDomain(p));
        }

        return p;
    }

    public record CoordinateDTO(
        double longitude,
        double latitude)
    {
        public static CoordinateDTO FromDomain(Point? coordinates)
        {
            return new(
                coordinates is null ? 0 : coordinates.X,
                coordinates is null ? 0 : coordinates.Y);
        }

        public Point? ToDomain()
        {
            if (longitude == 0 && latitude == 0)
            {
                return null;
            }

            return new(longitude, latitude);
        }
    }
};
