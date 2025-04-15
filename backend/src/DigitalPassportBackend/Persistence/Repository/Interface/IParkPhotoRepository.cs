using DigitalPassportBackend.Domain;
using System.Collections.Generic;

namespace DigitalPassportBackend.Persistence.Repository;

public interface IParkPhotoRepository : IRepository<ParkPhoto>
{
    // CREATE

    // READ
    List<ParkPhoto> GetByLocationId(int locationId);

    // UPDATE

    // DELETE
}
