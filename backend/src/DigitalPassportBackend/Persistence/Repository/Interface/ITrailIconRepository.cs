using DigitalPassportBackend.Domain;
using System.Collections.Generic;

namespace DigitalPassportBackend.Persistence.Repository;

public interface ITrailIconRepository : IRepository<TrailIcon>
{
    List<TrailIcon> GetByTrailId(int trailId);
}
