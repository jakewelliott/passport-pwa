using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.Services;
using DigitalPassportBackend.UnitTests.TestUtils;
using DigitalPassportBackend.Domain;
using NetTopologySuite.Geometries;

using Moq;
using Microsoft.AspNetCore.Http;
using System.Net.Sockets;

namespace DigitalPassportBackend.UnitTests.Services;

[Collection("NonParallelCollection")]
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
        SetupAllTrails();

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
    public void CreatePark_SuccessfullyCreatesPark_WhenAbbreviationUnique()
    {
        // Arrange
        var park = TestData.Parks[0];
        var addrs = new List<ParkAddress> { TestData.ParkAddresses[1] };
        var icons = new List<ParkIcon> { TestData.ParkIcons[0], TestData.ParkIcons[1] };
        var blItems = new List<BucketListItem> { TestData.BucketList[0], TestData.BucketList[2] };
        var photos = new List<ParkPhoto> { };

        _mockLocations.Setup(s => s.GetByAbbreviation(park.parkAbbreviation))
            .Throws(new NotFoundException("not found"));
        _mockLocations.Setup(s => s.Create(park));
        _mockParkAddresses.Setup(s => s.Create(It.IsAny<ParkAddress>()));
        _mockParkIcons.Setup(s => s.Create(It.IsAny<ParkIcon>()));
        _mockBucketList.Setup(s => s.Create(It.IsAny<BucketListItem>()));
        _mockParkPhotos.Setup(s => s.Create(It.IsAny<ParkPhoto>()));

        // Act
        _locations.CreatePark(park, addrs, icons, blItems, photos);

        // Assert
        _mockLocations.Verify(s => s.Create(park), Times.Once());
        _mockParkAddresses.Verify(s => s.Create(addrs[0]), Times.Once());
        _mockParkIcons.Verify(s => s.Create(icons[0]), Times.Once());
        _mockParkIcons.Verify(s => s.Create(icons[1]), Times.Once());
        _mockBucketList.Verify(s => s.Create(blItems[0]), Times.Once());
        _mockBucketList.Verify(s => s.Create(blItems[1]), Times.Once());
    }

    [Fact]
    public void CreatePark_ThrowsException_WhenAbbreviationExists()
    {
        // Arrange
        var park = TestData.Parks[0];
        _mockLocations.Setup(s => s.GetByAbbreviation(park.parkAbbreviation)).Returns(park);

        // Act & Assert
        var ex = Assert.Throws<ServiceException>(() =>
            _locations.CreatePark(park, new List<ParkAddress>(), new List<ParkIcon>(), new List<BucketListItem>(), new List<ParkPhoto>())
        );
        Assert.Equal(409, ex.StatusCode);
    }

    [Fact]
    public void UpdatePark_UpdatesParkAndRelatedData_WhenNoAbbreviationConflict()
    {
        // Arrange
        var park = TestData.Parks[0];
        var addrs = new List<ParkAddress> { TestData.ParkAddresses[1] };
        var icons = new List<ParkIcon> { TestData.ParkIcons[0] };
        var blItems = new List<BucketListItem> { TestData.BucketList[0] };
        var photos = new List<ParkPhoto> { };

        var updatedPark = new Park { 
                id = 45,
                parkName = "Carolina State Park",
                parkAbbreviation = "CABE",
                parkType = ParkType.SPA,
                city = "Apex",
                coordinates = new(-77.9066, 34.0472),
                phone = 9104588206,
                email = "new email",
                stampImage = "",
                establishedYear = "1996",
                landmark = "Sugarloaf Dune, which has helped people find their way since 1663 and offers a great view of the Cape Fear River",
                youCanFind = "the Venus flytrap, one of the rarest species of plants that eats bugs.",
                trails = "■ 9 trails\n\n■ 1 wheelchair-accessible trail\n\n■ Kids TRACK Trail (follows Snow’s Cut Trail)\n\n■ 8.75 miles of hiking\n\n■ 1 mile of biking",
                boundaries = new([new Polygon(new([ // Approximated off of Google Maps.
                    new(34.055119779529406, -77.90104594653654),
                    new(34.04649888776697, -77.90350265943654),
                    new(34.0451418156539, -77.900443811041),
                    new(34.04075113953932, -77.90147948415252),
                    new(34.04224798642799, -77.90487552883268),
                    new(34.04125009141853, -77.90916273366837),
                    new(34.04248747948313, -77.91246243626662),
                    new(34.03991289369798, -77.91075237141644),
                    new(34.03779728400115, -77.9167496413892),
                    new(34.03280742969894, -77.91431701389152),
                    new(34.03067012766215, -77.91847743839043),
                    new(34.050917086671674, -77.9279460007207),
                    new(34.055119779529406, -77.90104594653654)
                ]))]),
                accesses = null,
                website = "https://www.ncparks.gov/state-parks/carolina-beach-state-park"
         };

        _mockLocations.Setup(s => s.GetById(park.id)).Returns(park);
        _mockLocations.Setup(s => s.GetByAbbreviation(park.parkAbbreviation)).Returns(park);
        _mockLocations.Setup(s => s.Update(It.IsAny<Park>()));

        _mockParkAddresses.Setup(s => s.GetByLocationId(park.id)).Returns(new List<ParkAddress>());
        _mockParkAddresses.Setup(s => s.GetById(addrs[0].id)).Returns(addrs[0]);

        _mockParkIcons.Setup(s => s.GetByLocationId(park.id)).Returns(new List<ParkIcon>());
        _mockParkIcons.Setup(s => s.GetById(icons[0].id)).Returns(icons[0]);

        _mockBucketList.Setup(s => s.GetByLocationId(park.id)).Returns(new List<BucketListItem>());
        _mockBucketList.Setup(s => s.GetById(blItems[0].id)).Returns(blItems[0]);

        _mockParkPhotos.Setup(s => s.GetByLocationId(park.id)).Returns(new List<ParkPhoto>());

        // Act
        _locations.UpdatePark(updatedPark, addrs, icons, blItems, photos);

        // Assert
        _mockLocations.Verify(s => s.Update(It.IsAny<Park>()), Times.Once());
        _mockParkAddresses.Verify(s => s.GetByLocationId(park.id), Times.Once());
        _mockParkIcons.Verify(s => s.GetByLocationId(park.id), Times.Once());
        _mockBucketList.Verify(s => s.GetByLocationId(park.id), Times.Once());
        _mockParkPhotos.Verify(s => s.GetByLocationId(park.id), Times.Once());
    }

    [Fact]
    public void UpdatePark_ThrowsException_WhenAbbreviationCollision()
    {
        // Arrange
        var park = TestData.Parks[0];
        var conflictingPark = new Park { 
                id = 17,
                parkName = "Carolina State Park",
                parkAbbreviation = "CABE",
                parkType = ParkType.SPA,
                city = "Apex",
                coordinates = new(-77.9066, 34.0472),
                phone = 9104588206,
                email = "new",
                stampImage = "",
                establishedYear = "1996",
                landmark = "Sugarloaf Dune, which has helped people find their way since 1663 and offers a great view of the Cape Fear River",
                youCanFind = "the Venus flytrap, one of the rarest species of plants that eats bugs.",
                trails = "■ 9 trails\n\n■ 1 wheelchair-accessible trail\n\n■ Kids TRACK Trail (follows Snow’s Cut Trail)\n\n■ 8.75 miles of hiking\n\n■ 1 mile of biking",
                boundaries = new([new Polygon(new([ // Approximated off of Google Maps.
                    new(34.055119779529406, -77.90104594653654),
                    new(34.04649888776697, -77.90350265943654),
                    new(34.0451418156539, -77.900443811041),
                    new(34.04075113953932, -77.90147948415252),
                    new(34.04224798642799, -77.90487552883268),
                    new(34.04125009141853, -77.90916273366837),
                    new(34.04248747948313, -77.91246243626662),
                    new(34.03991289369798, -77.91075237141644),
                    new(34.03779728400115, -77.9167496413892),
                    new(34.03280742969894, -77.91431701389152),
                    new(34.03067012766215, -77.91847743839043),
                    new(34.050917086671674, -77.9279460007207),
                    new(34.055119779529406, -77.90104594653654)
                ]))]),
                accesses = null,
                website = "https://www.ncparks.gov/state-parks/carolina-beach-state-park"
         };
        _mockLocations.Setup(s => s.GetById(conflictingPark.id)).Returns(park);
        _mockLocations.Setup(s => s.GetByAbbreviation(park.parkAbbreviation)).Returns(park);

        // Act & Assert
        var ex = Assert.Throws<ServiceException>(() =>
            _locations.UpdatePark(conflictingPark, new List<ParkAddress>(), new List<ParkIcon>(), new List<BucketListItem>(), new List<ParkPhoto>())
        );
        Assert.Equal(409, ex.StatusCode);
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

    [Fact]
    public void GetAllTrails_TrailsList_WhenTrailsExist()
    {
        // Action
        var items = _locations.GetAllTrails();

        // Assert
        var counter = 0;
        foreach(var trail in items) {
            Assert.Equal(TestData.Trails[counter], trail);
            counter++;
        }
    }

    [Fact]
    public void GetAllTrails_EmptyList_WhenTrailsDNE()
    {
        // Arrange
        _mockTrails.Setup(s => s.GetAll()).Returns(new List<Trail>());

        // Action
        var items = _locations.GetAllTrails();

        // Assert
        Assert.Empty(items);
    }

    [Fact]
    public void GetTrailIcons_ReturnsIcons_WhenTrailExists()
    {
        // Arrange
        _mockTrailIcons.Setup(s => s.GetByTrailId(TestData.Trails[1].id)).Returns([TestData.TrailIcons[1]]);

        // Action
        var items = _locations.GetTrailIcons(TestData.Trails[1].id);

        // Assert
        Assert.Single(items);
        Assert.Equal(TestData.TrailIcons[1], items[0]);
    }

    [Fact]
    public void GetTrailIcons_ReturnsEmpty_WhenTrailDNE()
    {
        // Arrange
        _mockTrailIcons.Setup(s => s.GetByTrailId(-1)).Returns([]);

        // Action
        var items = _locations.GetTrailIcons(-1);

        // Assert
        Assert.Empty(items);
    }

    [Fact]
    public void GetById_ReturnsPark_WhenParkExists()
    {
        // Arrange
        _mockLocations.Setup(s => s.GetById(TestData.Parks[0].id)).Returns(TestData.Parks[0]);

        // Action
        var item = _locations.GetById(TestData.Parks[0].id);

        // Assert
        Assert.Equal(TestData.Parks[0], item);
    }

        [Fact]
    public void GetById_ThrowsException_WhenParkDNE()
    {
        // Action and assert.
        var ex = Assert.Throws<NotFoundException>(() => _locations.GetById(-1));
    }

    private void SetupAllTrails() {
        _mockTrails.Setup(s => s.GetAll()).Returns(TestData.Trails);
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
        _mockLocations.Setup(s => s.GetById(It.IsAny<int>()))
            .Throws(new NotFoundException($"Park not found"));
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