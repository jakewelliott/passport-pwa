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
        private readonly Mock<IBucketListItemRepository> _mockBucketList;
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
            _mockBucketList = new();
            _mockCompletedBucketList = new();
            _mockCollectedStamps = new();
            _mockPrivateNotes = new();
            _mockParkVisits = new();
            _mockLocations = new();
            _mockUsers = new();

            var parks = TestData.Parks.Select(p => new Park
            {
                id = p.id,
                parkName = p.parkName,
                parkAbbreviation = p.parkAbbreviation,
                parkType = p.parkType,
                city = p.city,
                coordinates = (NetTopologySuite.Geometries.Point?)p.coordinates?.Copy(),
                boundaries = (NetTopologySuite.Geometries.GeometryCollection?)p.boundaries?.Copy(),
                website = "google.com"
            }).ToList();

            // Setup exception mocks.
            _mockBucketList.Setup(s => s.GetById(It.IsAny<int>()))
                .Throws(new NotFoundException("Bucket List Item not found"));
            _mockUsers.Setup(s => s.GetById(It.IsAny<int>()))
                .Throws(new NotFoundException("user not found"));
            _mockLocations.Setup(s => s.GetByAbbreviation(It.IsAny<string>()))
                .Throws(new NotFoundException("location not found"));
            _mockLocations.Setup(s => s.GetById(It.IsAny<int>()))
                .Throws(new NotFoundException("location not found"));
            _mockLocations.Setup(s => s.GetByAbbreviation("CABE"))
                .Returns(parks[0]);
            _mockLocations.Setup(s => s.GetByAbbreviation("EBII"))
                .Returns(parks[1]);

            // Setup default mocks.
            _mockBucketList.Setup(s => s.GetAll())
                .Returns(TestData.BucketList);
            _mockCompletedBucketList.Setup(s => s.GetByParkAndUser(It.IsAny<int>(), It.IsAny<int>()))
                .Returns([]);
            _mockCompletedBucketList.Setup(s => s.GetByUser(It.IsAny<int>()))
                .Returns([]);
            _mockCollectedStamps.Setup(s => s.GetByParkAndUser(It.IsAny<int>(), It.IsAny<int>()))
                .Returns((CollectedStamp)null!);
            _mockCollectedStamps.Setup(s => s.GetByUser(It.IsAny<int>()))
                .Returns([]);
            _mockPrivateNotes.Setup(s => s.GetByParkAndUser(It.IsAny<int>(), It.IsAny<int>()))
                .Returns((PrivateNote)null!);
            _mockParkVisits.Setup(s => s.GetByParkAndUser(It.IsAny<int>(), It.IsAny<int>()))
                .Returns([]);

            // Setup create/update mocks.
            _mockCompletedBucketList.Setup(s => s.Create(It.IsAny<CompletedBucketListItem>()))
                .Returns<CompletedBucketListItem>(i => i);
            _mockCompletedBucketList.Setup(s => s.Update(It.IsAny<CompletedBucketListItem>()))
                .Returns<CompletedBucketListItem>(i => i);

            // Setup location mocks.
            foreach (var park in TestData.Parks)
            {
                _mockLocations.Setup(s => s.GetById(park.id))
                    .Returns(park);
            }

            // Setup activity mocks.
            SetupActivity0();
            SetupActivity1();
            SetupActivity2();

            // Initialize ActivityService.
            _activities = new(
                _mockBucketList.Object,
                _mockCompletedBucketList.Object,
                _mockCollectedStamps.Object,
                _mockPrivateNotes.Object,
                _mockParkVisits.Object,
                _mockLocations.Object,
                _mockUsers.Object);
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

            try
            {
                // Action.
                var result = _activities.CollectStamp(
                    TestData.Parks[0].parkAbbreviation,
                    stamp.location.X, stamp.location.Y, 0.005,
                    stamp.method.GetDisplayName(),
                    stamp.createdAt,
                    stamp.user.id);

                // Assert.
                Assert.Equal(expected, result);
            }
            catch (ServiceException e)
            {
                var park = TestData.Parks[0];
                throw new Exception($"Test failed. Park boundaries: {park.boundaries}, Test coordinates: ({stamp.location.X}, {stamp.location.Y})", e);
            }
        
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
                stamp.user.id);

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
                TestData.Users[0].id));

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

        [Fact]
        public void CollectStamp_ThrowsNotFoundException_WhenInvalidParkAbbreviation()
        {
            Assert.Throws<NotFoundException>(() => _activities.CollectStamp(
                "INVALID",
                35.77267838903396, -78.67343795255313, 0.005,
                StampCollectionMethod.location.GetDisplayName(), null,
                TestData.Users[0].id));
        }

        [Fact]
        public void CollectStamp_ThrowsNotFoundException_WhenInvalidUser()
        {
            Assert.Throws<NotFoundException>(() => _activities.CollectStamp(
                "manual",
                35.77267838903396, -78.67343795255313, 0.005,
                StampCollectionMethod.location.GetDisplayName(), null,
                9999));
        }

        [Fact]
        public void GetCollectedStamps_ReturnsPopulatedList_WhenValidAndHasStamps()
        {
            var result = _activities.GetCollectedStamps(TestData.Users[3].id);

            Assert.Single(result);
            Assert.Contains(TestData.CollectedStamps[1], result);
        }

        [Fact]
        public void GetCollectedStamps_ReturnsEmptyList_WhenValidAndHasNoStamps()
        {
            var result = _activities.GetCollectedStamps(TestData.Users[0].id);

            Assert.Empty(result);
        }

        [Fact]
        public void GetCollectedStamps_ReturnsEmptyList_WhenInvalidUserId()
        {
            var result = _activities.GetCollectedStamps(9999);

            Assert.Empty(result);
        }

        [Fact]
        public void CreateUpdatePrivateNote_ReturnsNote_WhenNoteDNE()
        {
            // Setup.
            var time = DateTime.UtcNow;
            var expected = new PrivateNote()
            {
                id = 5,
                note = "this is a test note",
                park = TestData.Parks[0],
                parkId = TestData.Parks[0].id,
                user = TestData.Users[3],
                userId = TestData.Users[3].id,
                createdAt = time,
                updatedAt = time
            };
            _mockPrivateNotes.Setup(s => s.Create(It.IsAny<PrivateNote>()))
                .Returns(expected);
            _mockLocations.Setup(s => s.GetById((int)expected.parkId))
                .Returns(expected.park);
            _mockUsers.Setup(s => s.GetById(expected.userId))
                .Returns(expected.user);

            // Action.
            var result = _activities.CreateUpdatePrivateNote((int)expected.parkId, expected.userId, expected.note, time);
            
            // Assert.
            Assert.Equal(expected, result);
        }

        [Fact]
        public void CreateUpdatePrivateNote_ReturnsNote_WhenNoteExists()
        {
            // Setup.
            var time = DateTime.UtcNow;
            var expected = TestData.PrivateNotes[0];
            expected.note = "updated note";
            expected.updatedAt = time;
            _mockLocations.Setup(s => s.GetById((int)expected.parkId!))
                .Returns(expected.park!);
            _mockPrivateNotes.Setup(s => s.GetByParkAndUser(expected.parkId, expected.userId))
                .Returns(TestData.PrivateNotes[0]);
            _mockPrivateNotes.Setup(s => s.Update(expected))
                .Returns(expected);
            
            // Action.
            var result = _activities.CreateUpdatePrivateNote((int)expected.parkId!, expected.userId, expected.note, time);

            // Assert.
            Assert.Equal(expected, result);
        }

        [Fact]
        public void CreateUpdatePrivateNote_ReturnsNote_WhenNoLocation()
        {
            // Setup.
            var time = DateTime.UtcNow;
            var expected = new PrivateNote()
            {
                id = 5,
                note = "this is a test note",
                parkId = 0,
                user = TestData.Users[3],
                userId = TestData.Users[3].id,
                createdAt = time,
                updatedAt = time
            };
            _mockPrivateNotes.Setup(s => s.Create(It.IsAny<PrivateNote>()))
                .Returns(expected);

            // Action.
            var result = _activities.CreateUpdatePrivateNote(0, expected.userId, expected.note, time);

            // Assert.
            Assert.Equal(expected, result);
        }

        [Fact]
        public void GetCompletedBucketListItems_ReturnsPopulatedList_WhenUserExists()
        {
            // Action.
            var result = _activities.GetCompletedBucketListItems(TestData.Users[1].id);

            // Assert.
            Assert.Single(result);
            Assert.Contains(TestData.CompletedBucketListItems[1], result);
        }

        [Fact]
        public void GetCompletedBucketListItems_ReturnsEmptyList_WhenUserDNE()
        {
            // Action.
            var result = _activities.GetCompletedBucketListItems(5);

            // Assert.
            Assert.Empty(result);
        }

        [Fact]
        public void GetBucketListItems_ReturnsPopulatedList()
        {
            // Action.
            var result = _activities.GetBucketListItems();

            // Assert.
            Assert.Equal(TestData.BucketList.Count, result.Count);
            foreach (var item in TestData.BucketList)
            {
                Assert.Contains(item, result);
            }
        }

        [Fact]
        public void ToggleBucketListItemCompletion_ReturnsNewBucketListItem_WhenItemWasCreated()
        {
            // Setup.
            _mockBucketList.Setup(s => s.GetById(TestData.BucketList[0].id))
                .Returns(TestData.BucketList[0]);

            // Action.
            var result = _activities.ToggleBucketListItemCompletion(
                TestData.BucketList[0].id,
                TestData.Users[0].id,
                0, 1);
            
            // Assert.
            Assert.False(result.deleted);
        }

        [Fact]
        public void ToggleBucketListItemCompletion_ReturnsToggledBucketListItem_WhenItemWasDeleted()
        {
            // Action.
            var result = _activities.ToggleBucketListItemCompletion(
                TestData.CompletedBucketListItems[3].bucketListItemId,
                TestData.CompletedBucketListItems[3].userId,
                0, 0);

            // Assert.
            Assert.False(result.deleted);

            // Reset.
            TestData.CompletedBucketListItems[3].deleted = true;
        }

        [Fact]
        public void ToggleBucketListItemCompletion_ThrowsNotFoundException_WhenInvalidBucketListItem()
        {
            // Action and assert.
            Assert.Throws<NotFoundException>(() => 
                _activities.ToggleBucketListItemCompletion(
                    5,
                    TestData.Users[1].id,
                    0, 0));
        }

        // Setup User 1, Park 0 - Bucket list, no stamps, private notes, last visit
        // User 1, Park 1 - deleted bucket list item, no stamps, no private notes, no visits
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
            SetupActivity(1, 1, [TestData.CompletedBucketListItems[3]], null, null, []);
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

        // Helper for mocking CollectedStampRepository.GetByUser(userId)
        private readonly Dictionary<int, List<CollectedStamp>> _stampDict = [];
        
        // Helper for mocking CompletedBucketListItemRepository.GetByUser(userId)
        private readonly Dictionary<int, List<CompletedBucketListItem>> _cbliDict = [];

        // Helper for setting up activities.
        private void SetupActivity(int parkId, int userId,
            List<CompletedBucketListItem> completedBucketListItems,
            CollectedStamp? collectedStamp,
            PrivateNote? privateNote,
            List<ParkVisit> parkVisits)
        {
            if (!_stampDict.ContainsKey(TestData.Users[userId].id))
            {
                _stampDict.Add(TestData.Users[userId].id, []);
            }
            if (collectedStamp is not null)
            {
                _stampDict[TestData.Users[userId].id].Add(collectedStamp);
            }

            if (!_cbliDict.ContainsKey(TestData.Users[userId].id))
            {
                _cbliDict.Add(TestData.Users[userId].id, []);
            }
            foreach (var item in completedBucketListItems)
            {
                _cbliDict[TestData.Users[userId].id].Add(item);

                _mockCompletedBucketList.Setup(s => s.GetByItemAndUser(item.bucketListItemId, item.userId))
                    .Returns(item);
                _mockBucketList.Setup(s => s.GetById(item.bucketListItemId))
                    .Returns(item.bucketListItem!);
            }
            _mockCompletedBucketList.Setup(s => s.GetByUser(TestData.Users[userId].id))
                .Returns(_cbliDict[TestData.Users[userId].id]);

            _mockUsers.Setup(s => s.GetById(TestData.Users[userId].id))
                .Returns(TestData.Users[userId]);
            _mockCompletedBucketList.Setup(s => s.GetByParkAndUser(TestData.Parks[parkId].id, TestData.Users[userId].id))
                .Returns(completedBucketListItems);
            _mockCollectedStamps.Setup(s => s.GetByParkAndUser(TestData.Parks[parkId].id, TestData.Users[userId].id))
                .Returns(collectedStamp);
            _mockCollectedStamps.Setup(s => s.GetByUser(TestData.Users[userId].id))
                .Returns(_stampDict[TestData.Users[userId].id]);
            _mockPrivateNotes.Setup(s => s.GetByParkAndUser(TestData.Parks[parkId].id, TestData.Users[userId].id))
                .Returns(privateNote);
            _mockParkVisits.Setup(s => s.GetByParkAndUser(TestData.Parks[parkId].id, TestData.Users[userId].id))
                .Returns(parkVisits);
        }
    }
}