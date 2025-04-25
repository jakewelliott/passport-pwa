using DigitalPassportBackend.Domain;
using System.Collections.Generic;

namespace DigitalPassportBackend.Persistence.Repository;

public interface IUserRepository : IRepository<User>
{
    // CREATE

    // READ
    User? GetByUsername(string username);
    List<User> GetAll();

    // UPDATE

    // DELETE
}
