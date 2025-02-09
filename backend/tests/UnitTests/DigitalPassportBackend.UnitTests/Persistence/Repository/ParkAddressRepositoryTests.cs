using DigitalPassportBackend.Persistence.Database;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.UnitTests.TestUtils;

using Microsoft.AspNetCore.Http.Features;
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

}