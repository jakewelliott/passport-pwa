using DigitalPassportBackend.Domain;
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
            _db = new(options, TestConfiguration.GetConfiguration());

        // Populate the testing DB.
        _db.Parks.AddRange(TestData.Parks);
        _db.SaveChanges();

        // Initialize the repository.
        _repo = new(_db);
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

    [Fact]
    public void GetById_ReturnsPark_WhenLocationExists()
    {
        // Action.
        var item = _repo.GetById(TestData.Parks[0].id);

        // Assert.
        Assert.Equal(TestData.Parks[0], item);
    }

    [Fact]
    public void GetById_ThrowsNotFoundException_WhenLocationDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.GetById(5));
    }

    [Fact]
    public void Delete_ReturnsDeletedPark_WhenLocationExists()
    {
        // Action.
        var item = _repo.Delete(TestData.Parks[0].id);

        // Assert.
        Assert.Equal(TestData.Parks[0], item);
        Assert.Equal(1, _db.Parks.Count());
        Assert.DoesNotContain(TestData.Parks[0], _db.Parks);
    }

    [Fact]
    public void Delete_ThrowsNotFoundException_WhenLocationDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.Delete(5));
        Assert.Equal(2, _db.Parks.Count());
    }

    [Fact]
    public void Update_ReturnsExistingItem_WhenLocationExists()
    {
        // Prepare updated park.
        var newItem = TestData.Parks[0];
        newItem.email = "new email";

        // Action.
        var oldItem = _repo.Update(newItem);

        // Assert.
        Assert.Equal(2, _db.Parks.Count());
        Assert.Equal(TestData.Parks[0], oldItem);
        Assert.Contains(newItem, _db.Parks);
    }

    [Fact]
    public void Update_ThrowsNotFoundException_WhenLocationDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.Update(NewPark));
        Assert.Equal(2, _db.Parks.Count());
    }

    [Fact]
    public void Count_ReturnsNumberOfLocations()
    {
        // Action and assert.
        Assert.Equal(2, _repo.Count());
    }

    [Fact]
    public void Create_ReturnsNewPark_IfLocationDNE()
    {
        // Action.
        var item = _repo.Create(NewPark);

        // Assert.
        Assert.Equal(3, _db.Parks.Count());
        Assert.Equal(NewPark, item);
        Assert.Contains(NewPark, _db.Parks);
    }
    [Fact]
    public void GetAll_FullList_LocationsPopulatedInDB()
    {
        var list = _repo.GetAll();
        Assert.NotEmpty(list);
        Assert.Equal(2, list.Count);
        Assert.Equal(TestData.Parks[0], list[0]);
        Assert.Equal(TestData.Parks[1], list[1]);
        _db.AddRange(TestData.Parks);
    }

    private static readonly Park NewPark = new()
    {
        id = 5,
        parkName = "New York City",
        parkAbbreviation = "NYC",
        parkType = ParkType.SPA,
        website = "google.com"
    };
}