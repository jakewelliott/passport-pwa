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

        private readonly IActivityService _activities;

        public ActivityServiceTests()
        {
            // Initialize mocked repositories
            _mockCompletedBucketList = new();
            _mockCollectedStamps = new();
            _mockPrivateNotes = new();
            _mockParkVisits = new();

            // Setup activity mocks
            SetupActivity0();
            SetupActivity1();

            // Initialize ActivityService
            _activities = new ActivityService(
                _mockCompletedBucketList.Object,
                _mockCollectedStamps.Object,
                _mockPrivateNotes.Object,
                _mockParkVisits.Object);
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
            Assert.Equal(10, result.PrivateNote.Id);
            Assert.Equal("this is a note. it has stuff in it.", result.PrivateNote.Note);
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

        // Setup User 1, Park 0 - Bucket list, no stamps, private notes, last visit
        private void SetupActivity0()
        {
            // get data formatted correctly
            List<CompletedBucketListItem> bucketList = new List<CompletedBucketListItem>();
            bucketList.Add(TestData.CompletedBucketListItems[1]);

            List<ParkVisit> visited = new List<ParkVisit>();
            visited.Add(TestData.ParkVisits[0]);
            visited.Add(TestData.ParkVisits[1]);

            // setup mocked functions
            _mockCompletedBucketList.Setup(s => s.GetByParkAndUser(TestData.Parks[0].id, TestData.Users[1].id))
                .Returns(bucketList);

            _mockCollectedStamps.Setup(s => s.GetByParkAndUser(TestData.Parks[0].id, TestData.Users[1].id))
                .Returns((CollectedStamp)null);

            _mockPrivateNotes.Setup(s => s.GetByParkAndUser(TestData.Parks[0].id, TestData.Users[1].id))
                .Returns(TestData.PrivateNotes[0]);

            _mockParkVisits.Setup(s => s.GetByParkAndUser(TestData.Parks[0].id, TestData.Users[1].id))
                .Returns(visited.OrderByDescending(v => v.createdAt).ToList());
        }

        // Setup User 0, Park 0 - no data
        private void SetupActivity1()
        {
            // get data formatted correctly
            List<CompletedBucketListItem> bucketList = new List<CompletedBucketListItem>();
            List<ParkVisit> visited = new List<ParkVisit>();

            // setup mocked functions
            _mockCompletedBucketList.Setup(s => s.GetByParkAndUser(TestData.Parks[0].id, TestData.Users[0].id))
                .Returns(bucketList);

            _mockCollectedStamps.Setup(s => s.GetByParkAndUser(TestData.Parks[0].id, TestData.Users[0].id))
                .Returns((CollectedStamp)null);

            _mockPrivateNotes.Setup(s => s.GetByParkAndUser(TestData.Parks[0].id, TestData.Users[0].id))
                .Returns((PrivateNote)null);

            _mockParkVisits.Setup(s => s.GetByParkAndUser(TestData.Parks[0].id, TestData.Users[0].id))
                .Returns(visited);
        }
    }
}