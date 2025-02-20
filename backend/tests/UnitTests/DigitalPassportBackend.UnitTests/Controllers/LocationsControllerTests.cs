using Moq;

using DigitalPassportBackend.Controllers;
using DigitalPassportBackend.Services;
using DigitalPassportBackend.Domain;
using Microsoft.AspNetCore.Mvc;
using static DigitalPassportBackend.Controllers.LocationsController;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.UnitTests.TestUtils;

namespace DigitalPassportBackend.UnitTests.Controllers;
public class LocationsControllerTests
{
    private readonly Mock<ILocationsService> _mockLocationsService;

    private readonly LocationsController _controller;

    private readonly List<Park> _locations = [];

    public LocationsControllerTests()
    {
        _mockLocationsService = new Mock<ILocationsService>();
        _controller = new LocationsController(_mockLocationsService.Object);
    }

    [Fact]
    public void Get_ReturnsOkResult_WhenLocationExists()
    {
        // Arrange
        SetupLocation(TestData.Parks[0]);
        SetupLocation(TestData.Parks[1]);

        // Act
        var result0 = _controller.Get(TestData.Parks[0].parkAbbreviation);
        var result1 = _controller.Get(TestData.Parks[1].parkAbbreviation);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result0);
        Assert.IsType<LocationResponse>(okResult.Value);
        Assert.True(Response.Equal(TestData.Parks[0], (LocationResponse) okResult.Value));

        okResult = Assert.IsType<OkObjectResult>(result1);
        Assert.IsType<LocationResponse>(okResult.Value);
        Assert.True(Response.Equal(TestData.Parks[1], (LocationResponse) okResult.Value));
    }

    [Fact]
    public void Get_ReturnsProblemResult_WhenLocationNotFound()
    {
        // Arrange
        var locationAbbrev = "XYZ";
        _mockLocationsService.Setup(s => s.GetByAbbreviation(locationAbbrev)).Throws(new NotFoundException($"Park not found with abbreviation {locationAbbrev}"));

        // Act
        var exception = Assert.Throws<NotFoundException>(() => _controller.Get(locationAbbrev));

        // Assert
        Assert.Equal(404, exception.StatusCode);
        Assert.Equal($"Park not found with abbreviation {locationAbbrev}", exception.ErrorMessage);
    }

    [Fact]
    public void GetAll_ReturnsOkResult_WithLocations()
    {
        // Arrange.
        SetupLocation(TestData.Parks[0]);
        SetupLocation(TestData.Parks[1]);
        _mockLocationsService.Setup(s => s.GetAll())
            .Returns(_locations);

        // Act.
        var result = _controller.GetAll();

        // Assert.
        var okResult = Assert.IsType<OkObjectResult>(result);
        var list = Assert.IsType<List<LocationResponse>>(okResult.Value)!;
        Assert.Equal(2, list.Count);
        Assert.True(Response.Equal(TestData.Parks[0], list[0]));
        Assert.True(Response.Equal(TestData.Parks[1], list[1]));
    }

    [Fact]
    public void GetAll_ReturnsOkResult_WithoutLocations()
    {
        // Arrange
        var locations = new List<Park>();
        _mockLocationsService.Setup(s => s.GetAll()).Returns(locations);


        // Act
        var result = _controller.GetAll();


        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var returnedLocations = Assert.IsType<List<LocationResponse>>(okResult.Value);
        Assert.Empty(returnedLocations);
    }


    private void SetupLocation(Park park)
    {
        _mockLocationsService.Setup(s => s.GetByAbbreviation(park.parkAbbreviation))
            .Returns(park);
        _mockLocationsService.Setup(s => s.GetAddressesByLocationId(park.id))
            .Returns([.. TestData.ParkAddresses.Where(p => p.parkId == park.id)]);
        _mockLocationsService.Setup(s => s.GetIconsByLocationId(park.id))
            .Returns([.. TestData.ParkIcons.Where(p => p.parkId == park.id)]);
        _mockLocationsService.Setup(s => s.GetBucketListItemsByLocationId(park.id))
            .Returns([.. TestData.BucketList.Where(p => p.parkId == park.id)]);
        _mockLocationsService.Setup(s => s.GetParkPhotosByLocationId(park.id))
            .Returns([.. TestData.ParkPhotos.Where(p => p.parkId == park.id)]);
        _locations.Add(park);
    }
}