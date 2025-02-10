using DigitalPassportBackend.Domain;
using System.Collections.Generic;

namespace DigitalPassportBackend.Persistence.Repository;

public interface IParkPhotoRepository : IRepository<ParkPhoto>
{
    List<ParkPhoto> GetByLocationId(int locationId);
}
