using Moq;

using DigitalPassportBackend.Controllers;

using Xunit;
using DigitalPassportBackend.Services;
using DigitalPassportBackend.Domain;
using Microsoft.AspNetCore.Mvc;
using static DigitalPassportBackend.Controllers.LocationsController;
using Microsoft.AspNetCore.Http;
using DigitalPassportBackend.Persistence.Repository;

namespace DigitalPassportBackend.UnitTests.Controllers;
public class LocationsControllerTests
{
    private readonly Mock<ILocationsService> _mockLocationsService;

    private readonly LocationsController _controller;

    public LocationsControllerTests()
    {
        _mockLocationsService = new Mock<ILocationsService>();
        _controller = new LocationsController(_mockLocationsService.Object);
    }

    [Fact]
    public void Get_ReturnsOkResult_WhenLocationExists()
    {
        // Arrange
        var location = new Park
        {
            id = 1,
            parkName = "New York City",
            parkAbbreviation = "NYC",
            parkType = ParkType.SPA,
            website = "google.com"
        };
        var addresses = new List<ParkAddress>();
        var icons = new List<ParkIcon>();
        var bucketListItems = new List<BucketListItem>();
        var parkPhotos = new List<ParkPhoto>();

        _mockLocationsService.Setup(s => s.GetByAbbreviation(location.parkAbbreviation)).Returns(location);
        _mockLocationsService.Setup(s => s.GetAddressesByLocationId(location.id)).Returns(addresses);
        _mockLocationsService.Setup(s => s.GetIconsByLocationId(location.id)).Returns(icons);
        _mockLocationsService.Setup(s => s.GetBucketListItemsByLocationId(location.id)).Returns(bucketListItems);
        _mockLocationsService.Setup(s => s.GetParkPhotosByLocationId(location.id)).Returns(parkPhotos);

        // Act
        var result = _controller.Get(location.parkAbbreviation);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var returnValue = Assert.IsType<LocationResponse>(okResult.Value);
        Assert.Equal(location.parkName, returnValue.parkName);
    }

    [Fact]
    public void Get_ReturnsProblemResult_WhenLocationNotFound()
    {
        // Arrange
        var locationAbbrev = "XYZ";
        _mockLocationsService.Setup(s => s.GetByAbbreviation(locationAbbrev)).Returns((Park)null);

        // Act
        var result = _controller.Get(locationAbbrev);

        // Assert
        var objectResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(StatusCodes.Status404NotFound, objectResult.StatusCode);

        var problemDetails = Assert.IsType<ProblemDetails>(objectResult.Value);

        // Debug output
        Console.WriteLine($"Status: {problemDetails.Status}");
        Console.WriteLine($"Detail: {problemDetails.Detail}");
        Console.WriteLine($"Type: {problemDetails.Type}");

        // Assertions
        Assert.Equal(404, problemDetails.Status);
        Assert.Equal($"Location not found {locationAbbrev}", problemDetails.Detail);
    }
}