using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.UnitTests.TestUtils;

using Microsoft.EntityFrameworkCore;

namespace DigitalPassportBackend.UnitTests.Persistence.Repository;
public class CompletedBucketListItemRepositoryTests
{
    private readonly DigitalPassportDbContext _db;

    private readonly CompletedBucketListItemRepository _repo;

    public CompletedBucketListItemRepositoryTests()
    {
        // Initialize the testing DB.
        var options = new DbContextOptionsBuilder<DigitalPassportDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        _db = new(options, TestConfiguration.GetConfiguration());

        // Populate the testing DB.
        _db.CompletedBucketListItems.AddRange(TestData.CompletedBucketListItems);
        _db.SaveChanges();

        // Initialize the repository.
        _repo = new(_db);
    }

    [Fact]
    public void GetById_ReturnsCompletedBucketListItem_WhenItemExists()
    {
        // Action.
        var item = _repo.GetById(TestData.CompletedBucketListItems[1].id);

        // Assert.
        Assert.Equal(TestData.CompletedBucketListItems[1], item);
    }

    [Fact]
    public void GetById_ThrowsNotFoundException_WhenItemDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.GetById(5));
    }

    [Fact]
    public void Delete_ReturnsDeletedCompletedBucketListItem_WhenItemExists()
    {
        // Action.
        var item = _repo.Delete(TestData.CompletedBucketListItems[0].id);

        // Assert.
        Assert.Equal(TestData.CompletedBucketListItems[0], item);
        Assert.Equal(2, _db.CompletedBucketListItems.Count());
        Assert.DoesNotContain(TestData.CompletedBucketListItems[0], _db.CompletedBucketListItems);
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
        var newItem = TestData.CompletedBucketListItems[1];
        newItem.location = new(34.0488, -77.9094);

        // Action.
        var oldItem = _repo.Update(newItem);

        // Assert.
        Assert.Equal(3, _db.CompletedBucketListItems.Count());
        Assert.Equal(TestData.CompletedBucketListItems[1], oldItem);
        Assert.Contains(newItem, _db.CompletedBucketListItems);
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
        Assert.Equal(4, _db.CompletedBucketListItems.Count());
        Assert.Equal(NewItem, item);
        Assert.Contains(NewItem, _db.CompletedBucketListItems);
    }

    private static readonly CompletedBucketListItem NewItem = new()
    {
        id = 5,
        location = new(35.7810, -78.6485), // Skipped class and got burgers 😋🍔
        park = TestData.Parks[1],
        bucketListItem = TestData.BucketList[1],
        user = TestData.Users[1]
    };
}
