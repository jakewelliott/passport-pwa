using System.Text.Json;
using System.Text.Json.Serialization;

using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Repository;

using NetTopologySuite.IO;

using Newtonsoft.Json;

namespace DigitalPassportBackend.Services;

public class LocationsService : ILocationsService
{
    private readonly ILocationsRepository _locationsRepository;
    private readonly IParkAddressRepository _addressRepository;
    private readonly IBucketListItemRepository _bucketListItemRepository;
    private readonly IParkIconRepository _parkIconRepository;
    private readonly IParkPhotoRepository _parkPhotoRepository;

    public LocationsService(
        ILocationsRepository locationsRepository,
        IParkAddressRepository addressRepository,
        IBucketListItemRepository bucketListItemRepository,
        IParkIconRepository parkIconRepository,
        IParkPhotoRepository parkPhotoRepository)
    {
        _locationsRepository = locationsRepository;
        _addressRepository = addressRepository;
        _bucketListItemRepository = bucketListItemRepository;
        _parkIconRepository = parkIconRepository;
        _parkPhotoRepository = parkPhotoRepository;
    }

    public List<ParkAddress> GetAddressesByLocationId(int id)
    {
        return _addressRepository.GetByLocationId(id);
    }

    public List<Park> GetAll()
    {
        return _locationsRepository.GetAll();
    }

    public List<BucketListItem> GetBucketListItemsByLocationId(int id)
    {
        return _bucketListItemRepository.GetByLocationId(id);
    }

    public Park GetByAbbreviation(string locationAbbrev)
    {
        return _locationsRepository.GetByAbbreviation(locationAbbrev);
    }

    public List<ParkIcon> GetIconsByLocationId(int id)
    {
        return _parkIconRepository.GetByLocationId(id);
    }

    public List<ParkPhoto> GetParkPhotosByLocationId(int id)
    {
        return _parkPhotoRepository.GetByLocationId(id);
    }

    public string UploadGeoJson(IFormFile file)
    {
        // Read the file
        using var reader = new StreamReader(file.OpenReadStream());
        string json = reader.ReadToEnd();
        // Convert the GeoJson data into an object that we can use
        var geoJsonReader = new NetTopologySuite.IO.GeoJsonReader();
        var featureCollection = geoJsonReader.Read<NetTopologySuite.Features.FeatureCollection>(json);
        var processedFeatures = new List<NetTopologySuite.Features.IFeature>();
        var unmatchedFeatures = new List<NetTopologySuite.Features.IFeature>();
        foreach (var feature in featureCollection)
        {
            var attributesAvailable = feature.Attributes.GetNames();
            if (!attributesAvailable.Contains("PKABBR") || !attributesAvailable.Contains("id") || feature.Geometry == null)
            {
                throw new ServiceException(
                    StatusCodes.Status415UnsupportedMediaType,
                    "The file does not contain the required fields. For each feature, you must include the feature id, park abbreviation, and valid geometry."
                );
            }
            processedFeatures.Add(feature);
        }
        // Get the parks that are in the database
        var parks = _locationsRepository.GetAll();
        // create a list of the parks that we can modify
        var geometriesToAdd = new List<ParkGeometry>();
        parks.ForEach(x => geometriesToAdd.Add(new ParkGeometry(x.parkAbbreviation)));
        // add the data from GeoJson file to corresponding park in modifiable list
        foreach (var feature in processedFeatures)
        {
            var park = geometriesToAdd.Find(x => x.abb == feature.Attributes.GetOptionalValue("PKABBR").ToString());
            if (park != null)
            {
                park.geometries.Add(feature.Geometry);
            }
            else
            {
                unmatchedFeatures.Add(feature);
            }
        }
        // add the location information to the actual park
        foreach (var park in geometriesToAdd)
        {
            var parkEntity = parks.Find(x => x.parkAbbreviation == park.abb);
            if (parkEntity != null)
            {
                parkEntity.boundaries = new NetTopologySuite.Geometries.GeometryCollection(park.geometries.ToArray());
            }
        }
        // update all parks with new locations
        parks.ForEach(park => _locationsRepository.Update(park));
        // return the features that did not match
        var returnString = "Successfully imported data from the GeoJSON file.";
        returnString += unmatchedFeatures.Count() > 0 ? " There was an issue with feature" + (unmatchedFeatures.Count() > 1 ? "s " : " ") : "";
        unmatchedFeatures.ForEach(x => returnString += x.Attributes.GetOptionalValue("id") + ", ");
        returnString = returnString.Remove(unmatchedFeatures.Count() > 0 ? returnString.Length - 2 : returnString.Length);
        returnString += unmatchedFeatures.Count() > 0 ? ". No park in the database was found with the specified park abbreviation." : "";
        return returnString;
    }

    public Park GetById(int id)
    {
        var park = _locationsRepository.GetById(id);
        if (park == null)
        {
            throw new ServiceException(StatusCodes.Status404NotFound, $"Park with ID {id} not found");
        }
        return park;
    }

}

class ParkGeometry(string ParkAbbreviation)
{
    public string abb = ParkAbbreviation;
    public List<NetTopologySuite.Geometries.Geometry> geometries = new List<NetTopologySuite.Geometries.Geometry>();
}