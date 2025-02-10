using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Services;

public interface IAuthService
{
    public User GetUserById(int id);
    public string LoginUser(User user);
    public string RegisterUser(User user);
}
