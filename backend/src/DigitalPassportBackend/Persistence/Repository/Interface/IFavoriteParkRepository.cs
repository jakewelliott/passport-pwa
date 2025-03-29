using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Persistence.Repository;

public interface IFavoriteParkRepository : IRepository<FavoritePark>
{
	List<FavoritePark> GetByUser(int userId);
	FavoritePark? GetByUserAndPark(int userId, int parkId);
}
