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

        [Fact]
        public void CreateUpdateNote_Returns200Ok_WhenValidUserAndPark()
        {
            // Setup.
            var req = new PrivateNoteRequest("sample note", DateTime.UtcNow);
            SetupUser(TestData.Users[1].id, TestData.Users[1].role.GetDisplayName());
            SetupPrivateNoteSuccess(req, TestData.Users[1], TestData.Parks[0]);

            // Action.
            var result = _controller.CreateUpdateNote(TestData.Parks[0].id, req);

            // Assert.
            var okResult = Assert.IsType<OkObjectResult>(result);
            var resp = Assert.IsType<PrivateNoteResponse>(okResult.Value);
            Assert.True(Response.Equal(TestData.Parks[0], req, resp));
        }

        [Fact]
        public void CreateUpdateNote_ReturnsNullException_WhenInvalidUser()
        {
            // Setup, no user.
            var req = new PrivateNoteRequest("sample note", DateTime.UtcNow);

            // Action.
            var e = Assert.Throws<ArgumentNullException>(() => _controller.CreateUpdateNote(TestData.Parks[0].id, req));
        }

        [Fact]
        public void CreateUpdateNote_Returns404NotFound_WhenInvalidPark()
        {
            // Setup.
            var req = new PrivateNoteRequest("sample note", DateTime.UtcNow);
            SetupUser(TestData.Users[1].id, TestData.Users[1].role.GetDisplayName());
            _mockActivityService.Setup(s => s.CreateUpdatePrivateNote(
                -1,
                TestData.Users[1].id,
                req.note,
                req.updatedAt
            )).Throws(new NotFoundException("Park not found with given Id."));

            // Action.
            var e = Assert.Throws<NotFoundException>(() => _controller.CreateUpdateNote(-1, req));

            // Assert.
            Assert.Equal(404, e.StatusCode);
        }

        [Fact]
        public void CreateUpdateNote_Returns200Ok_WhenValid_ForGeneralNote()
        {
            // Setup.
            var req = new PrivateNoteRequest("sample general note", DateTime.UtcNow);
            SetupUser(TestData.Users[1].id, TestData.Users[1].role.GetDisplayName());
            SetupPrivateNoteSuccess(req, TestData.Users[1], null);

            // Action.
            var result = _controller.CreateUpdateNote(0, req);

            // Assert.
            var okResult = Assert.IsType<OkObjectResult>(result);
            var resp = Assert.IsType<PrivateNoteResponse>(okResult.Value);
            Assert.True(Response.Equal(null, req, resp));
        }

        [Fact]
        public void GetParkNote_ReturnsNote_WhenValidNoteCreated()
        {
            // Setup.
            SetupUser(TestData.Users[1].id, TestData.Users[1].role.GetDisplayName());
            _mockActivityService.Setup(s => s.GetParkNote(TestData.Parks[0].id, TestData.Users[1].id))
                .Returns(TestData.PrivateNotes[0]);

            // Action.
            var result = _controller.GetParkNote(TestData.Parks[0].id);

            // Assert.
            var okResult = Assert.IsType<OkObjectResult>(result);
            var resp = Assert.IsType<PrivateNoteResponse>(okResult.Value);
            Assert.True(Response.Equal(TestData.PrivateNotes[0], resp));
        }

        [Fact]
        public void GetParkNote_ReturnsGeneralNote_WhenValidNoteCreated()
        {
            // Setup.
            PrivateNote generalNote = new()
            {
                id = 7,
                note = "This is a general note!",
                createdAt = DateTime.UtcNow,
                updatedAt = DateTime.UtcNow,
                parkId = 0,
                park = null,
                userId = TestData.Users[1].id,
                user = TestData.Users[1]
            };

            SetupUser(TestData.Users[1].id, TestData.Users[1].role.GetDisplayName());
            _mockActivityService.Setup(s => s.GetParkNote(0, TestData.Users[1].id))
                .Returns(generalNote);

            // Action.
            var result = _controller.GetParkNote(0);

            // Assert.
            var okResult = Assert.IsType<OkObjectResult>(result);
            var resp = Assert.IsType<PrivateNoteResponse>(okResult.Value);
            Assert.True(Response.Equal(generalNote, resp));
        }

        [Fact]
        public void GetParkNote_ReturnsEmptyNote_WhenNoNoteCreated()
        {
            // Setup, no existing note for this user at this park.
            PrivateNote note = new()
            {
                id = 8,
                note = "",
                createdAt = DateTime.UtcNow,
                updatedAt = DateTime.UtcNow,
                parkId = TestData.Parks[1].id,
                park = TestData.Parks[1],
                userId = TestData.Users[1].id,
                user = TestData.Users[1]
            };

            SetupUser(TestData.Users[1].id, TestData.Users[1].role.GetDisplayName());
            _mockActivityService.Setup(s => s.GetParkNote(TestData.Parks[1].id, TestData.Users[1].id))
                .Returns(note);

            // Action.
            var result = _controller.GetParkNote(TestData.Parks[1].id);

            // Assert.
            var okResult = Assert.IsType<OkObjectResult>(result);
            var resp = Assert.IsType<PrivateNoteResponse>(okResult.Value);
            Assert.True(Response.Equal(note, resp));
        }

        [Fact]
        public void GetParkNote_ReturnsException_WhenInvalidParkAndUser()
        {
            // Action, no user setup.
            Assert.Throws<ArgumentNullException>(() => _controller.GetParkNote(TestData.Parks[0].id));

            // Setup, invalid park.
            SetupUser(TestData.Users[1].id, TestData.Users[1].role.GetDisplayName());
            _mockActivityService.Setup(s => s.GetParkNote(-1, TestData.Users[1].id))
                .Throws(new NotFoundException("Park not found with given Id."));

            // Action.
            var e = Assert.Throws<NotFoundException>(() => _controller.GetParkNote(-1));

            // Assert.
            Assert.Equal(404, e.StatusCode);
        }

        [Fact]
        public void GetNotes_ReturnsList_WhenValidNotesCreated()
        {
            List<PrivateNote> notes =
            [
                new()
                {
                    id = 12,
                    note = "This is a general note!",
                    createdAt = DateTime.UtcNow,
                    updatedAt = DateTime.UtcNow,
                    parkId = 0,
                    park = null,
                    userId = TestData.Users[2].id,
                    user = TestData.Users[2]
                }
            ];
            notes.Add(TestData.PrivateNotes[1]);
            notes.Add(TestData.PrivateNotes[2]);

            SetupUser(TestData.Users[2].id, TestData.Users[2].role.GetDisplayName());
            _mockActivityService.Setup(s => s.GetNotes(TestData.Users[2].id))
                .Returns(notes);

            // Action.
            var result = _controller.GetNotes();

            // Assert.
            var okResult = Assert.IsType<OkObjectResult>(result);
            var resp = Assert.IsType<List<PrivateNoteResponse>>(okResult.Value);

            Assert.Equal(3, resp.Count);
            Assert.True(Response.Equal(notes[0], resp[0]));
            Assert.True(Response.Equal(notes[1], resp[1]));
            Assert.True(Response.Equal(notes[2], resp[2]));
        }

        [Fact]
        public void GetNotes_ReturnsNullException_WhenInvalidUser()
        {
            // Action, no user setup.
            Assert.Throws<ArgumentNullException>(() => _controller.GetNotes());
        }

        [Fact]
        public void GetNotes_ReturnsEmptyList_WhenNoUserNotes()
        {
            // Setup.
            List<PrivateNote> notes = [];
            SetupUser(TestData.Users[0].id, TestData.Users[0].role.GetDisplayName());
            _mockActivityService.Setup(s => s.GetNotes(TestData.Users[0].id))
                .Returns(notes);

            // Action.
            var result = _controller.GetNotes();

            // Assert.
            var okResult = Assert.IsType<OkObjectResult>(result);
            var resp = Assert.IsType<List<PrivateNoteResponse>>(okResult.Value);

            // Assert.
            Assert.Empty(resp);
        }

        [Fact]
        public void ToggleBucketListItemCompletion_Returns200Ok_WhenValidUserAndItem()
        {
            // Setup.
            var req = new ToggleBucketListItemCompletionRequest(-78.6736, 35.7717);
            SetupUser(TestData.Users[1].id, TestData.Users[1].role.GetDisplayName());
            SetupToggleBLICompletionSuccess(req, TestData.CompletedBucketListItems[3]);

            // Action.
            var result = _controller.ToggleBucketListItemCompletion(TestData.BucketList[1].id, req);

            // Assert.
            var okResult = Assert.IsType<OkObjectResult>(result);
            var resp = Assert.IsType<CompletedBucketListItemResponse>(okResult.Value);
            Assert.True(Response.Equal(TestData.CompletedBucketListItems[3], resp));
        }

        [Fact]
        public void ToggleBucketListItemCompletion_ReturnsNullException_WhenInvalidUser()
        {
            // Setup, no user.
            var req = new ToggleBucketListItemCompletionRequest(-78.6736, 35.7717);
            SetupToggleBLICompletionSuccess(req, TestData.CompletedBucketListItems[3]);

            // Action.
            Assert.Throws<ArgumentNullException>(() =>
                _controller.ToggleBucketListItemCompletion(TestData.BucketList[1].id, req));
        }

        [Fact]
        public void ToggleBucketListItemCompletion_Returns404NotFound_WhenInvalidBucketListItem()
        {
            // Setup.
            var req = new ToggleBucketListItemCompletionRequest(-78.6736, 35.7717);
            SetupUser(TestData.Users[1].id, TestData.Users[1].role.GetDisplayName());
            _mockActivityService.Setup(s => s.ToggleBucketListItemCompletion(
                -1,
                TestData.Users[1].id,
                req.longitude,
                req.latitude
            )).Throws(new NotFoundException("Bucket list item not found with given Id."));

            // Action.
            var e = Assert.Throws<NotFoundException>(() => _controller.ToggleBucketListItemCompletion(-1, req));

            // Assert.
            Assert.Equal(404, e.StatusCode);
        }

        [Fact]
        public void GetBucketListItems_ReturnsList_WhenBucketListItemsExist()
        {
            // Setup.
            SetupUser(TestData.Users[1].id, TestData.Users[1].role.GetDisplayName());
            _mockActivityService.Setup(s => s.GetBucketListItems()).Returns(TestData.BucketList);

            // Action.
            var result = _controller.GetBucketListItems();

            // Assert.
            var okResult = Assert.IsType<OkObjectResult>(result);
            var resp = Assert.IsAssignableFrom<IEnumerable<BucketListItemResponse>>(okResult.Value);
            var respList = resp.ToList();

            int counter = 0;
            foreach (var item in respList)
            {
                Assert.True(Response.Equal(TestData.BucketList[counter], item));
                counter++;
            }
        }

        [Fact]
        public void GetCompletedBucketListItems_ReturnsList_WhenValidUserHasItems()
        {
            // Setup.
            SetupUser(TestData.Users[1].id, TestData.Users[1].role.GetDisplayName());
            _mockActivityService.Setup(s => s.GetCompletedBucketListItems(TestData.Users[1].id))
                .Returns([TestData.CompletedBucketListItems[1]]);

            // Action.
            var result = _controller.GetCompletedBucketListItems();

            // Assert.
            var okResult = Assert.IsType<OkObjectResult>(result);
            var resp = Assert.IsAssignableFrom<IEnumerable<CompletedBucketListItemResponse>>(okResult.Value);
            var respList = resp.ToList();

            Assert.Single(respList);
            Assert.True(Response.Equal(TestData.CompletedBucketListItems[1], respList[0]));
        }

        [Fact]
        public void GetCompletedBucketListItems_ReturnsEmptyList_WhenValidUserHasNoItems()
        {
            // Setup.
            SetupUser(TestData.Users[0].id, TestData.Users[0].role.GetDisplayName());
            _mockActivityService.Setup(s => s.GetCompletedBucketListItems(TestData.Users[0].id))
                .Returns([]);

            // Action.
            var result = _controller.GetCompletedBucketListItems();

            // Assert.
            var okResult = Assert.IsType<OkObjectResult>(result);
            var resp = Assert.IsAssignableFrom<IEnumerable<CompletedBucketListItemResponse>>(okResult.Value);
            var respList = resp.ToList();

            Assert.Empty(respList);
        }

        [Fact]
        public void GetCompletedBucketListItems_ReturnsNullException_WhenInvalidUser()
        {
            // Setup, no user.
            _mockActivityService.Setup(s => s.GetCompletedBucketListItems(TestData.Users[0].id))
                .Returns([]);

            // Action.
            Assert.Throws<ArgumentNullException>(() => _controller.GetCompletedBucketListItems());
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

        private void SetupToggleBLICompletionSuccess(ToggleBucketListItemCompletionRequest req, CompletedBucketListItem item)
        {
            // Mock service
            _mockActivityService.Setup(s => s.ToggleBucketListItemCompletion(
                item.bucketListItemId,
                item.userId,
                req.longitude,
                req.latitude
            )).Returns(item);
        }

        private void SetupPrivateNoteSuccess(PrivateNoteRequest req, User user, Park? park)
        {
            // Result
            var note = new PrivateNote()
            {
                id = 10,
                note = req.note,
                createdAt = req.updatedAt,
                updatedAt = req.updatedAt,
                parkId = park != null ? park.id : 0,
                park = park,
                userId = user.id,
                user = user
            };

            // Mock service
            _mockActivityService.Setup(s => s.CreateUpdatePrivateNote(
                park != null ? park.id : 0,
                user.id,
                req.note,
                req.updatedAt
            )).Returns(note);
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