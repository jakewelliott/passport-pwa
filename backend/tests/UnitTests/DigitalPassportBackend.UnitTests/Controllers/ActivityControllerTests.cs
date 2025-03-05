using Moq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using DigitalPassportBackend.Controllers;
using DigitalPassportBackend.Services;
using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.UnitTests.TestUtils;
using static DigitalPassportBackend.Controllers.ActivityController;
using Microsoft.OpenApi.Extensions;

namespace DigitalPassportBackend.UnitTests.Controllers
{
    public class ActivityControllerTests
    {

        private readonly Mock<IActivityService> _mockActivityService;
        private readonly ActivityController _controller;

        public ActivityControllerTests()
        {
            _mockActivityService = new Mock<IActivityService>();
            _controller = new ActivityController(_mockActivityService.Object);

            // Setup activity service mocks.

        }

        [Fact]
        public void GetCollectedStamps_ReturnsPopulatedList_WhenStampsCollected()
        {
            // Setup.
            SetupUser(TestData.Users[1].id, "visitor");
            _mockActivityService.Setup(s => s.GetCollectedStamps(TestData.Users[1].id))
                .Returns([TestData.CollectedStamps[1]]);

            // Action.
            var result = _controller.GetCollectedStamps();

            // Assert.
            var okResult = Assert.IsType<OkObjectResult>(result);
            var resp = Assert.IsType<List<CollectedStampResponse>>(okResult.Value);
            Assert.Single(resp);
            Assert.True(Response.Equal(TestData.CollectedStamps[1], resp.First()));
        }

        [Fact]
        public void GetCollectedStamps_ReturnsEmptyList_WhenNoStampsCollected()
        {
            // Setup.
            SetupUser(TestData.Users[1].id, "visitor");
            _mockActivityService.Setup(s => s.GetCollectedStamps(TestData.Users[1].id))
                .Returns([]);

            // Action.
            var result = _controller.GetCollectedStamps();

            // Assert.
            var okResult = Assert.IsType<OkObjectResult>(result);
            var resp = Assert.IsType<List<CollectedStampResponse>>(okResult.Value);
            Assert.Empty(resp);
        }

        [Fact]
        public void GetCollectedStamps_ThrowsArgumentNullException_WhenInvalidUser()
        {
            // Act, no user setup
            var exception = Assert.Throws<ArgumentNullException>(_controller.GetCollectedStamps);
        }

        [Fact]
        public void CollectStamp_ReturnsCollectedStampResponse_WhenValidParameters_AndStampNotCollected()
        {
            // Setup.
            var req = new CollectStampRequest(
                -77.90944281388691, 34.04919197876853, 0.005,
                StampCollectionMethod.location.GetDisplayName(),
                DateTime.UtcNow);
            SetupUser(TestData.Users[1].id, TestData.Users[1].role.GetDisplayName());
            SetupCollectStampSuccess(req, TestData.Users[1], TestData.Parks[0]);

            // Action.
            var result = _controller.CollectStamp(TestData.Parks[0].parkAbbreviation, req);

            // Assert.
            var okResult = Assert.IsType<OkObjectResult>(result);
            var resp = Assert.IsType<CollectStampResponse>(okResult.Value);
            Assert.True(Response.Equal(TestData.Parks[0].parkAbbreviation, req, resp));
        }

        [Fact]
        public void CollectStamp_Returns404NotFound_WhenParkAbbrNull()
        {
            // Setup.
            var req = new CollectStampRequest(
                -77.90944281388691, 34.04919197876853, 0.005,
                StampCollectionMethod.location.GetDisplayName(),
                DateTime.UtcNow);
            SetupUser(TestData.Users[1].id, TestData.Users[1].role.GetDisplayName());
            SetupCollectStampNotFound(req, null, TestData.Users[1].id);

            // Action.
            var e = Assert.Throws<NotFoundException>(() => _controller.CollectStamp(null!, req));

            // Assert.
            Assert.Equal(404, e.StatusCode);
        }

        [Fact]
        public void CollectStamp_Returns404NotFound_WhenParkAbbrInvalid()
        {
            // Setup.
            var req = new CollectStampRequest(
                -77.90944281388691, 34.04919197876853, 0.005,
                StampCollectionMethod.location.GetDisplayName(),
                DateTime.UtcNow);
            SetupUser(TestData.Users[1].id, TestData.Users[1].role.GetDisplayName());
            SetupCollectStampNotFound(req, "INVALID", TestData.Users[1].id);

            // Action.
            var e = Assert.Throws<NotFoundException>(() => _controller.CollectStamp("INVALID", req));

            // Assert.
            Assert.Equal(404, e.StatusCode);
        }

        [Fact]
        public void CollectStamp_Returns405MethodNotAllowed_WhenCoordinatesInvalid()
        {
            // Setup.
            var req = new CollectStampRequest(
                -78.67343795255313, 35.77267838903396, 0.005,
                StampCollectionMethod.location.GetDisplayName(),
                DateTime.UtcNow);
            SetupUser(TestData.Users[1].id, TestData.Users[1].role.GetDisplayName());
            _mockActivityService.Setup(s => s.CollectStamp(
                    TestData.Parks[0].parkAbbreviation,
                    req.latitude,
                    req.longitude,
                    req.inaccuracyRadius,
                    req.method,
                    req.dateTime,
                    TestData.Users[1].id))
                .Throws(new ServiceException(StatusCodes.Status405MethodNotAllowed, "Your location doesn't appear to be at the specified park."));

            // Action.
            var e = Assert.Throws<ServiceException>(() => _controller.CollectStamp(TestData.Parks[0].parkAbbreviation, req));

            // Assert.
            Assert.Equal(405, e.StatusCode);
        }

        [Fact]
        public void CollectStamp_Returns_WhenInvalidMethod()
        {
            // Setup.
            var req = new CollectStampRequest(
                -77.90944281388691, 34.04919197876853, 0.005,
                "invalid",
                DateTime.UtcNow);
            SetupUser(TestData.Users[1].id, TestData.Users[1].role.GetDisplayName());
            _mockActivityService.Setup(s => s.CollectStamp(
                    TestData.Parks[0].parkAbbreviation,
                    req.latitude,
                    req.longitude,
                    req.inaccuracyRadius,
                    req.method,
                    req.dateTime,
                    TestData.Users[1].id))
                .Throws(new ServiceException(StatusCodes.Status412PreconditionFailed, "Stamp collection method is not valid."));

            // Action.
            var e = Assert.Throws<ServiceException>(() => _controller.CollectStamp(TestData.Parks[0].parkAbbreviation, req));

            // Assert.
            Assert.Equal(412, e.StatusCode);
        }

        private void SetupUser(int userId, string role)
        {
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(ClaimTypes.Role, role)
            }));

            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = user }
            };
        }

        private void SetupCollectStampSuccess(CollectStampRequest req, User user, Park park)
        {
            // Build result.
            var stamp = new CollectedStamp()
            {
                id = 5,
                method = Enum.Parse<StampCollectionMethod>(req.method),
                location = new(req.latitude, req.longitude),
                createdAt = req.dateTime ?? DateTime.UtcNow,
                updatedAt = req.dateTime ?? DateTime.UtcNow,
                userId = user.id,
                user = user,
                parkId = park.id,
                park = park
            };

            _mockActivityService.Setup(s => s.CollectStamp(
                    park.parkAbbreviation,
                    req.latitude,
                    req.longitude,
                    req.inaccuracyRadius,
                    req.method,
                    req.dateTime,
                    user.id))
                .Returns(stamp);
        }

        private void SetupCollectStampNotFound(CollectStampRequest req, string? abbr, int userId)
        {
            _mockActivityService.Setup(s => s.CollectStamp(
                    abbr!,
                    req.latitude,
                    req.longitude,
                    req.inaccuracyRadius,
                    req.method,
                    req.dateTime,
                    userId))
                .Throws(new NotFoundException($"Park not found with abbreviation {abbr}"));
        }
    }
}