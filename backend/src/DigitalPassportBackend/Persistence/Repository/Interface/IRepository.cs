using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public interface IRepository<T> where T : IEntity
{
    // CREATE
    T Create(T entity);

    // READ
    T GetById(int id);
    int Count();

    // UPDATE
    T Update(T entity);

    // DELETE
    T Delete(int id);
}
