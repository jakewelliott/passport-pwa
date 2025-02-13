using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.UnitTests.TestUtils;

using Microsoft.EntityFrameworkCore;

namespace DigitalPassportBackend.UnitTests.Persistence.Repository;
public class PrivateNoteRepositoryTests
{
    private readonly DigitalPassportDbContext _db;

    private readonly PrivateNoteRepository _repo;

    public PrivateNoteRepositoryTests()
    {
        // Initialize the testing DB.
        var options = new DbContextOptionsBuilder<DigitalPassportDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        _db = new(options, TestConfiguration.GetConfiguration());

        // Populate the testing DB.
        _db.PrivateNotes.AddRange(TestData.PrivateNotes);
        _db.SaveChanges();

        // Initialize the repository.
        _repo = new(_db);
    }

    [Fact]
    public void GetById_ReturnsPrivateNote_WhenPrivateNoteExists()
    {
        // Action.
        var item = _repo.GetById(TestData.PrivateNotes[0].id);

        // Assert.
        Assert.Equal(TestData.PrivateNotes[0], item);
    }

    [Fact]
    public void GetById_ThrowsNotFoundException_WhenPrivateNoteDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.GetById(5));
    }

    [Fact]
    public void Delete_ReturnsDeletedPrivateNote_WhenPrivateNoteExists()
    {
        // Action.
        var item = _repo.Delete(TestData.PrivateNotes[2].id);
        
        // Assert.
        Assert.Equal(TestData.PrivateNotes[2], item);
        Assert.Equal(2, _db.PrivateNotes.Count());
        Assert.DoesNotContain(TestData.PrivateNotes[2], _db.PrivateNotes);
    }

    [Fact]
    public void Delete_ThrowsNotFoundException_WhenPrivateNoteDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.Delete(5));
    }

    [Fact]
    public void Update_ReturnsExistingPrivateNote_WhenPrivateNoteExists()
    {
        // Prepare updated icon.
        var newVisit = TestData.PrivateNotes[0];
        newVisit.updatedAt = DateTime.UtcNow;

        // Action.
        var oldVisit = _repo.Update(newVisit);

        // Assert.
        Assert.Equal(3, _db.PrivateNotes.Count());
        Assert.Equal(TestData.PrivateNotes[0], oldVisit);
        Assert.Contains(newVisit, _db.PrivateNotes);
    }

    [Fact]
    public void UpdateThrowsNotFoundException_WhenPrivateNoteDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.Update(NewNote));
        Assert.Equal(3, _db.PrivateNotes.Count());
    }

    [Fact]
    public void Count_ReturnsNumberOfPrivateNotes()
    {
        // Action and assert.
        Assert.Equal(3, _repo.Count());
    }

    [Fact]
    public void Create_ReturnsNewPrivateNote_IfPrivateNoteDNE()
    {
        // Action.
        var item = _repo.Create(NewNote);

        // Assert.
        Assert.Equal(4, _db.PrivateNotes.Count());
        Assert.Equal(NewNote, item);
        Assert.Contains(NewNote, _db.PrivateNotes);
    }

    private static readonly PrivateNote NewNote = new()
    {
        note = "note! aaaaaa!!!",
        park = TestData.Parks[1],
        user = TestData.Users[3]
    };
}