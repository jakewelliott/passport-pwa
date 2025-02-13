using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.UnitTests.TestUtils;

using Microsoft.EntityFrameworkCore;

namespace DigitalPassportBackend.UnitTests.Persistence.Repository;
public class ParkVisitRepositoryTests
{
    private readonly DigitalPassportDbContext _db;

    private readonly ParkVisitRepository _repo;

    public ParkVisitRepositoryTests()
    {
        // Initialize the testing DB.
        var options = new DbContextOptionsBuilder<DigitalPassportDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        _db = new(options, TestConfiguration.GetConfiguration());

        // Populate the testing DB.
        _db.ParkVisits.AddRange(TestData.ParkVisits);
        _db.SaveChanges();

        // Initialize the repository.
        _repo = new(_db);
    }

    [Fact]
    public void GetById_ReturnsParkVisit_WhenParkVisitExists()
    {
        // Action.
        var item = _repo.GetById(TestData.ParkVisits[0].id);

        // Assert.
        Assert.Equal(TestData.ParkVisits[0], item);
    }

    [Fact]
    public void GetById_ThrowsNotFoundException_WhenParkVisitDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.GetById(5));
    }

    [Fact]
    public void Delete_ReturnsDeletedParkVisit_WhenParkVisitExists()
    {
        // Action.
        var item = _repo.Delete(TestData.ParkVisits[2].id);
        
        // Assert.
        Assert.Equal(TestData.ParkVisits[2], item);
        Assert.Equal(2, _db.ParkVisits.Count());
        Assert.DoesNotContain(TestData.ParkVisits[2], _db.ParkVisits);
    }

    [Fact]
    public void Delete_ThrowsNotFoundException_WhenParkVisitDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.Delete(5));
    }

    [Fact]
    public void Update_ReturnsExistingParkVisit_WhenParkVisitExists()
    {
        // Prepare updated icon.
        var newVisit = TestData.ParkVisits[0];
        newVisit.updatedAt = DateTime.UtcNow;

        // Action.
        var oldVisit = _repo.Update(newVisit);

        // Assert.
        Assert.Equal(3, _db.ParkVisits.Count());
        Assert.Equal(TestData.ParkVisits[0], oldVisit);
        Assert.Contains(newVisit, _db.ParkVisits);
    }

    [Fact]
    public void UpdateThrowsNotFoundException_WhenParkVisitDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.Update(NewVisit));
        Assert.Equal(3, _db.ParkVisits.Count());
    }

    [Fact]
    public void Count_ReturnsNumberOfParkVisits()
    {
        // Action and assert.
        Assert.Equal(3, _repo.Count());
    }

    [Fact]
    public void Create_ReturnsNewParkVisit_IfParkVisitDNE()
    {
        // Action.
        var item = _repo.Create(NewVisit);

        // Assert.
        Assert.Equal(4, _db.ParkVisits.Count());
        Assert.Equal(NewVisit, item);
        Assert.Contains(NewVisit, _db.ParkVisits);
    }

    private static readonly ParkVisit NewVisit = new()
    {
        park = TestData.Parks[1],
        user = TestData.Users[3]
    };
}