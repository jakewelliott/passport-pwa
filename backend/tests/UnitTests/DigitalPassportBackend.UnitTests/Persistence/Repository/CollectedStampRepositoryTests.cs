using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.UnitTests.TestUtils;

using Microsoft.EntityFrameworkCore;

namespace DigitalPassportBackend.UnitTests.Persistence.Repository;
public class CollectedStampRepositoryTests
{
    private readonly DigitalPassportDbContext _db;

    private readonly CollectedStampRepository _repo;

    public CollectedStampRepositoryTests()
    {
        // Initialize the testing DB.
        var options = new DbContextOptionsBuilder<DigitalPassportDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        _db = new(options, TestConfiguration.GetConfiguration());

        // Populate the testing DB.
        _db.CollectedStamps.AddRange(TestData.CollectedStamps);
        _db.SaveChanges();

        // Initialize the repository.
        _repo = new(_db);
    }

    [Fact]
    public void GetById_ReturnsStamp_WhenStampExists()
    {
        // Action.
        var item = _repo.GetById(TestData.CollectedStamps[1].id);

        // Assert.
        Assert.Equal(TestData.CollectedStamps[1], item);
    }

    [Fact]
    public void GetById_ThrowsNotFoundException_WhenStampDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.GetById(5));
    }

    [Fact]
    public void Delete_ReturnsDeletedStamp_WhenStampExists()
    {
        // Action.
        var item = _repo.Delete(TestData.CollectedStamps[0].id);

        // Assert.
        Assert.Equal(TestData.CollectedStamps[0], item);
        Assert.Equal(1, _db.CollectedStamps.Count());
        Assert.DoesNotContain(TestData.CollectedStamps[0], _db.CollectedStamps);
    }

    [Fact]
    public void Delete_ThrowsNotFoundException_WhenStampDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.Delete(5));
    }

    [Fact]
    public void Update_ReturnsExistingStamp_WhenStampExists()
    {
        // Prepare updated bucket list item.
        var newItem = TestData.CollectedStamps[0];
        newItem.method = StampCollectionMethod.manual;

        // Action.
        var oldItem = _repo.Update(newItem);

        // Assert.
        Assert.Equal(2, _db.CollectedStamps.Count());
        Assert.Equal(TestData.CollectedStamps[0], oldItem);
        Assert.Contains(newItem, _db.CollectedStamps);
    }

    [Fact]
    public void Update_ThrowsNotFoundException_WhenStampDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.Update(NewStamp));
        Assert.Equal(2, _db.CollectedStamps.Count());
    }

    [Fact]
    public void Count_ReturnsNumberOfStamps()
    {
        Assert.Equal(2, _repo.Count());
    }

    [Fact]
    public void Create_ReturnsNewStamp_IfStampDNE()
    {
        // Action.
        var item = _repo.Create(NewStamp);

        // Assert.
        Assert.Equal(3, _db.CollectedStamps.Count());
        Assert.Equal(NewStamp, item);
        Assert.Contains(NewStamp, _db.CollectedStamps);
    }

    [Fact]
    public void GetByParkAndUser_ReturnStamp_ValidIDsExistingStamp()
    {
        // Arrange
        var userId = TestData.CollectedStamps[0].userId;
        var locationId = TestData.CollectedStamps[0].parkId;

        // Act
        var result = _repo.GetByParkAndUser(locationId, userId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(locationId, result.parkId);
        Assert.Equal(userId, result.userId);
        Assert.Equal(TestData.CollectedStamps[0].id, result.id);
        Assert.Equal(TestData.CollectedStamps[0].method, result.method);
        Assert.Equal(TestData.CollectedStamps[0].location, result.location);
        Assert.Equal(TestData.CollectedStamps[0].createdAt, result.createdAt);
        Assert.Equal(TestData.CollectedStamps[0].updatedAt, result.updatedAt);
        Assert.Equal(TestData.CollectedStamps[0].user, result.user);
        Assert.Equal(TestData.CollectedStamps[0].park, result.park);
    }

    [Fact]
    public void GetByParkAndUser_ReturnNull_ValidIDsNonexistingStamp()
    {
        // Arrange
        var userId = TestData.Users[2].id;
        var locationId = TestData.Parks[1].id;

        // Act
        var result = _repo.GetByParkAndUser(locationId, userId);

        // Assert
        Assert.Null(result);
    }

        [Fact]
    public void GetByParkAndUser_ReturnNull_InvalidIDsNonexistingStamp()
    {
        // Arrange
        var userId = -1;
        var locationId = -1;

        // Act
        var result = _repo.GetByParkAndUser(locationId, userId);

        // Assert
        Assert.Null(result);
    }

    private static readonly CollectedStamp NewStamp = new()
    {
        method = StampCollectionMethod.location,
        location = new(34.0460, -77.9138),
        user = TestData.Users[1],
        park = TestData.Parks[0]
    };
}
