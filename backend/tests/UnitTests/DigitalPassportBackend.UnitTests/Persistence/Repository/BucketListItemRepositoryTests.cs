using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Persistence.Database;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.UnitTests.TestUtils.Constants;

using Microsoft.EntityFrameworkCore;

using Moq;

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
        _db.BucketListItems.AddRange(BucketList);
        _db.SaveChanges();

        // Initialize the repository.
        _repo = new BucketListItemRepository(_db);
    }

    [Fact]
    public void GetByLocationId_ReturnsPopulatedList_WhenLocationExists()
    {
        // Action.
        var items = _repo.GetByLocationId(Constants.Parks[0].id);

        // Assert.
        Assert.True(items.Count == 2);
        Assert.Contains(items, i => i == BucketList[0]);
        Assert.Contains(items, i => i == BucketList[2]);
    }

    [Fact]
    public void GetByLocationId_ReturnsEmptyList_WhenLocationsDNE()
    {
        // Action.
        var items = _repo.GetByLocationId(0);

        // Assert.
        Assert.False(items.Any());
    }

    public static readonly List<BucketListItem> BucketList =
    [
        new()
        {
            id = 42,
            task = "Task 1 at CABE",
            createdAt = DateTime.Now,
            updatedAt = DateTime.Now,
            parkId = Constants.Parks[0].id,
            park = Constants.Parks[0]
        },
        new()
        {
            id = 84,
            task = "Task 1 at EB2",
            createdAt = DateTime.Now,
            updatedAt = DateTime.Now,
            parkId = Constants.Parks[1].id,
            park = Constants.Parks[1]
        },
        new()
        {
            id = 128,
            task = "Task 2 at CABE",
            createdAt = DateTime.Now,
            updatedAt = DateTime.Now,
            parkId = Constants.Parks[0].id,
            park = Constants.Parks[0]
        }
    ];
}
