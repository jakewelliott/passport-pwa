using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.UnitTests.TestUtils;

using Microsoft.EntityFrameworkCore;

namespace DigitalPassportBackend.UnitTests.Persistence.Repository;
public class ParkVisitRepositoryTests
{
    private readonly DigitalPassportDbContext _db;

    private readonly ParkVisitRepository _repo;

    public ParkVisitRepositoryTests()
    {
        // Initialize the testing DB.
        var options = new DbContextOptionsBuilder<DigitalPassportDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        _db = new(options, TestConfiguration.GetConfiguration());

        // Populate the testing DB.
        _db.ParkVisits.AddRange(TestData.ParkVisits);
        _db.SaveChanges();

        // Initialize the repository.
        _repo = new(_db);
    }

    [Fact]
    public void GetById_ReturnsParkVisit_WhenParkVisitExists()
    {
        // Action.
        var item = _repo.GetById(TestData.ParkVisits[0].id);

        // Assert.
        Assert.Equal(TestData.ParkVisits[0], item);
    }

    [Fact]
    public void GetById_ThrowsNotFoundException_WhenParkVisitDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.GetById(5));
    }

    [Fact]
    public void Delete_ReturnsDeletedParkVisit_WhenParkVisitExists()
    {
        // Action.
        var item = _repo.Delete(TestData.ParkVisits[2].id);
        
        // Assert.
        Assert.Equal(TestData.ParkVisits[2], item);
        Assert.Equal(3, _db.ParkVisits.Count());
        Assert.DoesNotContain(TestData.ParkVisits[2], _db.ParkVisits);
    }

    [Fact]
    public void Delete_ThrowsNotFoundException_WhenParkVisitDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.Delete(5));
    }

    [Fact]
    public void Update_ReturnsExistingParkVisit_WhenParkVisitExists()
    {
        // Prepare updated icon.
        var newVisit = TestData.ParkVisits[0];
        newVisit.updatedAt = DateTime.UtcNow;

        // Action.
        var oldVisit = _repo.Update(newVisit);

        // Assert.
        Assert.Equal(4, _db.ParkVisits.Count());
        Assert.Equal(TestData.ParkVisits[0], oldVisit);
        Assert.Contains(newVisit, _db.ParkVisits);
    }

    [Fact]
    public void Count_ReturnsNumberOfParkVisits()
    {
        // Action and assert.
        Assert.Equal(4, _repo.Count());
    }

    [Fact]
    public void Create_ReturnsNewParkVisit_IfParkVisitDNE()
    {
        // Action.
        ParkVisit newVisit = new ParkVisit()
        {
            id = 20,
            location = new(-77.91170363932008, 34.049634772933764),
            createdAt = DateTime.UtcNow - new TimeSpan(4, 0, 0, 0),
            updatedAt = DateTime.UtcNow - new TimeSpan(4, 0, 0, 0),
            parkId = TestData.Parks[0].id,
            park = TestData.Parks[0],
            userId = TestData.Users[1].id,
            user = TestData.Users[1]
        };

        var item = _repo.Create(newVisit);

        // Assert.
        Assert.Equal(5, _db.ParkVisits.Count());
        Assert.Equal(newVisit, item);
        Assert.Contains(newVisit, _db.ParkVisits);
    }

    [Fact]
    public void GetByParkAndUser_ReturnsItems_VisitExists()
    {
        // Arrange
        var locationId = TestData.ParkVisits[2].parkId;
        var userId = TestData.ParkVisits[2].userId;

        var locationId2 = TestData.ParkVisits[0].parkId;
        var userId2 = TestData.ParkVisits[0].userId;

        // Act
        var result = _repo.GetByParkAndUser(locationId, userId);
        var result2 = _repo.GetByParkAndUser(locationId2, userId2);

        // Assert
        Assert.Single(result);
        Assert.Equal(2, result2.Count);

        Assert.Equal(locationId, result[0].parkId);
        Assert.Equal(userId, result[0].userId);
        Assert.Equal(TestData.ParkVisits[2], result[0]);

        Assert.Equal(locationId2, result2[0].parkId);
        Assert.Equal(userId2, result2[0].userId);
        Assert.Equal(locationId2, result2[1].parkId);
        Assert.Equal(userId2, result2[1].userId);

        Assert.Equal(TestData.ParkVisits[0], result2[1]);
        Assert.Equal(TestData.ParkVisits[1], result2[0]);
    }

        [Fact]
    public void GetByParkAndUser_ReturnsEmpty_VisitNonexistent()
    {
        // Arrange
        var locationId = TestData.Users[3].id;
        var userId = TestData.Parks[1].id;

        // Act
        var result = _repo.GetByParkAndUser(locationId, userId);

        // Assert
        Assert.Empty(result);
    }

    [Fact]
    public void GetByParkAndUser_ReturnsEmpty_InvalidIDsVisitNonexistent()
    {
        // Arrange
        var invalidLocationId = -1;
        var invalidUserId = -1;

        var locationId = TestData.ParkVisits[0].parkId;
        var userId = TestData.ParkVisits[0].userId;

        // Act
        var result0 = _repo.GetByParkAndUser(invalidLocationId, userId);
        var result1 = _repo.GetByParkAndUser(locationId, invalidUserId);
        var result2 = _repo.GetByParkAndUser(invalidLocationId, invalidUserId);

        // Assert
        Assert.Empty(result0);
        Assert.Empty(result1);
        Assert.Empty(result2);
    }

    [Fact]
    public void GetAllByUser_ReturnsItems_VisitExists()
    {
        // Arrange
        var locationId = TestData.ParkVisits[2].parkId;
        var userId = TestData.ParkVisits[2].userId;

        var locationId2 = TestData.ParkVisits[0].parkId;
        var userId2 = TestData.ParkVisits[0].userId;

        // Act
        var result = _repo.GetAllByUser(userId);
        var result2 = _repo.GetAllByUser(userId2);

        // Assert
        Assert.Single(result);
        Assert.Equal(2, result2.Count);

        Assert.Equal(locationId, result[0].parkId);
        Assert.Equal(userId, result[0].userId);
        Assert.Equal(TestData.ParkVisits[2], result[0]);

        Assert.Equal(locationId2, result2[0].parkId);
        Assert.Equal(userId2, result2[0].userId);
        Assert.Equal(locationId2, result2[1].parkId);
        Assert.Equal(userId2, result2[1].userId);

        Assert.Equal(TestData.ParkVisits[0], result2[1]);
        Assert.Equal(TestData.ParkVisits[1], result2[0]);
    }

    [Fact]
    public void GetAllByUser_ReturnsEmpty_VisitNonexistent()
    {
        // Arrange
        var userId = TestData.Users[0].id;

        // Act
        var result = _repo.GetAllByUser(userId);

        // Assert
        Assert.Empty(result);
    }

    [Fact]
    public void GetParkVisitToday_ReturnsParkVisit_VisitedToday()
    {
        // Arrange
        var newVisit = new ParkVisit()
        {
            id = 13,
            location = new(-78.67421773821357, 35.772011241494404),
            createdAt = DateTime.Now,
            updatedAt = DateTime.Now,
            parkId = TestData.Parks[0].id,
            park = TestData.Parks[0],
            userId = TestData.Users[3].id,
            user = TestData.Users[3]
        };

        // Act
        var result = _repo.GetParkVisitToday(newVisit.userId, newVisit.parkId);

        // Assert
        //Assert.Equal(newVisit, result);
    }

    [Fact]
    public void GetParkVisitToday_ReturnsNull_VisitedAnotherParkToday()
    {
        // Arrange
        var locationId = TestData.ParkVisits[3].parkId;
        var userId = TestData.ParkVisits[0].userId;

        // Act
        var result = _repo.GetParkVisitToday(userId, locationId);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public void GetParkVisitToday_ReturnsNull_NotVisitedParkTodayButDidYesterday()
    {
        // Arrange
        var yesterdayVisit = _repo.GetById(TestData.ParkVisits[0].id);
        var originalTime = yesterdayVisit.createdAt;
        yesterdayVisit.createdAt = originalTime - new TimeSpan(1, 0, 0, 0);
        _repo.Update(yesterdayVisit);
        var locationId = yesterdayVisit.parkId;
        var userId = yesterdayVisit.userId;

        // Act
        var result = _repo.GetParkVisitToday(userId, locationId);

        // Assert
        Assert.Null(result);

        // Reset
        yesterdayVisit.createdAt = originalTime;
        _repo.Update(yesterdayVisit);
    }

    [Fact]
    public void GetParkVisitToday_ReturnsNull_NeverVsitedPark()
    {
        // Arrange
        var locationId = TestData.ParkVisits[0].parkId;
        var userId = TestData.ParkVisits[3].userId;

        // Act
        var result = _repo.GetParkVisitToday(userId, locationId);

        // Assert
        Assert.Null(result);
    }

}