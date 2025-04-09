namespace DigitalPassportBackend.Domain.DTO;

public record ParkDTO(
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

        var lonLatObject = new
        {
            longitude = location.coordinates == null ? 0 : location.coordinates.X,
            latitude = location.coordinates == null ? 0 : location.coordinates.Y
        };

        return new ParkDTO(
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
            string.IsNullOrEmpty(location.stampImage) ? "" : location.stampImage,
            string.IsNullOrEmpty(location.accesses) ? "" : location.accesses,
            [.. addressesArray],
            [.. iconsArray],
            [.. bucketListItemsArray],
            [.. photosArray]
        );
    }
};
