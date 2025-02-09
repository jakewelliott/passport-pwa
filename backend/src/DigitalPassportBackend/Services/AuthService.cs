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
        try {
            var foundUser = userRepository.GetByUsername(user.username);
            throw new ServiceException(StatusCodes.Status409Conflict, "User already exists with that username.");
        } catch (NotFoundException)
        {
            user.password = passwordHasher.HashPassword(user.password);
            userRepository.CreateUser(user);
            return tokenProvider.Create(user);
        };
    }
}