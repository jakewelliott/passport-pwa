using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
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
        _db = new(options, TestConfiguration.GetConfiguration());

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
        Assert.Equal(2, items.Count);
        Assert.Contains(TestData.BucketList[0], items);
        Assert.Contains(TestData.BucketList[2], items);
    }

    [Fact]
    public void GetByLocationId_ReturnsEmptyList_WhenLocationsDNE()
    {
        // Action.
        var items = _repo.GetByLocationId(0);

        // Assert.
        Assert.Empty(items);
    }

    [Fact]
    public void GetById_ReturnsBucketListItem_WhenBucketListItemExists()
    {
        // Action.
        var item = _repo.GetById(TestData.BucketList[1].id);

        // Assert.
        Assert.Equal(TestData.BucketList[1], item);
    }

    [Fact]
    public void GetById_ThrowsNotFoundException_WhenBucketListItemDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.GetById(5));
    }

    [Fact]
    public void Delete_ReturnsDeletedBucketListItem_WhenItemExists()
    {
        // Action.
        var item = _repo.Delete(TestData.BucketList[0].id);

        // Assert.
        Assert.Equal(TestData.BucketList[0], item);
        Assert.Equal(2, _db.BucketListItems.Count());
        Assert.DoesNotContain(TestData.BucketList[0], _db.BucketListItems);
    }

    [Fact]
    public void Delete_ThrowsNotFoundException_WhenItemDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.Delete(5));
    }

    [Fact]
    public void Update_ReturnsExistingItem_WhenItemExists()
    {
        // Prepare updated bucket list item.
        var newItem = TestData.BucketList[0];
        newItem.task = "new task description";

        // Action.
        var oldItem = _repo.Update(newItem);

        // Assert.
        Assert.Equal(3, _db.BucketListItems.Count());
        Assert.Equal(TestData.BucketList[0], oldItem);
        Assert.Contains(newItem, _db.BucketListItems);
    }

    [Fact]
    public void Update_ThrowsNotFoundException_WhenItemDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.Update(NewItem));
        Assert.Equal(3, _db.BucketListItems.Count());
    }

    [Fact]
    public void Count_ReturnsNumberOfItems()
    {
        Assert.Equal(3, _repo.Count());
    }

    [Fact]
    public void Create_ReturnsNewItem_IfItemDNE()
    {
        // Action.
        var item = _repo.Create(NewItem);

        // Assert.
        Assert.Equal(4, _db.BucketListItems.Count());
        Assert.Equal(NewItem, item);
        Assert.Contains(NewItem, _db.BucketListItems);
    }

    private static readonly BucketListItem NewItem = new()
    {
        id = 5,
        task = "Task 2 at EB2",
        park = TestData.Parks[1]
    };
}
