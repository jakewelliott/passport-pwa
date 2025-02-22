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
    public void UpdateThrowsNotFoundException_WhenParkVisitDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.Update(NewVisit));
        Assert.Equal(4, _db.ParkVisits.Count());
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
        var item = _repo.Create(NewVisit);

        // Assert.
        Assert.Equal(5, _db.ParkVisits.Count());
        Assert.Equal(NewVisit, item);
        Assert.Contains(NewVisit, _db.ParkVisits);
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

    private static readonly ParkVisit NewVisit = new()
    {
        park = TestData.Parks[1],
        user = TestData.Users[3]
    };
}