using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class UserRepository(DigitalPassportDbContext digitalPassportDbContext)
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    public User? GetById(int id)
    {
        var result = _digitalPassportDbContext.Users.Where(u => u.id.Equals(id)).SingleOrDefault();
        if (result is null)
        {
            throw new NotFoundException($"User not found with id {id}");
        }
        return result;
    }

    public User? GetByUsername(string username)
    {
        var result = _digitalPassportDbContext.Users.Where(u => u.username.Equals(username)).SingleOrDefault();
        if (result is null)
        {
            throw new NotFoundException($"User not found with username {username}");
        }
        return result;
    }

    public void CreateUser(User user)
    {
        _digitalPassportDbContext.Users.Add(user);
        _digitalPassportDbContext.SaveChanges();
    }
}