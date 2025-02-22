using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.Services;
using DigitalPassportBackend.UnitTests.TestUtils;
using DigitalPassportBackend.Domain;

using Moq;

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
            // Initialize mocked repositories
            _mockCompletedBucketList = new();
            _mockCollectedStamps = new();
            _mockPrivateNotes = new();
            _mockParkVisits = new();
            _mockLocations = new();
            _mockUsers = new();

            // Setup activity mocks
            SetupActivity0();
            SetupActivity1();
            SetupActivity2();

            // Initialize ActivityService
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