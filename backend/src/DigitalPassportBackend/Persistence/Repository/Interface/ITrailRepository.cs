using DigitalPassportBackend.Domain;
using System.Collections.Generic;

namespace DigitalPassportBackend.Persistence.Repository;

public interface ITrailRepository : IRepository<Trail>
{
    // CREATE

    // READ
    List<Trail> GetAll();
    Trail? GetByName(string name);

    // UPDATE

    // DELETE
}
