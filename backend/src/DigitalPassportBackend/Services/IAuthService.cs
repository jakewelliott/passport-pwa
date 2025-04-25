using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Services;

public interface IAuthService
{
    // Public Functionality
    public string RegisterUser(User user);
    public User GetUserById(int id);
    public string LoginUser(User user);

    // Admin Functionality
    public void UpdatePassword(int userId, string password);
    public void UpdateRole(int userId, string role);
    public List<User> GetAllUsers();
}
