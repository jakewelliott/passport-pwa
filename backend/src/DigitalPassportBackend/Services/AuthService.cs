using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.Security;
using DigitalPassportBackend.Secutiry;

namespace DigitalPassportBackend.Services;

public class AuthService(
    IUserRepository userRepository,
    IPasswordHasher passwordHasher,
    ITokenProvider tokenProvider) : IAuthService
{
    // Public Functionality
    public string RegisterUser(User user)
    {
        var restrictedKeywords = new[] { "admin", "anon", "guest", "visitor", "test" };

        // Check if the username contains any restricted keyword
        foreach (var keyword in restrictedKeywords)
        {
            if (user.username.Contains(keyword, StringComparison.OrdinalIgnoreCase))
            {
                throw new ServiceException(StatusCodes.Status400BadRequest,
                    $"Username cannot contain '{keyword}'.");
            }
        }
        try
        {
            var foundUser = userRepository.GetByUsername(user.username);
            throw new ServiceException(StatusCodes.Status409Conflict, "User already exists with that username.");
        }
        catch (NotFoundException)
        {
            passwordHasher.ValidatePassword(user);
            user.password = passwordHasher.HashPassword(user.password);
            userRepository.Create(user);
            return tokenProvider.Create(user);
        };
    }
    
    public User GetUserById(int id)
    {
        User user = userRepository.GetById(id)!;
        user.password = "HIDDEN FOR USER PROTECTION";
        return user;
    }
    
    public string LoginUser(User user)
    {
        User foundUser = userRepository.GetByUsername(user.username)!;
        bool verified = passwordHasher.VerifyPassword(foundUser.password, user.password);
        if (!verified)
        {
            throw new ServiceException(StatusCodes.Status401Unauthorized, "The password was not correct.");
        }
        return tokenProvider.Create(foundUser);
    }

    // Admin Functionality
    public void UpdatePassword(int userId, string password)
    {
        var user = userRepository.GetById(userId);
        user.password = passwordHasher.HashPassword(password);
        passwordHasher.ValidatePassword(user);
        userRepository.Update(user);
    }

    public void UpdateRole(int userId, string role)
    {
        var user = userRepository.GetById(userId);
        user.role = Enum.Parse<UserRole>(role);
        userRepository.Update(user);
    }

}