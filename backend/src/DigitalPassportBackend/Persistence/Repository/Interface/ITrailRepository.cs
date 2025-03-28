using DigitalPassportBackend.Domain;
using System.Collections.Generic;

namespace DigitalPassportBackend.Persistence.Repository;

public interface ITrailRepository : IRepository<Trail>
{
    List<Trail> GetAll();
}
