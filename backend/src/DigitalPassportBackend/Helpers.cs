using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Repository;

namespace DigitalPassportBackend;

public static class Helpers
{
    public static void SetValues<T>(List<T> currentVals, List<T> newVals, IRepository<T> repo) where T : IEntity
    {
        // Delete difference.
        currentVals.Except(newVals)
            .ToList()
            .ForEach(v => repo.Delete(v.id));
        
        // Create or update new values.
        foreach (var val in newVals)
        {
            try
            {
                if (!repo.GetById(val.id).Equals(val))
                {
                    repo.Update(val);
                }
            }
            catch (NotFoundException)
            {
                repo.Create(val);
            }
        }
    }
}