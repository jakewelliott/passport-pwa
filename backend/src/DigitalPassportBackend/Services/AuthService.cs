using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.Security;
using DigitalPassportBackend.Secutiry;

namespace DigitalPassportBackend.Services;

public class AuthService(
    UserRepository userRepository,
    PasswordHasher passwordHasher,
    TokenProvider tokenProvider) : IAuthService
{

    public User GetUserById(int id)
    {
        User user = userRepository.GetById(id)!;
        user.password = "HIDDEN FOR USER PROTECTION";
        return userRepository.GetById(id)!;
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

    public string RegisterUser(User user)
    {
        var restrictedKeywords = new[] { "admin", "anon", "anonymous", "guest", "visitor", "test" };

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
            userRepository.CreateUser(user);
            return tokenProvider.Create(user);
        };
    }
}