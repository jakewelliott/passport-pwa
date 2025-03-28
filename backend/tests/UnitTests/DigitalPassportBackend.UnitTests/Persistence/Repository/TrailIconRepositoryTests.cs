using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.UnitTests.TestUtils;

using Microsoft.EntityFrameworkCore;

namespace DigitalPassportBackend.UnitTests.Persistence.Repository;
public class TrailIconRepositoryTests
{
    private readonly DigitalPassportDbContext _db;

    private readonly TrailIconRepository _repo;

    public TrailIconRepositoryTests()
    {
        // Initialize the testing DB.
        var options = new DbContextOptionsBuilder<DigitalPassportDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
            _db = new(options, TestConfiguration.GetConfiguration());

        // Populate the testing DB.
        _db.TrailIcons.AddRange(TestData.TrailIcons);
        _db.Trails.AddRange(TestData.Trails);
        _db.SaveChanges();

        // Initialize the repository.
        _repo = new(_db);
    }

    [Fact]
    public void GetById_ReturnsTrailIcon_WhenTrailIconExists()
    {
        // Action.
        var item = _repo.GetById(TestData.TrailIcons[1].id);

        // Assert.
        Assert.Equal(TestData.TrailIcons[1], item);
    }

    [Fact]
    public void GetById_ThrowsNotFoundException_WhenTrailIconDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.GetById(5));
    }

    [Fact]
    public void Delete_ReturnsDeletedTrailIcon_WhenTrailIconExists()
    {
        // Action.
        var item = _repo.Delete(TestData.TrailIcons[2].id);

        // Assert.
        Assert.Equal(TestData.TrailIcons[2], item);
        Assert.Equal(3, _db.TrailIcons.Count());
        Assert.DoesNotContain(TestData.TrailIcons[2], _db.TrailIcons);
    }

    [Fact]
    public void Delete_ThrowsNotFoundException_WhenTrailIconDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.Delete(5));
        Assert.Equal(4, _db.TrailIcons.Count());
    }

    [Fact]
    public void Update_ReturnsExistinguser_WhenTrailIconExists()
    {
        // Prepare updated park.
        var newTrailIcon = TestData.TrailIcons[1];
        newTrailIcon.icon = TrailIconName.Camping;

        // Action.
        var oldTrailIcon = _repo.Update(newTrailIcon);

        // Assert.
        Assert.Equal(4, _db.TrailIcons.Count());
        Assert.Equal(TestData.TrailIcons[1], oldTrailIcon);
        Assert.Contains(newTrailIcon, _db.TrailIcons);
    }

    [Fact]
    public void Update_ThrowsNotFoundException_WhenTrailIconDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.Update(NewTrailIcon));
        Assert.Equal(4, _db.TrailIcons.Count());
    }

    [Fact]
    public void Count_ReturnsNumberOfTrailIcons()
    {
        // Action and assert.
        Assert.Equal(4, _repo.Count());
    }

    [Fact]
    public void Create_ReturnsNewTrailIcon_IfTrailIconDNE()
    {
        // Action.
        var item = _repo.Create(NewTrailIcon);

        // Assert.
        Assert.Equal(5, _db.TrailIcons.Count());
        Assert.Equal(NewTrailIcon, item);
        Assert.Contains(NewTrailIcon, _db.TrailIcons);
    }

    [Fact]
    public void GetByTrailId_ReturnsTrailIcon_WhenTrailExists()
    {
        // Action.
        var item = _repo.GetByTrailId(TestData.Trails[1].id);

        // Assert.
        Assert.Single(item);
        Assert.Equal(TestData.TrailIcons[1], item[0]);
    }

    [Fact]
    public void GetByTrailId_ReturnsEmptyList_WhenTrailDNE()
    {
        // Action.
        var item = _repo.GetByTrailId(-1);

        // Assert.
        Assert.Equal(new List<TrailIcon>(), item);
    }

    private static readonly TrailIcon NewTrailIcon = new()
    {
        id = 100,
        icon = TrailIconName.TRACKTrail,
        trail = TestData.Trails[0],
    };
}