using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.UnitTests.TestUtils;

using Microsoft.EntityFrameworkCore;

namespace DigitalPassportBackend.UnitTests.Persistence.Repository;
public class ParkAddressRepositoryTests
{
    private readonly DigitalPassportDbContext _db;

    private readonly ParkAddressRepository _repo;

    public ParkAddressRepositoryTests()
    {
        // Initialize the testing DB.
        var options = new DbContextOptionsBuilder<DigitalPassportDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        _db = new(options);

        // Populate the testing DB.
        _db.ParkAddresses.AddRange(TestData.ParkAddresses);
        _db.SaveChanges();

        // Initialize the repository.
        _repo = new ParkAddressRepository(_db);
    }

    [Fact]
    public void GetByLocationId_ReturnsPopulatedList_WhenLocationExists()
    {
        // Action.
        var items = _repo.GetByLocationId(TestData.Parks[0].id);

        // Assert.
        Assert.True(items.Count == 1);
        Assert.Contains(items, i => i == TestData.ParkAddresses[1]);
    }

    [Fact]
    public void GetByLocationId_ReturnsEmptyList_WhenLocationDNE()
    {
        // Action.
        var items = _repo.GetByLocationId(5);

        // Assert.
        Assert.False(items.Any());
    }

    [Fact]
    public void GetById_ReturnsParkAddress_WhenParkAddressExists()
    {
        // Action.
        var item = _repo.GetById(TestData.ParkAddresses[1].id);

        // Assert.
        Assert.Equal(TestData.ParkAddresses[1], item);
    }

    [Fact]
    public void GetById_ThrowsNotFoundException_WhenParkAddressDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.GetById(5));
    }

    [Fact]
    public void Delete_ReturnsDeletedParkAddress_WhenParkAddressExists()
    {
        // Action.
        var item = _repo.Delete(TestData.ParkAddresses[0].id);

        // Assert.
        Assert.Equal(TestData.ParkAddresses[0], item);
        Assert.Equal(1, _db.ParkAddresses.Count());
        Assert.DoesNotContain(TestData.ParkAddresses[0], _db.ParkAddresses);
    }

    [Fact]
    public void Delete_ThrowsNotFoundException_WhenParkAddressDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.Delete(5));
    }
}