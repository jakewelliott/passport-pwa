using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Persistence.Repository;

public interface IFavoriteParkRepository : IRepository<FavoritePark>
{
	// CREATE

	// READ
	List<FavoritePark> GetByUser(int userId);
	FavoritePark? GetByUserAndPark(int userId, int parkId);

	// UPDATE

	// DELETE
}
