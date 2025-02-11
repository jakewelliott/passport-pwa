using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class UserRepository(DigitalPassportDbContext digitalPassportDbContext) : IUserRepository
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    public User GetById(int id)
    {
        var result = _digitalPassportDbContext.Users.Where(a => a.id.Equals(id)).SingleOrDefault();
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
            throw new NotFoundException($"User not found with username {username}.");
        }
        return result;
    }

    public void CreateUser(User user)
    {
        _digitalPassportDbContext.Users.Add(user);
        _digitalPassportDbContext.SaveChanges();
    }

    public User Delete(int id)
    {
        var result = GetById(id);
        _digitalPassportDbContext.Users.Remove(result);
        _digitalPassportDbContext.SaveChanges();
        return result;
    }

    public User Update(User entity)
    {
        var existingItem = GetById(entity.id);
        _digitalPassportDbContext.Entry(existingItem).CurrentValues.SetValues(entity);
        _digitalPassportDbContext.SaveChanges();
        return existingItem;
    }

    public int Count()
    {
        return _digitalPassportDbContext.Users.Count();
    }

    public User Create(User entity)
    {
        _digitalPassportDbContext.Users.Add(entity);
        _digitalPassportDbContext.SaveChanges();
        return entity;
    }

}