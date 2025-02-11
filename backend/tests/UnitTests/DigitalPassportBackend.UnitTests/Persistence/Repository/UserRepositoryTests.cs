using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.UnitTests.TestUtils;

using Microsoft.EntityFrameworkCore;

namespace DigitalPassportBackend.UnitTests.Persistence.Repository;
public class UserRepositoryTests
{
    private readonly DigitalPassportDbContext _db;

    private readonly UserRepository _repo;

    public UserRepositoryTests()
    {
        // Initialize the testing DB.
        var options = new DbContextOptionsBuilder<DigitalPassportDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
            _db = new(options, TestConfiguration.GetConfiguration());

        // Populate the testing DB.
        _db.Users.AddRange(TestData.Users);
        _db.SaveChanges();

        // Initialize the repository.
        _repo = new UserRepository(_db);
    }

    [Fact]
    public void GetById_ReturnsUser_WhenUserExists()
    {
        // Action.
        var item = _repo.GetById(TestData.Users[1].id);

        // Assert.
        Assert.Equal(TestData.Users[0], item);
    }

    [Fact]
    public void GetById_ThrowsNotFoundException_WhenUserDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.GetById(5));
    }

    [Fact]
    public void GetByUsername_ReturnsUser_WhenUserExists()
    {
        // Action.
        var item = _repo.GetByUsername(TestData.Users[3].username);

        // Assert.
        Assert.Equal(TestData.Users[3], item);
    }

    [Fact]
    public void GetByUsername_ThrowsNotFoundException_WhenUserDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.GetByUsername("i_dont_exist"));
    }

    [Fact]
    public void Delete_ReturnsDeletedUser_WhenUserExists()
    {
        // Action.
        var item = _repo.Delete(TestData.Users[2].id);

        // Assert.
        Assert.Equal(TestData.Users[2], item);
        Assert.Equal(3, _db.Users.Count());
        Assert.DoesNotContain(TestData.Users[2], _db.Users);
    }

    [Fact]
    public void Delete_ThrowsNotFoundException_WhenUserDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.Delete(5));
        Assert.Equal(4, _db.Users.Count());
    }

    [Fact]
    public void Update_ReturnsExistinguser_WhenUserExists()
    {
        // Prepare updated park.
        var newUser = TestData.Users[1];
        newUser.password = "new password";

        // Action.
        var oldUser = _repo.Update(newUser);

        // Assert.
        Assert.Equal(4, _db.Users.Count());
        Assert.Equal(TestData.Users[1], oldUser);
        Assert.Contains(newUser, _db.Users);
    }

    [Fact]
    public void Update_ThrowsNotFoundException_WhenUserDNE()
    {
        // Action and assert.
        Assert.Throws<NotFoundException>(() => _repo.Update(NewUser));
        Assert.Equal(4, _db.Users.Count());
    }

    [Fact]
    public void Count_ReturnsNumberOfUsers()
    {
        // Action and assert.
        Assert.Equal(4, _repo.Count());
    }

    [Fact]
    public void Create_ReturnsNewUser_IfUserDNE()
    {
        // Action.
        var item = _repo.Create(NewUser);

        // Assert.
        Assert.Equal(5, _db.Users.Count());
        Assert.Equal(NewUser, item);
        Assert.Contains(NewUser, _db.Users);
    }

    private static readonly User NewUser = new()
    {
        username = "new_user",
        password = "new_user_password",
        role = UserRole.visitor,
    };
}