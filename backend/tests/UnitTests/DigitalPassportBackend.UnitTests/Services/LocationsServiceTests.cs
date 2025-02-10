using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.Services;

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
}