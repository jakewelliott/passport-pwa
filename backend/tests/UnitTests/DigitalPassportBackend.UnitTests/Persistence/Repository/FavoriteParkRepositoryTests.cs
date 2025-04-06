using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.UnitTests.TestUtils;

using Microsoft.EntityFrameworkCore;

namespace DigitalPassportBackend.UnitTests.Persistence.Repository;
public class FavoriteParkRepositoryTests
{
    private readonly DigitalPassportDbContext _db;
    private readonly FavoriteParkRepository _repo;

    public FavoriteParkRepositoryTests()
    {
        var options = new DbContextOptionsBuilder<DigitalPassportDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        _db = new(options, TestConfiguration.GetConfiguration());

        _db.FavoriteParks.AddRange(TestData.FavoriteParks);
        _db.SaveChanges();

        _repo = new(_db);
    }

    [Fact]
    public void GetById_ReturnsFavoritePark_WhenFavoriteParkExists()
    {
        var item = _repo.GetById(TestData.FavoriteParks[0].id);

        Assert.Equal(TestData.FavoriteParks[0], item);
    }

    [Fact]
    public void GetById_ThrowsNotFoundException_WhenFavoriteParkDNE()
    {
        Assert.Throws<NotFoundException>(() => _repo.GetById(-1));
    }

    [Fact]
    public void Delete_ReturnsDeletedFavoritePark_WhenFavoriteParkExists()
    {
        var item = _repo.Delete(TestData.FavoriteParks[0].id);

        Assert.Equal(TestData.FavoriteParks[0], item);
        Assert.DoesNotContain(TestData.FavoriteParks[0], _db.FavoriteParks);
        Assert.Equal(TestData.FavoriteParks.Count - 1, _db.FavoriteParks.Count());
    }

    [Fact]
    public void Delete_ThrowsNotFoundException_WhenFavoriteParkDNE()
    {
        Assert.Throws<NotFoundException>(() => _repo.Delete(-1));
    }

    [Fact]
    public void Update_ReturnsUpdatedItem_WhenFavoriteParkExists()
    {
        var updated = TestData.FavoriteParks[0];
        updated.park = TestData.Parks[1]; // Simulate change

        var result = _repo.Update(updated);

        Assert.Equal(updated, result);
        Assert.Contains(updated, _db.FavoriteParks);
    }

    [Fact]
    public void Update_ThrowsNotFoundException_WhenFavoriteParkDNE()
    {
        Assert.Throws<NotFoundException>(() => _repo.Update(NewFavorite));
    }

    [Fact]
    public void Count_ReturnsCorrectNumberOfFavoriteParks()
    {
        Assert.Equal(TestData.FavoriteParks.Count, _repo.Count());
    }

    [Fact]
    public void Create_ReturnsNewFavoritePark_WhenValid()
    {
        var item = _repo.Create(NewFavorite);

        Assert.Equal(NewFavorite, item);
        Assert.Contains(NewFavorite, _db.FavoriteParks);
        Assert.Equal(TestData.FavoriteParks.Count + 1, _repo.Count());
    }

    [Fact]
    public void GetByUser_ReturnsFavoriteParks_WhenTheyExist()
    {
        var userId = TestData.FavoriteParks[0].userId;

        var results = _repo.GetByUser(userId);

        Assert.All(results, r => Assert.Equal(userId, r.userId));
        Assert.NotEmpty(results);
    }

    [Fact]
    public void GetByUser_ReturnsEmptyList_WhenNoneExist()
    {
        var results = _repo.GetByUser(-1);

        Assert.NotNull(results);
        Assert.Empty(results);
    }

    [Fact]
    public void GetByUserAndPark_ReturnsFavoritePark_WhenExists()
    {
        var item = TestData.FavoriteParks[0];
        var result = _repo.GetByUserAndPark(item.userId, item.parkId!.Value);

        Assert.NotNull(result);
        Assert.Equal(item.id, result!.id);
    }

    [Fact]
    public void GetByUserAndPark_ReturnsNull_WhenNotExists()
    {
        var result = _repo.GetByUserAndPark(-1, -1);

        Assert.Null(result);
    }

    private static readonly FavoritePark NewFavorite = new()
    {
        id = 999,
        user = TestData.Users[1],
        userId = TestData.Users[1].id,
        park = TestData.Parks[1],
        parkId = TestData.Parks[1].id
    };
}
