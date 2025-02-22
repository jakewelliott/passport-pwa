using Moq;
using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Xunit;

using DigitalPassportBackend.Controllers;
using DigitalPassportBackend.Services;
using DigitalPassportBackend.Domain;
using static DigitalPassportBackend.Controllers.ActivityController;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.UnitTests.TestUtils;
using DigitalPassportBackend.UnitTests.Persistence.Repository;

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
        }

        [Fact]
        public void Get_ReturnsOkResult_VisitorUserValidLocation()
        {
            // Arrange
            SetupUser(TestData.Users[1].id,"visitor");

            List<CompletedBucketListItem> bucketListItems = new List<CompletedBucketListItem>();
            bucketListItems.Add(TestData.CompletedBucketListItems[1]);

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
    }
}