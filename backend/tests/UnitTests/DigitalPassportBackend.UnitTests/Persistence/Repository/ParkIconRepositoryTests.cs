using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.UnitTests.TestUtils;

using Microsoft.EntityFrameworkCore;

namespace DigitalPassportBackend.UnitTests.Persistence.Repository;
public class ParkIconRepositoryTests
{
    private readonly DigitalPassportDbContext _db;

    private readonly ParkIconRepository _repo;

    public ParkIconRepositoryTests()
    {
        // Initialize the testing DB.
        var options = new DbContextOptionsBuilder<DigitalPassportDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        _db = new(options, TestConfiguration.GetConfiguration());

        // Populate the testing DB.
        _db.ParkIcons.AddRange(TestData.ParkIcons);
        _db.SaveChanges();

        // Initialize the repository.
        _repo = new(_db);
    }

    [Fact]
    public void GetByLocationId_ReturnsPopulatedList_WhenLocationExists_AndHasIcons()
    {
        // Action.
        var items = _repo.GetByLocationId(TestData.Parks[0].id);

        // Assert.
        Assert.Equal(2, items.Count);
        Assert.Contains(TestData.ParkIcons[0], items);
        Assert.Contains(TestData.ParkIcons[1], items);
    }

    [Fact]
    public void GetByLocationId_ReturnsEmptyList_WhenLocationExists_AndHasNoIcons()
    {
        // Action.
        var items = _repo.GetByLocationId(TestData.Parks[1].id);

        // Assert.
        Assert.Empty(items);
    }

    [Fact]
    public void GetByLocationId_ReturnsEmptyList_WhenLocationDNE()
    {
        // Action.
        var items = _repo.GetByLocationId(84);

        // Assert.
        Assert.Empty(items);
    }

    [Fact]
    public void GetById_ReturnsParkIcon_WhenParkIconExists()
    {
        // Action.
        var item = _repo.GetById(TestData.ParkIcons[0].id);

        // Assert.
        Assert.Equal(TestData.ParkIcons[0], item);
    }

    [Fact]
    public void GetById_ThrowsNotFoundException_WhenParkIconDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.GetById(5));
    }

    [Fact]
    public void Delete_ReturnsDeletedParkIcon_WhenParkIconExists()
    {
        // Action.
        var item = _repo.Delete(TestData.ParkIcons[0].id);
        
        // Assert.
        Assert.Equal(TestData.ParkIcons[0], item);
        Assert.Equal(1, _db.ParkIcons.Count());
        Assert.DoesNotContain(TestData.ParkIcons[0], _db.ParkIcons);
    }

    [Fact]
    public void Delete_ThrowsNotFoundException_WhenParkIconDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.Delete(5));
    }

    [Fact]
    public void Update_ReturnsExistingItem_WhenParkIconExists()
    {
        // Prepare updated icon.
        var newIcon = TestData.ParkIcons[0];
        newIcon.icon = ParkIconNames.VisitorCenter_Blue;

        // Action.
        var oldIcon = _repo.Update(newIcon);

        // Assert.
        Assert.Equal(2, _db.ParkIcons.Count());
        Assert.Equal(TestData.ParkIcons[0], oldIcon);
        Assert.Contains(newIcon, _db.ParkIcons);
    }

    [Fact]
    public void UpdateThrowsNotFoundException_WhenParkIconDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.Update(NewIcon));
        Assert.Equal(2, _db.ParkIcons.Count());
    }

    [Fact]
    public void Count_ReturnsNumberOfParkIcons()
    {
        // Action and assert.
        Assert.Equal(2, _repo.Count());
    }

    [Fact]
    public void Create_ReturnsNewParkIcon_IfParkIconDNE()
    {
        // Action.
        var item = _repo.Create(NewIcon);

        // Assert.
        Assert.Equal(3, _db.ParkIcons.Count());
        Assert.Equal(NewIcon, item);
        Assert.Contains(NewIcon, _db.ParkIcons);
    }

    private static readonly ParkIcon NewIcon = new()
    {
        icon = ParkIconNames.BoatRamp_Blue,
        park = TestData.Parks[0]
    };
}