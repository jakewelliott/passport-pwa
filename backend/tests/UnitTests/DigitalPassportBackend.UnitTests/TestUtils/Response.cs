using System.Diagnostics.CodeAnalysis;

using DigitalPassportBackend.Domain;

using Microsoft.OpenApi.Extensions;

using NetTopologySuite.Geometries;

using static DigitalPassportBackend.Controllers.ActivityController;

using static DigitalPassportBackend.Controllers.LocationsController;

namespace DigitalPassportBackend.UnitTests.TestUtils;
[ExcludeFromCodeCoverage]
public static class Response
{

    public static bool Equal(Park? park, PrivateNoteRequest expected, PrivateNoteResponse actual)
    {
        if (park == null)
        {
            return actual.parkAbbreviation == "generalNotes"
                && expected.note == actual.note
                && expected.updatedAt == actual.updatedAt;
        }
        else
        {
            return park.parkAbbreviation == actual.parkAbbreviation
                && expected.note == actual.note
                && expected.updatedAt == actual.updatedAt;
        }
    }

    public static bool Equal(PrivateNote expected, PrivateNoteResponse actual)
    {
        if (expected.park == null)
        {
            return actual.parkAbbreviation == "generalNotes"
                && expected.note == actual.note
                && expected.updatedAt == actual.updatedAt;
        }
        else
        {
            return expected.park.parkAbbreviation == actual.parkAbbreviation
                && expected.note == actual.note
                && expected.updatedAt == actual.updatedAt;
        }
    }

    public static bool Equal(Park park, LocationResponse resp)
    {
        return park.id == resp.id
            && park.parkName == resp.parkName
            && Equal(park.coordinates, resp.coordinates)
            && park.phone == resp.phone
            && park.email == resp.email
            && park.establishedYear == resp.establishedYear
            && park.landmark == resp.landmark
            && park.youCanFind == resp.youCanFind
            && park.trails == resp.trails
            && Equal(TestData.ParkAddresses.Where(i => i.parkId == park.id), resp.addresses)
            && Equal(TestData.ParkIcons.Where(i => i.parkId == park.id), resp.icons)
            && Equal(TestData.BucketList.Where(i => i.parkId == park.id), resp.bucketListItems)
            && Equal(TestData.ParkPhotos.Where(i => i.parkId == park.id), resp.photos);
    }

    public static bool Equal(IEnumerable<ParkAddress> addrs, AddressResponse[] resp)
    {
        addrs = [.. addrs.OrderBy(i => i.title)];
        resp = [.. resp.OrderBy(i => i.title)];
        return addrs.Count() == resp.Length
            && FieldEqual(addrs, a => a.title, resp, r => r.title)
            && FieldEqual(addrs, a => a.addressLineOne, resp, r => r.addressLineOne)
            && FieldEqual(addrs, a => a.addressLineTwo, resp, r => r.addressLineTwo)
            && FieldEqual(addrs, a => a.city, resp, r => r.city)
            && FieldEqual(addrs, a => a.state.GetDisplayName(), resp, r => r.state)
            && FieldEqual(addrs, a => a.zipcode.ToString(), resp, r => r.zipcode.ToString());
    }

    public static bool Equal(IEnumerable<ParkIcon> icons, IconResponse[] resp)
    {
        icons = [.. icons.OrderBy(i => i.icon.GetDisplayName())];
        resp = [.. resp.OrderBy(i => i.iconName)];
        return icons.Count() == resp.Length
            && FieldEqual(icons, i => i.icon.GetDisplayName().Replace("_", "-"), resp, r => r.iconName);
    }

    public static bool Equal(IEnumerable<BucketListItem> bucketList, DigitalPassportBackend.Controllers.LocationsController.BucketListItemResponse[] resp)
    {
        bucketList = [.. bucketList.OrderBy(i => i.task)];
        resp = [.. resp.OrderBy(i => i.task)];
        return bucketList.Count() == resp.Length
            && FieldEqual(bucketList, i => i.task, resp, r => r.task);
    }

    public static bool Equal(IEnumerable<ParkPhoto> photos, PhotosResponse[] resp)
    {
        photos = [.. photos.OrderBy(i => i.photo)];
        resp = [.. resp.OrderBy(i => i.photoPath)];
        return photos.Count() == resp.Length
            && FieldEqual(photos, p => p.photo, resp, r => r.photoPath)
            && FieldEqual(photos, p => p.alt, resp, r => r.alt);
    }

    public static bool Equal(Point? coord, object obj)
    {
        try
        {
            return coord?.X == (double)obj.GetType().GetProperty("longitude")?.GetValue(obj, null)!
                && coord?.Y == (double)obj.GetType().GetProperty("latitude")?.GetValue(obj, null)!;
        }
        catch
        {
            return false;
        }
    }

    public static bool Equal(string abbr, CollectStampRequest expected, CollectStampResponse actual)
    {
        return abbr == actual.parkAbbreviation
            && expected.method == actual.method
            && expected.dateTime == actual.createdAt;
    }

    public static bool Equal(CollectedStamp expected, CollectedStampResponse actual)
    {
        return expected.createdAt == actual.createdAt
            && expected.method.GetDisplayName() == actual.method
            && expected.park.parkAbbreviation == actual.parkAbbreviation;
    }

    public static bool Equal(Park expected, LocationGeoDataResponse actual)
    {
        return expected.id == actual.id
            && expected.parkAbbreviation == actual.abbreviation
            && expected.parkName == actual.parkName
            && Equal(expected.coordinates, actual.coordinates)
            && expected.boundaries?.ToString() == actual.boundaries;
    }

    private static bool FieldEqual<T, U>(IEnumerable<T> a, Func<T, string?> funcA, IEnumerable<U> b, Func<U, string?> funcB)
    {
        return a.Select(funcA).SequenceEqual(b.Select(funcB));
    }
}