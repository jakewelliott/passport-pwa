using DigitalPassportBackend.Persistence.Database;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.UnitTests.TestUtils;

using Microsoft.EntityFrameworkCore;

namespace DigitalPassportBackend.UnitTests.Persistence.Repository;
public class BucketListItemRepositoryTests
{
    private readonly DigitalPassportDbContext _db;

    private readonly BucketListItemRepository _repo;

    public BucketListItemRepositoryTests()
    {
        // Initialize the testing DB.
        var options = new DbContextOptionsBuilder<DigitalPassportDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        _db = new(options);

        // Populate the testing DB.
        _db.BucketListItems.AddRange(TestData.BucketList);
        _db.SaveChanges();

        // Initialize the repository.
        _repo = new BucketListItemRepository(_db);
    }

    [Fact]
    public void GetByLocationId_ReturnsPopulatedList_WhenLocationExists()
    {
        // Action.
        var items = _repo.GetByLocationId(TestData.Parks[0].id);

        // Assert.
        Assert.True(items.Count == 2);
        Assert.Contains(items, i => i == TestData.BucketList[0]);
        Assert.Contains(items, i => i == TestData.BucketList[2]);
    }

    [Fact]
    public void GetByLocationId_ReturnsEmptyList_WhenLocationsDNE()
    {
        // Action.
        var items = _repo.GetByLocationId(0);

        // Assert.
        Assert.False(items.Any());
    }
}
