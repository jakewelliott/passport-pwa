using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.UnitTests.TestUtils;

using Microsoft.EntityFrameworkCore;

namespace DigitalPassportBackend.UnitTests.Persistence.Repository;
public class TrailRepositoryTests
{
    private readonly DigitalPassportDbContext _db;

    private readonly TrailRepository _repo;

    public TrailRepositoryTests()
    {
        // Initialize the testing DB.
        var options = new DbContextOptionsBuilder<DigitalPassportDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
            _db = new(options, TestConfiguration.GetConfiguration());

        // Populate the testing DB.
        _db.Trails.AddRange(TestData.Trails);
        _db.SaveChanges();

        // Initialize the repository.
        _repo = new(_db);
    }

    [Fact]
    public void GetById_ReturnsTrail_WhenTrailExists()
    {
        // Action.
        var item = _repo.GetById(TestData.Trails[1].id);

        // Assert.
        Assert.Equal(TestData.Trails[1], item);
    }

    [Fact]
    public void GetById_ThrowsNotFoundException_WhenTrailDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.GetById(5));
    }

    [Fact]
    public void Delete_ReturnsDeletedTrail_WhenTrailExists()
    {
        // Action.
        var item = _repo.Delete(TestData.Trails[2].id);

        // Assert.
        Assert.Equal(TestData.Trails[2], item);
        Assert.Equal(3, _db.Trails.Count());
        Assert.DoesNotContain(TestData.Trails[2], _db.Trails);
    }

    [Fact]
    public void Delete_ThrowsNotFoundException_WhenTrailDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.Delete(5));
        Assert.Equal(4, _db.Trails.Count());
    }

    [Fact]
    public void Update_ReturnsExistinguser_WhenTrailExists()
    {
        // Prepare updated park.
        var newTrail = TestData.Trails[1];
        newTrail.trailName = "new trail name";

        // Action.
        var oldTrail = _repo.Update(newTrail);

        // Assert.
        Assert.Equal(4, _db.Trails.Count());
        Assert.Equal(TestData.Trails[1], oldTrail);
        Assert.Contains(newTrail, _db.Trails);
    }

    [Fact]
    public void Update_ThrowsNotFoundException_WhenTrailDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.Update(NewTrail));
        Assert.Equal(4, _db.Trails.Count());
    }

    [Fact]
    public void Count_ReturnsNumberOfTrails()
    {
        // Action and assert.
        Assert.Equal(4, _repo.Count());
    }

    [Fact]
    public void Create_ReturnsNewTrail_IfTrailDNE()
    {
        // Action.
        var item = _repo.Create(NewTrail);

        // Assert.
        Assert.Equal(5, _db.Trails.Count());
        Assert.Equal(NewTrail, item);
        Assert.Contains(NewTrail, _db.Trails);
    }

    private static readonly Trail NewTrail = new()
    {
        id = 100,
        trailName = "trail name 100",
        distance = "trail length 100",
        description = "trail description 100",
    };
}