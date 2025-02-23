using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.Services;
using DigitalPassportBackend.UnitTests.TestUtils;
using DigitalPassportBackend.Domain;

using Moq;
using Microsoft.OpenApi.Extensions;
using Microsoft.AspNetCore.Http;

namespace DigitalPassportBackend.UnitTests.Services
{
    public class ActivityServiceTests
    {
        private readonly Mock<ICompletedBucketListItemRepository> _mockCompletedBucketList;
        private readonly Mock<ICollectedStampRepository> _mockCollectedStamps;
        private readonly Mock<IPrivateNoteRepository> _mockPrivateNotes;
        private readonly Mock<IParkVisitRepository> _mockParkVisits;
        private readonly Mock<ILocationsRepository> _mockLocations;
        private readonly Mock<IUserRepository> _mockUsers;

        private readonly ActivityService _activities;

        public ActivityServiceTests()
        {
            // Initialize mocked repositories.
            _mockCompletedBucketList = new();
            _mockCollectedStamps = new();
            _mockPrivateNotes = new();
            _mockParkVisits = new();
            _mockLocations = new();
            _mockUsers = new();

            // Setup activity mocks.
            SetupActivity0();
            SetupActivity1();
            SetupActivity2();

            // Setup location mocks.
            _mockLocations.Setup(s => s.GetByAbbreviation("CABE"))
                .Returns(TestData.Parks[0]);
            _mockLocations.Setup(s => s.GetByAbbreviation("EBII"))
                .Returns(TestData.Parks[1]);

            // Initialize ActivityService.
            _activities = new(
                _mockCompletedBucketList.Object,
                _mockCollectedStamps.Object,
                _mockPrivateNotes.Object,
                _mockParkVisits.Object,
                _mockLocations.Object,
                _mockUsers.Object);
        }

        [Fact]
        public void GetParkActivity_ReturnsParkActivity_IDsValidActivitiesExist()
        {   
            // Action
            var result = _activities.GetParkActivity(TestData.Parks[0].id, TestData.Users[1].id);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(TestData.BucketList[0].id, result.CompletedBucketListItems[0].Id);
            Assert.Equal(TestData.ParkVisits[1].createdAt, result.LastVisited);
            Assert.Equal(10, result.PrivateNote!.Id);
            Assert.Equal(TestData.PrivateNotes[0].note, result.PrivateNote.Note);
            Assert.Null(result.StampCollectedAt);
        }

        [Fact]
        public void GetParkActivity_ReturnsEmptyParkActivity_IDsValidActivitiesNonexistent()
        {   
            // Action
            var result = _activities.GetParkActivity(TestData.Parks[0].id, TestData.Users[0].id);

            // Assert
            Assert.NotNull(result);
            Assert.Empty(result.CompletedBucketListItems);
            Assert.Null(result.LastVisited);
            Assert.Null(result.PrivateNote);
            Assert.Null(result.StampCollectedAt);
        }

        [Fact]
        public void CollectStamp_ReturnsCollectedStamp_WhenStampCollectedByLocation_AndStampNotCollected()
        {
            // Setup with expected result.
            var stamp = new CollectedStamp()
            {
                location = new(34.04919197876853, -77.90944281388691),
                method = StampCollectionMethod.location,
                user = TestData.Users[1],
                park = TestData.Parks[0],
                createdAt = DateTime.UtcNow
            };

            var expected = new CollectedStamp()
            {
                location = stamp.location,
                method = stamp.method,
                userId = stamp.user.id,
                user = stamp.user,
                parkId = stamp.park.id,
                park = stamp.park,
                createdAt = stamp.createdAt,
                updatedAt = stamp.createdAt
            };

            _mockCollectedStamps.Setup(s => s.Create(It.IsAny<CollectedStamp>()))
                .Returns(expected);

            // Action.
            var result = _activities.CollectStamp(
                TestData.Parks[0].parkAbbreviation,
                stamp.location.X, stamp.location.Y, 0.005,
                stamp.method.GetDisplayName(),
                stamp.createdAt,
                stamp.userId);

            // Assert.
            Assert.Equal(expected, result);
        }

        [Fact]
        public void CollectStamp_ReturnsCollectedStamp_WhenStampCollectedManually_AndStampNotCollected()
        {
            // Setup with expected result.
            var stamp = new CollectedStamp()
            {
                location = new(35.77267838903396, -78.67343795255313),
                method = StampCollectionMethod.manual,
                user = TestData.Users[0],
                park = TestData.Parks[1]
            };

            var expected = new CollectedStamp()
            {
                location = stamp.location,
                method = stamp.method,
                userId = stamp.user.id,
                user = stamp.user,
                parkId = stamp.park.id,
                park = stamp.park,
                createdAt = DateTime.UtcNow,
                updatedAt = DateTime.UtcNow
            };

            _mockCollectedStamps.Setup(s => s.Create(It.IsAny<CollectedStamp>()))
                .Returns(expected);

            // Action.
            var result = _activities.CollectStamp(
                TestData.Parks[1].parkAbbreviation,
                stamp.location.X, stamp.location.Y, 0.005,
                stamp.method.GetDisplayName(),
                null,
                stamp.userId);

            // Assert.
            Assert.Equal(expected, result);
        }

        [Fact]
        public void CollectStamp_ThrowsServiceException_WhenInvalidCollectionMethod()
        {
            var e = Assert.Throws<ServiceException>(() => _activities.CollectStamp(
                TestData.Parks[1].parkAbbreviation,
                35.77267838903396, -78.67343795255313, 0.005,
                "invalid", null,
                TestData.Users[2].id));

            Assert.Equal(StatusCodes.Status412PreconditionFailed, e.StatusCode);
            Assert.Equal("Stamp collection method is not valid.", e.ErrorMessage);
        }

        [Fact]
        public void CollectStamp_ThrowsServiceException_WhenAlreadyCollected()
        {
            var e = Assert.Throws<ServiceException>(() => _activities.CollectStamp(
                TestData.Parks[1].parkAbbreviation,
                35.77267838903396, -78.67343795255313, 0.005,
                StampCollectionMethod.location.GetDisplayName(), null,
                TestData.Users[3].id));

            Assert.Equal(StatusCodes.Status409Conflict, e.StatusCode);
            Assert.Equal("Stamp already collected for this park.", e.ErrorMessage);
        }

        [Fact]
        public void CollectStamp_ThrowsServiceException_WhenInvalidLocation()
        {
            var e = Assert.Throws<ServiceException>(() => _activities.CollectStamp(
                TestData.Parks[0].parkAbbreviation,
                35.77267838903396, -78.67343795255313, 0.005,
                StampCollectionMethod.location.GetDisplayName(), null,
                TestData.Users[0].id));

            Assert.Equal(StatusCodes.Status405MethodNotAllowed, e.StatusCode);
            Assert.Equal("Your location doesn't appear to be at the specified park.", e.ErrorMessage);
        }

        // Setup User 1, Park 0 - Bucket list, no stamps, private notes, last visit
        private void SetupActivity0()
        {
            // get data formatted correctly
            List<ParkVisit> visited =
            [
                TestData.ParkVisits[0],
                TestData.ParkVisits[1]
            ];

            // setup mocked functions
            SetupActivity(0, 1,
                [TestData.CompletedBucketListItems[1]],
                null,
                TestData.PrivateNotes[0],
                [.. visited.OrderByDescending(v => v.createdAt)]);
        }

        // Setup User 0, Park 0 - no data
        private void SetupActivity1()
        {
            SetupActivity(0, 0, [], null, null, []);
        }

        // Setup User 3, Park 1 - Bucket list, stamp collected, no private notes, last visit.
        private void SetupActivity2()
        {
            SetupActivity(1, 3,
                [TestData.CompletedBucketListItems[2]],
                TestData.CollectedStamps[1],
                null,
                [TestData.ParkVisits[3]]);
        }

        // Helper for setting up activities.
        private void SetupActivity(int parkId, int userId,
            List<CompletedBucketListItem> completedBucketListItems,
            CollectedStamp? collectedStamp,
            PrivateNote? privateNote,
            List<ParkVisit> parkVisits)
        {
            _mockCompletedBucketList.Setup(s => s.GetByParkAndUser(TestData.Parks[parkId].id, TestData.Users[userId].id))
                .Returns(completedBucketListItems);
            _mockCollectedStamps.Setup(s => s.GetByParkAndUser(TestData.Parks[parkId].id, TestData.Users[userId].id))
                .Returns(collectedStamp);
            _mockPrivateNotes.Setup(s => s.GetByParkAndUser(TestData.Parks[parkId].id, TestData.Users[userId].id))
                .Returns(privateNote);
            _mockParkVisits.Setup(s => s.GetByParkAndUser(TestData.Parks[parkId].id, TestData.Users[userId].id))
                .Returns(parkVisits);
        }
    }
}