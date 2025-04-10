using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public interface IRepository<T> where T : IEntity
{
    T GetById(int id);
    T Delete(int id);
    T Update(T entity);
    int Count();
    T Create(T entity);
}