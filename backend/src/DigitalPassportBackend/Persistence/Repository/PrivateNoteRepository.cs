using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class PrivateNoteRepository(DigitalPassportDbContext digitalPassportDbContext)
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    
}