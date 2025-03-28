using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.Services;
using DigitalPassportBackend.UnitTests.TestUtils;
using DigitalPassportBackend.Domain;

using Moq;
using Microsoft.AspNetCore.Http;

namespace DigitalPassportBackend.UnitTests.Services;
public class LocationsServiceTests
{
    private readonly Mock<IBucketListItemRepository> _mockBucketList;
    private readonly Mock<ILocationsRepository> _mockLocations;
    private readonly Mock<IParkAddressRepository> _mockParkAddresses;
    private readonly Mock<IParkIconRepository> _mockParkIcons;
    private readonly Mock<IParkPhotoRepository> _mockParkPhotos;
    private readonly Mock<ITrailRepository> _mockTrails;
    private readonly Mock<ITrailIconRepository> _mockTrailIcons;
    
    private readonly ILocationsService _locations;

    public LocationsServiceTests()
    {
        // Initialize mocked repositories.
        _mockBucketList = new();
        _mockLocations = new();
        _mockParkAddresses = new();
        _mockParkIcons = new();
        _mockParkPhotos = new();
        _mockTrails = new();
        _mockTrailIcons = new();

        // Add location data to mocked repositories.
        SetupInvalidLocation();
        SetupLocation0();
        SetupLocation1();
        SetupAllLocations();

        // Setup mock for UploadGeoJson update.
        _mockLocations.Setup(s => s.Update(It.IsAny<Park>()))
            .Returns<Park>(p => p);

        // Initialize LocationsService.
        _locations = new LocationsService(
            _mockLocations.Object,
            _mockParkAddresses.Object,
            _mockBucketList.Object,
            _mockParkIcons.Object,
            _mockParkPhotos.Object,
            _mockTrails.Object,
            _mockTrailIcons.Object);
    }

    [Fact]
    public void GetAddressesByLocationId_ReturnsAddressList_WhenLocationExists()
    {
        // Action.
        var items = _locations.GetAddressesByLocationId(TestData.Parks[0].id);

        // Assert.
        Assert.Single(items);
        Assert.Contains(TestData.ParkAddresses[1], items);
    }

    [Fact]
    public void GetAddressesByLocationId_ReturnsEmptyList_WhenLocationDNE()
    {
        // Action.
        var items = _locations.GetAddressesByLocationId(5);

        // Assert.
        Assert.Empty(items);
    }

    [Fact]
    public void GetBucketListItemsByLocationId_ReturnsBucketListItemList_WhenLocationExists()
    {
        // Action.
        var items = _locations.GetBucketListItemsByLocationId(TestData.Parks[0].id);

        // Assert.
        Assert.Equal(2, items.Count);
        Assert.Contains(TestData.BucketList[0], items);
        Assert.Contains(TestData.BucketList[2], items);
    }

    [Fact]
    public void GetBucketListItemsByLocationId_ReturnsEmptyList_WhenLocationExists_AndNoBucketListItems()
    {
        // Action.
        var items = _locations.GetBucketListItemsByLocationId(TestData.Parks[1].id);

        // Assert.
        Assert.Empty(items);
    }

    [Fact]
    public void GetBucketListItemsByLocationId_ReturnsEmptyList_WhenLocationDNE()
    {
        // Action.
        var items = _locations.GetBucketListItemsByLocationId(5);

        // Assert.
        Assert.Empty(items);
    }
    
    [Fact]
    public void GetByAbbreviation_ReturnsPark_WhenLocationExists()
    {
        // Action.
        var location = _locations.GetByAbbreviation(TestData.Parks[0].parkAbbreviation);

        // Assert.
        Assert.Equal(location, TestData.Parks[0]);
    }

    [Fact]
    public void GetByAbbreviation_ThrowsNotFoundException_WhenLocationDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _locations.GetByAbbreviation("DMV"));
    }

    [Fact]
    public void GetIconsByLocationId_ReturnsIconList_WhenLocationExists()
    {
        // Action.
        var items = _locations.GetIconsByLocationId(TestData.Parks[0].id);

        // Assert.
        Assert.Equal(2, items.Count);
        Assert.Contains(TestData.ParkIcons[0], items);
        Assert.Contains(TestData.ParkIcons[1], items);
    }

    [Fact]
    public void GetIconsByLocationId_ReturnsEmptyList_WhenLocationExists_AndNoIcons()
    {
        // Action.
        var items = _locations.GetIconsByLocationId(TestData.Parks[1].id);

        // Assert.
        Assert.Empty(items);
    }

    [Fact]
    public void GetIconsByLocationId_ReturnsEmptyList_WhenLocationDNE()
    {
        // Action.
        var items = _locations.GetIconsByLocationId(5);

        // Assert.
        Assert.Empty(items);
    }

    [Fact]
    public void GetParkPhotosByLocationId_ReturnsParkPhotoList_WhenLocationExists()
    {
        // Action.
        var items = _locations.GetParkPhotosByLocationId(TestData.Parks[1].id);

        // Assert.
        Assert.Equal(2, items.Count);
        Assert.Contains(TestData.ParkPhotos[0], items);
        Assert.Contains(TestData.ParkPhotos[1], items);
    }

    [Fact]
    public void GetParkPhotosByLocationId_ReturnsEmptyList_WhenLocationExists_AndNoParkPhotos()
    {
        // Action.
        var items = _locations.GetParkPhotosByLocationId(TestData.Parks[0].id);

        // Assert.
        Assert.Empty(items);
    }

    [Fact]
    public void GetParkPhotosByLocationId_EmptyList_WhenLocationDNE()
    {
        // Action.
        var items = _locations.GetParkPhotosByLocationId(5);

        // Assert.
        Assert.Empty(items);
    }

    [Fact]
    public void GetAll_ParkList_WhenLocationsExist()
    {
        // Action
        var items = _locations.GetAll();

        // Assert
        var counter = 0;
        foreach(var park in TestData.Parks) {
            Assert.Equal(park, items[counter]);
            counter++;
        }
    }

    [Fact]
    public void GetAll_EmptyList_WhenLocationsDNE()
    {
        // Arrange
        _mockLocations.Setup(s => s.GetAll())
            .Returns(new List<Park>());

        // Action
        var items = _locations.GetAll();

        // Assert
        Assert.Empty(items);
    }

    [Fact]
    public void UploadGeoJson_UpdatesParks_WhenValidFile()
    {
        // Action.
        var str = _locations.UploadGeoJson(TestFileHelper.Open("test_parks.json"));

        // Assert.
        Assert.Equal("Successfully imported data from the GeoJSON file.", str);
    }

    [Fact]
    public void UploadGeoJson_UpdatesFoundParks_WhenExtraParks()
    {
        // Action.
        var str = _locations.UploadGeoJson(TestFileHelper.Open("test_parks_extra.json"));

        // Assert.
        Assert.Equal("Successfully imported data from the GeoJSON file. There was an issue with feature 3. No park in the database was found with the specified park abbreviation.", str);
    }

    [Fact]
    public void UploadGeoJson_ThrowsException_WhenMissingRequiredField()
    {
        // Action and assert.
        var e = Assert.Throws<ServiceException>(() => _locations.UploadGeoJson(TestFileHelper.Open("test_parks_invalid.json")));
        Assert.Equal(StatusCodes.Status415UnsupportedMediaType, e.StatusCode);
    }

    private void SetupAllLocations() {
        _mockLocations.Setup(s => s.GetAll())
            .Returns(TestData.Parks);
    }

    // Park with all optional data fields except for park photos filled.
    private void SetupLocation0()
    {
        _mockLocations.Setup(s => s.GetByAbbreviation(TestData.Parks[0].parkAbbreviation))
            .Returns(TestData.Parks[0]);
        _mockParkAddresses.Setup(s => s.GetByLocationId(TestData.Parks[0].id))
            .Returns([TestData.ParkAddresses[1]]);
        _mockBucketList.Setup(s => s.GetByLocationId(TestData.Parks[0].id))
            .Returns([
                TestData.BucketList[0],
                TestData.BucketList[2]
            ]);
        _mockParkIcons.Setup(s => s.GetByLocationId(TestData.Parks[0].id))
            .Returns([
                TestData.ParkIcons[0],
                TestData.ParkIcons[1]
            ]);
        _mockParkPhotos.Setup(s => s.GetByLocationId(TestData.Parks[0].id))
            .Returns([]);
    }

    // Park with all optional data fields empty except for park photos.
    private void SetupLocation1()
    {
        _mockLocations.Setup(s => s.GetByAbbreviation(TestData.Parks[1].parkAbbreviation))
            .Returns(TestData.Parks[1]);
        _mockParkAddresses.Setup(s => s.GetByLocationId(TestData.Parks[1].id))
            .Returns([TestData.ParkAddresses[0]]);
        _mockBucketList.Setup(s => s.GetByLocationId(TestData.Parks[1].id))
            .Returns([]);
        _mockParkIcons.Setup(s => s.GetByLocationId(TestData.Parks[1].id))
            .Returns([]);
        _mockParkPhotos.Setup(s => s.GetByLocationId(TestData.Parks[1].id))
            .Returns([
                TestData.ParkPhotos[0],
                TestData.ParkPhotos[1]
            ]);
    }

    // Nonexistent park.
    private void SetupInvalidLocation()
    {
        _mockLocations.Setup(s => s.GetByAbbreviation(It.IsAny<string>()))
            .Throws(new NotFoundException($"Park not found"));
        _mockParkAddresses.Setup(s => s.GetByLocationId(It.IsAny<int>()))
            .Returns([]);
        _mockBucketList.Setup(s => s.GetByLocationId(It.IsAny<int>()))
            .Returns([]);
        _mockParkIcons.Setup(s => s.GetByLocationId(It.IsAny<int>()))
            .Returns([]);
        _mockParkPhotos.Setup(s => s.GetByLocationId(It.IsAny<int>()))
            .Returns([]);
    }
}