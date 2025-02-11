using DigitalPassportBackend.Domain;
using System.Collections.Generic;

namespace DigitalPassportBackend.Persistence.Repository;

public interface IParkIconRepository : IRepository<ParkIcon>
{
    List<ParkIcon> GetByLocationId(int locationId);
}
