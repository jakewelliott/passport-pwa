namespace DigitalPassportBackend.Services.Activity;

public interface IFavoritesService
{
    List<int> Get(int userId);
    void Toggle(int userId, int parkId);
}