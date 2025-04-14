using Moq;

using DigitalPassportBackend.Controllers;
using DigitalPassportBackend.Services;
using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Domain.DTO;
using Microsoft.AspNetCore.Mvc;
using static DigitalPassportBackend.Controllers.LocationsController;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.UnitTests.TestUtils;
using Microsoft.AspNetCore.Http;
using Microsoft.OpenApi.Extensions;

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
        Assert.IsType<ParkDTO>(okResult.Value);
        Assert.True(Response.Equal(TestData.Parks[0], (ParkDTO) okResult.Value));

        okResult = Assert.IsType<OkObjectResult>(result1);
        Assert.IsType<ParkDTO>(okResult.Value);
        Assert.True(Response.Equal(TestData.Parks[1], (ParkDTO) okResult.Value));
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
        var list = Assert.IsType<List<ParkDTO>>(okResult.Value)!;
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
        var returnedLocations = Assert.IsType<List<ParkDTO>>(okResult.Value);
        Assert.Empty(returnedLocations);
    }

    [Fact]
    public void GetAllTrails_ReturnsAllTrails_WhenTrailsExist()
    {
        // Setup
        _mockLocationsService.Setup(s => s.GetAllTrails())
            .Returns(TestData.Trails);
        SetupTrails(TestData.Trails[0]);
        SetupTrails(TestData.Trails[1]);
        SetupTrails(TestData.Trails[2]);
        SetupTrails(TestData.Trails[3]);

        // Action
        var result = _controller.GetAllTrails();

        // Assert.
        var okResult = Assert.IsType<OkObjectResult>(result);
        var list = Assert.IsAssignableFrom<IEnumerable<TrailDTO>>(okResult.Value);

        int counter = 0;
        foreach (var trail in list) {
            List<TrailIconDTO> iconDTOs = new List<TrailIconDTO> { 
                new TrailIconDTO( 
                    TestData.TrailIcons[counter].id, 
                    TestData.TrailIcons[counter].icon.GetDisplayName(), 
                    null 
                ) 
             };

            Assert.True(Response.Equal(iconDTOs, TestData.Trails[counter], trail));
            counter++;
        }
    }

    [Fact]
    public void UploadGeoJson_ReturnsSuccess_WhenValidGeoJsonFile()
    {
        // Setup.
        _mockLocationsService.Setup(s => s.UploadGeoJson(It.IsAny<IFormFile>()))
            .Returns("Successfully imported data from the GeoJSON file.");
        
        // Action.
        var result = _controller.UploadGeoJson(TestFileHelper.Open("test_parks.json"));

        // Assert.
        var okResult = Assert.IsType<OkObjectResult>(result);
        var str = Assert.IsType<string>(okResult.Value);
        Assert.Equal("Successfully imported data from the GeoJSON file.", str);
    }

    [Fact]
    public void UploadGeoJson_ThrowsException_WhenInvalidFileType()
    {
        // Action and assert.
        var e = Assert.Throws<ServiceException>(() => _controller.UploadGeoJson(TestFileHelper.Open("test_parks_invalid.txt")));
        Assert.Equal(StatusCodes.Status415UnsupportedMediaType, e.StatusCode);
    }

    [Fact]
    public void UploadGeoJson_ThrowsException_WhenNullFile()
    {
        // Action and assert.
        var e = Assert.Throws<ServiceException>(() => _controller.UploadGeoJson(null!));
        Assert.Equal(StatusCodes.Status415UnsupportedMediaType, e.StatusCode);
    }

    [Fact]
    public void GetGeoData_ReturnsPopulatedList_WhenLocationsExist()
    {
        // Setup.
        SetupLocation(TestData.Parks[0]);
        SetupLocation(TestData.Parks[1]);
        _mockLocationsService.Setup(s => s.GetAll())
            .Returns(_locations);

        // Action.
        var result = _controller.GetGeoData();

        // Assert.
        var okResult = Assert.IsType<OkObjectResult>(result);
        var list = Assert.IsType<List<LocationGeoDataResponse>>(okResult.Value);
        Assert.Equal(_locations.Count, list.Count);
        Assert.True(Response.Equal(TestData.Parks[0], list[0]));
        Assert.True(Response.Equal(TestData.Parks[1], list[1]));
    }

    [Fact]
    public void GetGeoData_ReturnsEmptyList_WhenLocationsDNE()
    {
        // Setup.
        var locations = new List<Park>();
        _mockLocationsService.Setup(s => s.GetAll())
            .Returns(locations);
        
        // Action.
        var result = _controller.GetGeoData();

        // Assert.
        var okResult = Assert.IsType<OkObjectResult>(result);
        var list = Assert.IsType<List<LocationGeoDataResponse>>(okResult.Value);
        Assert.Empty(list);
    }

    private List<TrailIcon> SetupTrails(Trail trail)
    {
        var icons = TestData.TrailIcons.Where(t => t.trail == trail).ToList();
        _mockLocationsService.Setup(s => s.GetTrailIcons(trail.id))
            .Returns(icons);
        return icons;
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