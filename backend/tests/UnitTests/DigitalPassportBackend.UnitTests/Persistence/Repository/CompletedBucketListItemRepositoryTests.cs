using System.Net.NetworkInformation;

using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.UnitTests.TestUtils;

using Microsoft.EntityFrameworkCore;

using NetTopologySuite.Algorithm;
using NetTopologySuite.Index.HPRtree;

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
        Assert.Equal(3, _db.CompletedBucketListItems.Count());
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
        Assert.Equal(4, _db.CompletedBucketListItems.Count());
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
        Assert.Equal(4, _repo.Count());
    }

    [Fact]
    public void Create_ReturnsNewItem_IfItemDNE()
    {
        // Action.
        var item = _repo.Create(NewItem);

        // Assert.
        Assert.Equal(5, _db.CompletedBucketListItems.Count());
        Assert.Equal(NewItem, item);
        Assert.Contains(NewItem, _db.CompletedBucketListItems);
    }

    [Fact]
    public void GetByParkAndUser_ReturnsItems_DataExists()
    {
        // Arrange
        var locationId = TestData.CompletedBucketListItems[0].parkId;
        var userId = TestData.CompletedBucketListItems[0].userId;

        int realId = locationId.GetValueOrDefault();

        // Act
        var result = _repo.GetByParkAndUser(realId, userId);

        // Assert
        Assert.NotEmpty(result);

        var counter = 0;
        foreach (var item in result)
        {
            Assert.Equal(locationId, item.parkId);
            Assert.Equal(userId, item.userId);
            Assert.Equal(TestData.CompletedBucketListItems[counter].id, item.id);
            Assert.Equal(TestData.CompletedBucketListItems[counter].location, item.location);
            Assert.Equal(TestData.CompletedBucketListItems[counter].created_at, item.created_at);
            Assert.Equal(TestData.CompletedBucketListItems[counter].updated_at, item.updated_at);
            Assert.Equal(TestData.CompletedBucketListItems[counter].park, item.park);
            Assert.Equal(TestData.CompletedBucketListItems[counter].bucketListItemId, item.bucketListItemId);
            Assert.Equal(TestData.CompletedBucketListItems[counter].bucketListItem, item.bucketListItem);
            Assert.Equal(TestData.CompletedBucketListItems[counter].user, item.user);
            counter++;
        }
    }

    [Fact]
    public void GetByParkAndUser_ReturnsEmpty_InvalidIDsDataNonexistent()
    {
        // Arrange
        var invalidLocationId = -1;
        var invalidUserId = -1;

        var locationId = TestData.CompletedBucketListItems[0].parkId;
        var userId = TestData.CompletedBucketListItems[0].userId;

        int realId = locationId.GetValueOrDefault();


        // Act
        var result0 = _repo.GetByParkAndUser(invalidLocationId, userId);
        var result1 = _repo.GetByParkAndUser(realId, invalidUserId);
        var result2 = _repo.GetByParkAndUser(invalidLocationId, invalidUserId);

        // Assert
        Assert.Empty(result0);
        Assert.Empty(result1);
        Assert.Empty(result2);
    }

    [Fact]
    public void GetByUser_ReturnsItems_DataExists()
    {
        // Arrange
        var userId = TestData.CompletedBucketListItems[0].userId;

        // Act
        var result = _repo.GetByUser(userId);

        // Assert
        Assert.NotEmpty(result);
        Assert.Equal(TestData.CompletedBucketListItems.FindAll(x => x.userId == userId).ToList().Count, result.Count);
        var counter = 0;
        foreach (var item in result)
        {
            var testDataItem = TestData.CompletedBucketListItems.Find(x => x.id == item.id);
            Assert.NotNull(testDataItem);
            Assert.Equal(userId, item.userId);
            Assert.Equal(testDataItem.id, item.id);
            Assert.Equal(testDataItem.location, item.location);
            Assert.Equal(testDataItem.created_at, item.created_at);
            Assert.Equal(testDataItem.updated_at, item.updated_at);
            Assert.Equal(testDataItem.park, item.park);
            Assert.Equal(testDataItem.bucketListItemId, item.bucketListItemId);
            Assert.Equal(testDataItem.bucketListItem, item.bucketListItem);
            Assert.Equal(testDataItem.user, item.user);
            counter++;
        }
    }

    [Fact]
    public void GetByUser_ReturnsEmpty_InvalidIDsDataNonexistent()
    {
        // Arrange
        var invalidUserId = -1;

        // Act
        var result1 = _repo.GetByUser(invalidUserId);
        var result2 = _repo.GetByUser(invalidUserId);

        // Assert
        Assert.Empty(result1);
        Assert.Empty(result2);
    }

    [Fact]
    public void GetByItemAndUser_ReturnsItems_DataExists()
    {
        // Arrange
        var itemId = TestData.CompletedBucketListItems[0].bucketListItemId;
        // itemId = 128
        var userId = TestData.CompletedBucketListItems[0].userId;

        // Act
        var result = _repo.GetByItemAndUser(itemId, userId);

        // Assert
        Assert.NotNull(result);

        var counter = 0;
        Assert.Equal(itemId, result.bucketListItemId);
        Assert.Equal(userId, result.userId);
        Assert.Equal(TestData.CompletedBucketListItems[counter].id, result.id);
        Assert.Equal(TestData.CompletedBucketListItems[counter].location, result.location);
        Assert.Equal(TestData.CompletedBucketListItems[counter].created_at, result.created_at);
        Assert.Equal(TestData.CompletedBucketListItems[counter].updated_at, result.updated_at);
        Assert.Equal(TestData.CompletedBucketListItems[counter].park, result.park);
        Assert.Equal(TestData.CompletedBucketListItems[counter].bucketListItemId, result.bucketListItemId);
        Assert.Equal(TestData.CompletedBucketListItems[counter].bucketListItem, result.bucketListItem);
        Assert.Equal(TestData.CompletedBucketListItems[counter].user, result.user);
    }

    [Fact]
    public void GetByItemAndUser_ReturnsEmpty_InvalidIDsDataNonexistent()
    {
        // Arrange
        var invalidItemId = -1;
        var invalidUserId = -1;

        var realId = TestData.CompletedBucketListItems[0].bucketListItemId;
        var userId = TestData.CompletedBucketListItems[0].userId;

        // Act
        var result0 = _repo.GetByItemAndUser(invalidItemId, userId);
        var result1 = _repo.GetByItemAndUser(realId, invalidUserId);
        var result2 = _repo.GetByItemAndUser(invalidItemId, invalidUserId);

        // Assert
        Assert.Null(result0);
        Assert.Null(result1);
        Assert.Null(result2);
    }

    private static readonly CompletedBucketListItem NewItem = new()
    {
        id = 5,
        location = new(35.7810, -78.6485), // Skipped class and got burgers 😋🍔
        deleted = false,
        park = TestData.Parks[1],
        bucketListItem = TestData.BucketList[1],
        user = TestData.Users[1]
    };
}
