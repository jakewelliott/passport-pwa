using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.Services;
using DigitalPassportBackend.UnitTests.TestUtils;

using Moq;

namespace DigitalPassportBackend.UnitTests.Services;
public class LocationsServiceTests
{
    private readonly Mock<BucketListItemRepository> _mockBucketList;
    private readonly Mock<LocationsRepository> _mockLocations;
    private readonly Mock<ParkAddressRepository> _mockParkAddresses;
    private readonly Mock<ParkIconRepository> _mockParkIcons;
    private readonly Mock<ParkPhotoRepository> _mockParkPhotos;

    private readonly ILocationsService _locations;

    public LocationsServiceTests()
    {
        // Initialize mocked repositories.
        _mockBucketList = new();
        _mockLocations = new();
        _mockParkAddresses = new();
        _mockParkIcons = new();
        _mockParkPhotos = new();

        // Add location data to mocked repositories.
        SetupLocation0();
        SetupLocation1();

        // Initialize LocationsService.
        _locations = new LocationsService(
            _mockLocations.Object,
            _mockParkAddresses.Object,
            _mockBucketList.Object,
            _mockParkIcons.Object,
            _mockParkPhotos.Object);
    }

    [Fact]
    public void GetAddressesByLocationId_ReturnsAddressList_WhenLocationExists()
    {
        //TODO
    }

    [Fact]
    public void GetAddressesByLocationId_ThrowsNotFoundException_WhenLocationDNE()
    {
        //TODO
    }

    [Fact]
    public void GetBucketListItemsByLocationId_ReturnsBucketListItemList_WhenLocationExists()
    {
        //TODO
    }

    [Fact]
    public void GetBucketListItemsByLocationId_ReturnsEmptyList_WhenLocationExists_AndNoBucketListItems()
    {
        //TODO
    }

    [Fact]
    public void GetBucketListItemsByLocationId_ThrowsNotFoundException_WhenLocationDNE()
    {
        //TODO
    }
    
    [Fact]
    public void GetByAbbreviation_ReturnsPark_WhenLocationExists()
    {
        //TODO
    }

    [Fact]
    public void GetByAbbreviation_ThrowsNotFoundException_WhenLocationDNE()
    {
        //TODO
    }

    [Fact]
    public void GetIconsByLocationId_ReturnsIconList_WhenLocationExists()
    {
        //TODO
    }

    [Fact]
    public void GetIconsByLocationId_ReturnsEmptyList_WhenLocationExists_AndNoIcons()
    {
        //TODO
    }

    [Fact]
    public void GetIconsByLocationId_ThrowsNotFoundException_WhenLocationDNE()
    {
        //TODO
    }

    [Fact]
    public void GetParkPhotosByLocationId_ReturnsParkPhotoList_WhenLocationExists()
    {
        //TODO
    }

    [Fact]
    public void GetParkPhotosByLocationId_ReturnsEmptyList_WhenLocationExists_AndNoParkPhotos()
    {
        //TODO
    }

    [Fact]
    public void GetParkPhotosByLocationId_ThrowsNotFoundException_WhenLocationDNE()
    {
        //TODO
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
}