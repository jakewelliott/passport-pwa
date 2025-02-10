using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
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
        Assert.Equal(2, items.Count);
        Assert.Contains(TestData.ParkPhotos[0], items);
        Assert.Contains(TestData.ParkPhotos[1], items);
    }

    [Fact]
    public void GetByLocationId_ReturnsEmptyList_WhenLocationExists_AndHasNoPhotos()
    {
        // Action.
        var items = _repo.GetByLocationId(TestData.Parks[0].id);

        // Assert.
        Assert.Empty(items);
    }

    [Fact]
    public void GetByLocationId_ReturnsEmptyList_WhenLocationDNE()
    {
        // Action.
        var items = _repo.GetByLocationId(5);

        // Assert.
        Assert.Empty(items);
    }

    [Fact]
    public void GetById_ReturnsParkPhoto_WhenParkPhotoExists()
    {
        // Action.
        var item = _repo.GetById(TestData.ParkPhotos[0].id);

        // Assert.
        Assert.Equal(TestData.ParkPhotos[0], item);
    }

    [Fact]
    public void GetById_ThrowsNotFoundException_WhenParkPhotoDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.GetById(5));
    }

    [Fact]
    public void Delete_ReturnsDeletedParkPhoto_WhenParkPhotoExists()
    {
        // Action.
        var item = _repo.Delete(TestData.ParkPhotos[0].id);

        // Assert.
        Assert.Equal(TestData.ParkPhotos[0], item);
        Assert.Equal(1, _db.ParkPhotos.Count());
        Assert.DoesNotContain(TestData.ParkPhotos[0], _db.ParkPhotos);
    }

    [Fact]
    public void Delete_ThrowsNotFoundException_WhenParkPhotoDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.Delete(5));
    }

    [Fact]
    public void Update_ReturnsExistingItem_WhenParkPhotoExists()
    {
        // Prepare updated photo.
        var newPhoto = TestData.ParkPhotos[0];
        newPhoto.alt = "new alt text";

        // Action.
        var oldPhoto = _repo.Update(newPhoto);

        // Assert.
        Assert.Equal(2, _db.ParkPhotos.Count());
        Assert.Equal(TestData.ParkPhotos[0], oldPhoto);
        Assert.Contains(newPhoto, _db.ParkPhotos);
    }
    
    [Fact]
    public void UpdateThrowsNotFoundException_WhenParkPhotoDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.Update(NewPhoto));
        Assert.Equal(2, _db.ParkPhotos.Count());
    }

    [Fact]
    public void Count_ReturnsNumberOfParkPhotos()
    {
        // Action and assert.
        Assert.Equal(2, _repo.Count());
    }

    [Fact]
    public void Create_ReturnsNewParkPhoto_IfParkPhotoDNE()
    {
        // Action.
        var item = _repo.Create(NewPhoto);

        // Assert.
        Assert.Equal(3, _db.ParkPhotos.Count());
        Assert.Equal(NewPhoto, item);
        Assert.Contains(NewPhoto, _db.ParkPhotos);
    }

    private static readonly ParkPhoto NewPhoto = new()
    {
        photo = "photo url",
        alt = "alt text",
        park = TestData.Parks[0]
    };
}