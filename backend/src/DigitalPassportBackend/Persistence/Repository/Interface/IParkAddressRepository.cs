using DigitalPassportBackend.Domain;
using System.Collections.Generic;

namespace DigitalPassportBackend.Persistence.Repository;

public interface IParkAddressRepository : IRepository<ParkAddress>
{
    List<ParkAddress> GetByLocationId(int locationId);
}
