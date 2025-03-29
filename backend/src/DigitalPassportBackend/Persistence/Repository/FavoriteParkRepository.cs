using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class FavoriteParkRepository(DigitalPassportDbContext digitalPassportDbContext) : IFavoriteParkRepository
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;

    public FavoritePark GetById(int id)
    {
        var result = _digitalPassportDbContext.FavoriteParks.Where(a => a.id.Equals(id)).SingleOrDefault();
        if (result is null)
        {
            throw new NotFoundException($"Favorite Park not found with id {id}");
        }
        return result;
    }

    public FavoritePark Delete(int id)
    {
        var result = GetById(id);
        _digitalPassportDbContext.FavoriteParks.Remove(result);
        _digitalPassportDbContext.SaveChanges();
        return result;
    }

    public FavoritePark Update(FavoritePark entity)
    {
        var existingItem = GetById(entity.id);
        _digitalPassportDbContext.Entry(existingItem).CurrentValues.SetValues(entity);
        _digitalPassportDbContext.SaveChanges();
        return existingItem;
    }

    public int Count()
    {
        return _digitalPassportDbContext.FavoriteParks.Count();
    }

    public FavoritePark Create(FavoritePark entity)
    {
        _digitalPassportDbContext.FavoriteParks.Add(entity);
        _digitalPassportDbContext.SaveChanges();
        return entity;
    }

    public List<FavoritePark> GetByUser(int userId)
    {
        return [.. _digitalPassportDbContext.FavoriteParks
            .Where(p => p.userId == userId)];
    }

    public FavoritePark? GetByUserAndPark(int userId, int parkId)
    {
        return _digitalPassportDbContext.FavoriteParks
            .Where(p => p.userId == userId
                && p.parkId == parkId)
            .FirstOrDefault();
    }
}
