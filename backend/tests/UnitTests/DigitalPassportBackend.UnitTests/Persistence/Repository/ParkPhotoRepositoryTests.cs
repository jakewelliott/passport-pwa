using DigitalPassportBackend.Persistence.Database;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.UnitTests.TestUtils;

using Microsoft.EntityFrameworkCore;

namespace DigitalPassportBackend.UnitTests.Persistence.Repository;
public class ParkPhotoRepositoryTests
{
    private readonly DigitalPassportDbContext _db;

    private readonly ParkPhotoRepository _repo;

    public ParkPhotoRepositoryTests()
    {
        // Initialize the testing DB.
        var options = new DbContextOptionsBuilder<DigitalPassportDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        _db = new(options);

        // Populate the testing DB.
        _db.ParkPhotos.AddRange(TestData.ParkPhotos);
        _db.SaveChanges();

        // Initialize the repository.
        _repo = new(_db);
    }

    [Fact]
    public void GetByLocationId_ReturnsPopulatedList_WhenLocationExists_AndHasPhotos()
    {
        // Action.
        var items = _repo.GetByLocationId(TestData.Parks[1].id);

        // Assert.
        Assert.True(items.Count == 2);
        Assert.Contains(items, i => i == TestData.ParkPhotos[0]);
        Assert.Contains(items, i => i == TestData.ParkPhotos[1]);
    }

    [Fact]
    public void GetByLocationId_ReturnsEmptyList_WhenLocationExists_AndHasNoPhotos()
    {
        // Action.
        var items = _repo.GetByLocationId(TestData.Parks[0].id);

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