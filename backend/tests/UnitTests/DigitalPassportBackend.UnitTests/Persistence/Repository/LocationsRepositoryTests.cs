using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.UnitTests.TestUtils;

using Microsoft.EntityFrameworkCore;

namespace DigitalPassportBackend.UnitTests.Persistence.Repository;
public class LocationsRepositoryTests
{
    private readonly DigitalPassportDbContext _db;

    private readonly LocationsRepository _repo;

    public LocationsRepositoryTests()
    {
        // Initialize the testing DB.
        var options = new DbContextOptionsBuilder<DigitalPassportDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
            _db = new(options);

        // Populate the testing DB.
        _db.Parks.AddRange(TestData.Parks);
        _db.SaveChanges();

        // Initialize the repository.
        _repo = new LocationsRepository(_db);
    }

    [Fact]
    public void GetByAbbreviation_ReturnsPark_WhenLocationExists()
    {
        // Action.
        var park1 = _repo.GetByAbbreviation("CABE");
        var park2 = _repo.GetByAbbreviation("EBII");

        // Assert.
        Assert.Equal(TestData.Parks[0], park1);
        Assert.Equal(TestData.Parks[1], park2);
    }

    [Fact]
    public void GetByAbbreviation_ThrowsNotFoundException_WhenLocationNotFound()
    {
        // Action and assertion.
        Assert.Throws<NotFoundException>(() => _repo.GetByAbbreviation("DMV"));
    }
}