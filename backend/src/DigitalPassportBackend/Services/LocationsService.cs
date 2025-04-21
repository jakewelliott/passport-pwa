using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Repository;

namespace DigitalPassportBackend.Services;

public class LocationsService : ILocationsService
{
    private readonly ILocationsRepository _locationsRepository;
    private readonly IParkAddressRepository _addressRepository;
    private readonly IBucketListItemRepository _bucketListItemRepository;
    private readonly IParkIconRepository _parkIconRepository;
    private readonly IParkPhotoRepository _parkPhotoRepository;
    private readonly ITrailRepository _trailRepository;
    private readonly ITrailIconRepository _trailIconRepository;

    public LocationsService(
        ILocationsRepository locationsRepository,
        IParkAddressRepository addressRepository,
        IBucketListItemRepository bucketListItemRepository,
        IParkIconRepository parkIconRepository,
        IParkPhotoRepository parkPhotoRepository,
        ITrailRepository trailRepository,
        ITrailIconRepository trailIconRepository)
    {
        _locationsRepository = locationsRepository;
        _addressRepository = addressRepository;
        _bucketListItemRepository = bucketListItemRepository;
        _parkIconRepository = parkIconRepository;
        _parkPhotoRepository = parkPhotoRepository;
        _trailRepository = trailRepository;
        _trailIconRepository = trailIconRepository;
    }

    // Parks
    public void CreatePark(
        Park park,
        List<ParkAddress> addrs,
        List<ParkIcon> icons,
        List<BucketListItem> blItems,
        List<ParkPhoto> photos)
    {
        try
        {
            _locationsRepository.GetByAbbreviation(park.parkAbbreviation);
            throw new ServiceException(409, $"Park with abbreviation '{park.parkAbbreviation}' already exists");
        }
        catch (NotFoundException)
        {
            _locationsRepository.Create(park);
            addrs.ForEach(a => _addressRepository.Create(a));
            icons.ForEach(i => _parkIconRepository.Create(i));
            blItems.ForEach(i => _bucketListItemRepository.Create(i));
            photos.ForEach(p => _parkPhotoRepository.Create(p));
        }
    }

    public List<Park> GetAll()
    {
        return _locationsRepository.GetAll();
    }

    public Park GetById(int id)
    {
        return _locationsRepository.GetById(id);
    }

    public Park GetByAbbreviation(string locationAbbrev)
    {
        return _locationsRepository.GetByAbbreviation(locationAbbrev);
    }

    public void UpdatePark(
        Park park,
        List<ParkAddress> addrs,
        List<ParkIcon> icons,
        List<BucketListItem> blItems,
        List<ParkPhoto> photos)
    {
        // Check if the park needs to be updated.
        if (!_locationsRepository.GetById(park.id).Equals(park))
        {
            // Verify that there isn't an abbreviation collision.
            try {
                var existing = _locationsRepository.GetByAbbreviation(park.parkAbbreviation);
                if (existing.id == park.id)
                {
                    // Migrate geo data.
                    park.boundaries = existing.boundaries;

                    // Migrate createdAt field.
                    park.createdAt = existing.createdAt;

                    // Update park.
                    _locationsRepository.Update(park);
                }
                else
                {
                    throw new ServiceException(409, $"Park with abbreviation '{park.parkAbbreviation}' already exists");
                }
            }
            catch (NotFoundException)
            {
                // Update park.
                _locationsRepository.Update(park);
            }
        }

        // Update or create park data.
        SetValues(_addressRepository.GetByLocationId(park.id), addrs, _addressRepository);
        SetValues(_parkIconRepository.GetByLocationId(park.id), icons, _parkIconRepository);
        SetValues(_bucketListItemRepository.GetByLocationId(park.id), blItems, _bucketListItemRepository);
        SetValues(_parkPhotoRepository.GetByLocationId(park.id), photos, _parkPhotoRepository);
    }

    public void DeletePark(int id)
    {
        // Park addresses.
        _addressRepository.GetByLocationId(id)
            .ForEach(a => _addressRepository.Delete(a.id));
        
        // Park icons.
        _parkIconRepository.GetByLocationId(id)
            .ForEach(i => _parkIconRepository.Delete(i.id));

        // Bucket list items.
        _bucketListItemRepository.GetByLocationId(id)
            .ForEach(i => _bucketListItemRepository.Delete(i.id));

        // Park photos.
        _parkPhotoRepository.GetByLocationId(id)
            .ForEach(i => _parkPhotoRepository.Delete(i.id));

        // Park.
        _locationsRepository.Delete(id);
    }

    // Park Addresses
    public List<ParkAddress> GetAddressesByLocationId(int id)
    {
        return _addressRepository.GetByLocationId(id);
    }

    // Park Icons
    public List<ParkIcon> GetIconsByLocationId(int id)
    {
        return _parkIconRepository.GetByLocationId(id);
    }

    // Park Photos
    public List<ParkPhoto> GetParkPhotosByLocationId(int id)
    {
        return _parkPhotoRepository.GetByLocationId(id);
    }

    // Trails
    public void CreateTrail(Trail trail, List<TrailIcon> icons)
    {
        if (_trailRepository.GetByName(trail.trailName) is null)
        {
            throw new ServiceException(409, $"Trail with name '{trail.trailName}' already exists");
        }

        _trailRepository.Create(trail);
        icons.ForEach(i => _trailIconRepository.Create(i));
    }

    public List<Trail> GetAllTrails()
    {
        return _trailRepository.GetAll();
    }

    public void UpdateTrail(Trail trail, List<TrailIcon> icons)
    {
        var t = _trailRepository.GetByName(trail.trailName);
        if (t is not null && t.id != trail.id)
        {
            throw new ServiceException(409, $"Trail with name '{trail.trailName}' already exists");
        }

        _trailRepository.Update(trail);
        // ADAM: this is making updating a trail error
        SetValues(_trailIconRepository.GetByTrailId(trail.id), icons, _trailIconRepository);
    }

    public void DeleteTrail(int id)
    {
        _trailIconRepository.GetByTrailId(id).ForEach(i => _trailIconRepository.Delete(i.id));
        _trailRepository.Delete(id);
    }

    // Trail Icons
    public List<TrailIcon> GetTrailIcons(int trailId)
    {
        return _trailIconRepository.GetByTrailId(trailId);
    }

    // Bucket List
    public List<BucketListItem> GetBucketListItemsByLocationId(int id)
    {
        return _bucketListItemRepository.GetByLocationId(id);
    }

    // General
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
            if (feature.Attributes.GetOptionalValue("SubUnit") != null && feature.Attributes.GetOptionalValue("SubUnit").ToString() == "Rendezvous Mountain") feature.Attributes["PKABBR"] = "REMO";
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

    // Helpers
    private static void SetValues<T>(List<T> currentVals, List<T> newVals, IRepository<T> repo) where T : IEntity
    {
        // Delete difference.
        currentVals.Except(newVals)
            .ToList()
            .ForEach(v => repo.Delete(v.id));
        
        // Create or update new values.
        foreach (var val in newVals)
        {
            try
            {
                var existing = repo.GetById(val.id);
                if (!existing.Equals(val))
                {
                    // Migrate createdAt field.
                    val.createdAt = existing.createdAt;

                    // Save changes.
                    repo.Update(val);
                }
            }
            catch (NotFoundException)
            {
                repo.Create(val);
            }
        }
    }
}

class ParkGeometry(string ParkAbbreviation)
{
    public string abb = ParkAbbreviation;
    public List<NetTopologySuite.Geometries.Geometry> geometries = new List<NetTopologySuite.Geometries.Geometry>();
}