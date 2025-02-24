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
        public void Get_ReturnsOkResult_VisitorUserValidLocation()
        {
            // Arrange
            SetupUser(TestData.Users[1].id,"visitor");
            List<CompletedBucketListItem> bucketListItems = [TestData.CompletedBucketListItems[1]];
        
            List<ParkVisit> visited =
            [
                TestData.ParkVisits[0],
                TestData.ParkVisits[1]
            ];
            var lastVisited = visited.OrderByDescending(v => v.createdAt).ToList().First();
            var parkActivity = GetParkActivity(bucketListItems, null, TestData.PrivateNotes[0], 
                lastVisited);
            
            _mockActivityService.Setup(s => 
                s.GetParkActivity(TestData.Parks[0].id, 
                TestData.Users[1].id)).Returns(parkActivity);

            // Act
            var result = _controller.Get(TestData.Parks[0].id);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedActivity = Assert.IsType<ParkActivity>(okResult.Value);

            Assert.Equal(returnedActivity.CompletedBucketListItems[0].Id, TestData.BucketList[0].id);
            Assert.Null(returnedActivity.StampCollectedAt);
            Assert.Equal(10, returnedActivity.PrivateNote!.Id);
            Assert.Equal("this is a note. it has stuff in it.", returnedActivity.PrivateNote.Note);
            Assert.Equal(returnedActivity.LastVisited, TestData.ParkVisits[1].createdAt);
        }

        [Fact]  
        public void Get_ThrowsException_InvalidLocationId()
        {
            // Arrange
            SetupUser(TestData.Users[1].id,"visitor");
            var invalidLocationId = -1;

            _mockActivityService
                .Setup(s => s.GetParkActivity(invalidLocationId, TestData.Users[1].id))
                .Throws(new NotFoundException("Location not found"));

            // Act
            var exception = Assert.Throws<NotFoundException>(() => 
                _controller.Get(invalidLocationId));
        }

        [Fact]
        public void Get_ThrowsException_InvalidUserId()
        {
            // Act, no user setup
            var exception = Assert.Throws<ArgumentNullException>(() => 
                _controller.Get(TestData.Parks[0].id));
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
                    req.longitude, req.latitude, req.inaccuracyRadius,
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
                    req.longitude, req.latitude, req.inaccuracyRadius,
                    req.method,
                    req.dateTime,
                    TestData.Users[1].id))
                .Throws(new ServiceException(StatusCodes.Status412PreconditionFailed, "Stamp collection method is not valid."));

            // Action.
            var e = Assert.Throws<ServiceException>(() => _controller.CollectStamp(TestData.Parks[0].parkAbbreviation, req));

            // Assert.
            Assert.Equal(412, e.StatusCode);
        }

        private ParkActivity GetParkActivity(
            List<CompletedBucketListItem> bucketListItems, 
            CollectedStamp? stampCollectedAt,
            PrivateNote? privateNote,
            ParkVisit lastVisited
        )
        {
        return new ParkActivity
            {
                CompletedBucketListItems = bucketListItems.Select(item => new BucketListItemOverview
                {
                    Id = item.bucketListItemId,
                }).ToList(),
                StampCollectedAt = stampCollectedAt?.updatedAt,
                PrivateNote = privateNote == null ? null : new PrivateNoteOverview
                {
                    Id = privateNote.id,
                    Note = privateNote.note
                },
                LastVisited = lastVisited?.createdAt
            };
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
                    req.longitude,
                    req.latitude,
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
                    req.longitude, req.latitude, req.inaccuracyRadius,
                    req.method,
                    req.dateTime,
                    userId))
                .Throws(new NotFoundException($"Park not found with abbreviation {abbr}"));
        }
    }
}