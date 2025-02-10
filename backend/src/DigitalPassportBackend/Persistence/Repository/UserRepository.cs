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

}