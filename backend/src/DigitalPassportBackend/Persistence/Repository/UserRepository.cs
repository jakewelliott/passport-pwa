using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class UserRepository(DigitalPassportDbContext digitalPassportDbContext) : IUserRepository
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    // CREATE
    public User Create(User entity)
    {
        _digitalPassportDbContext.Users.Add(entity);
        _digitalPassportDbContext.SaveChanges();
        return entity;
    }

    // READ
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

    public List<User> GetAll()
    {
        return _digitalPassportDbContext.Users.ToList();
    }

    public int Count()
    {
        return _digitalPassportDbContext.Users.Count();
    }

    // UPDATE
    public User Update(User entity)
    {
        var existingItem = GetById(entity.id);
        _digitalPassportDbContext.Entry(existingItem).CurrentValues.SetValues(entity);
        _digitalPassportDbContext.SaveChanges();
        return existingItem;
    }

    // DELETE
    public User Delete(int id)
    {
        var result = GetById(id);
        _digitalPassportDbContext.Users.Remove(result);
        _digitalPassportDbContext.SaveChanges();
        return result;
    }
}