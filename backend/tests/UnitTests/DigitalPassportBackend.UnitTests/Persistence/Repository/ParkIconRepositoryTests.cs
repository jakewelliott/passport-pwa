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
        _db = new(options);

        // Populate the testing DB.
        _db.ParkIcons.AddRange(RepositoryTestData.ParkIcons);
        _db.SaveChanges();

        // Initialize the repository.
        _repo = new(_db);
    }

    [Fact]
    public void GetByLocationId_ReturnsPopulatedList_WhenLocationExists_AndHasIcons()
    {
        // Action.
        var items = _repo.GetByLocationId(RepositoryTestData.Parks[0].id);

        // Assert.
        Assert.True(items.Count == 2);
        Assert.Contains(items, i => i == RepositoryTestData.ParkIcons[0]);
        Assert.Contains(items, i => i == RepositoryTestData.ParkIcons[1]);
    }

    [Fact]
    public void GetByLocationId_ReturnsEmptyList_WhenLocationExists_AndHasNoIcons()
    {
        // Action.
        var items = _repo.GetByLocationId(RepositoryTestData.Parks[1].id);

        // Assert.
        Assert.False(items.Any());
    }

    [Fact]
    public void GetByLocationId_ReturnsEmptyList_WhenLocationDNE()
    {
        // Action.
        var items = _repo.GetByLocationId(84);

        // Assert.
        Assert.False(items.Any());
    }
}