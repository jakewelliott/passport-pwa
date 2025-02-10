using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class UserRepository(DigitalPassportDbContext digitalPassportDbContext)
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    
}