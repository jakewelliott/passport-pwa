using System;
using Xunit;
using Moq;
using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.Security;
using DigitalPassportBackend.Services;
using Microsoft.AspNetCore.Http;
using DigitalPassportBackend.Secutiry;
using Microsoft.Extensions.Configuration;

namespace DigitalPassportBackend.UnitTests.Services;
public class AuthServiceTests
{
    private readonly Mock<IUserRepository> _mockUserRepository;
    private readonly Mock<IPasswordHasher> _mockPasswordHasher;
    private readonly Mock<ITokenProvider> _mockTokenProvider;
    private readonly Mock<IConfiguration> _mockConfiguration;
    private readonly AuthService _authService;

    public AuthServiceTests()
    {
        _mockUserRepository = new Mock<IUserRepository>();
        _mockPasswordHasher = new Mock<IPasswordHasher>();
        _mockConfiguration = new Mock<IConfiguration>();
        _mockTokenProvider = new Mock<ITokenProvider>();
        _authService = new AuthService(_mockUserRepository.Object, _mockPasswordHasher.Object, _mockTokenProvider.Object);
    }

    private void SetupTokenProvider()
    {
        _mockTokenProvider.Setup(tp => tp.Create(It.IsAny<User>()))
            .Returns((User user) => $"mocked_token_for_{user.username}");
    }

    [Fact]
    public void GetUserById_ValidUserId_ReturnsUser()
    {
        // Arrange
        var userId = 1;
        var user = new User { id = userId, username = "testUser", password = "hashedPassword", role = UserRole.visitor };
        _mockUserRepository.Setup(repo => repo.GetById(userId)).Returns(user);

        // Act
        var result = _authService.GetUserById(userId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(userId, result.id);
        Assert.Equal("HIDDEN FOR USER PROTECTION", result.password);
    }

    [Fact]
    public void GetUserById_InvalidUserId_ThrowsException()
    {
        // Arrange
        var userId = 0;
        _mockUserRepository.Setup(repo => repo.GetById(userId))
            .Throws(new NotFoundException($"User not found with id {userId}"));

        // Act & Assert
        Assert.Throws<NotFoundException>(() => _authService.GetUserById(userId));
    }

    [Fact]
    public void LoginUser_ValidCredentials_ReturnsToken()
    {
        // Arrange
        var user = new User { username = "validUser", password = "Pswrd!132", role = UserRole.visitor };
        var foundUser = new User { username = "validUser", password = "hashedPassword", role = UserRole.visitor };
        _mockUserRepository.Setup(repo => repo.GetByUsername("validUser")).Returns(foundUser);
        _mockPasswordHasher.Setup(hasher => hasher.VerifyPassword("hashedPassword", "Pswrd!132")).Returns(true);
        _mockTokenProvider.Setup(provider => provider.Create(foundUser)).Returns("token");

        // Act
        var result = _authService.LoginUser(user);

        // Assert
        Assert.Equal("token", result);
    }

    [Fact]
    public void LoginUser_InvalidPassword_ThrowsServiceException()
    {
        // Arrange
        var user = new User { username = "validUser", password = "pswrd!132", role = UserRole.visitor };
        var foundUser = new User { username = "validUser", password = "hashedPassword", role = UserRole.visitor };
        _mockUserRepository.Setup(repo => repo.GetByUsername("validUser")).Returns(foundUser);
        _mockPasswordHasher.Setup(hasher => hasher.VerifyPassword("hashedPassword", "pswrd!132")).Returns(false);

        // Act & Assert
        var exception = Assert.Throws<ServiceException>(() => _authService.LoginUser(user));
        Assert.Equal(StatusCodes.Status401Unauthorized, exception.StatusCode);
        Assert.Equal("The password was not correct.", exception.ErrorMessage);
    }

    [Fact]
    public void LoginUser_EmptyPassword_ThrowsServiceException()
    {
        // Arrange
        var user = new User { username = "validUser", password = "", role = UserRole.visitor };
        var foundUser = new User { username = "validUser", password = "hashedPassword", role = UserRole.visitor };
        _mockUserRepository.Setup(repo => repo.GetByUsername("validUser")).Returns(foundUser);
        _mockPasswordHasher.Setup(hasher => hasher.VerifyPassword("hashedPassword", "")).Returns(false);

        // Act & Assert
        var exception = Assert.Throws<ServiceException>(() => _authService.LoginUser(user));
        Assert.Equal(StatusCodes.Status401Unauthorized, exception.StatusCode);
        Assert.Equal("The password was not correct.", exception.ErrorMessage);
    }

    [Fact]
    public void LoginUser_NullPassword_ThrowsServiceException()
    {
        // Arrange
        var user = new User { username = "validUser", password = null!, role = UserRole.visitor };
        var foundUser = new User { username = "validUser", password = "hashedPassword", role = UserRole.visitor };
        _mockUserRepository.Setup(repo => repo.GetByUsername("validUser")).Returns(foundUser);
        _mockPasswordHasher.Setup(hasher => hasher.VerifyPassword("hashedPassword", null!)).Returns(false);

        // Act & Assert
        var exception = Assert.Throws<ServiceException>(() => _authService.LoginUser(user));
        Assert.Equal(StatusCodes.Status401Unauthorized, exception.StatusCode);
        Assert.Equal("The password was not correct.", exception.ErrorMessage);
    }

    [Fact]
    public void LoginUser_InvalidUsername_ThrowsNotFoundException()
    {
        // Arrange
        var user = new User { username = "doesnotexist", password = "Pswrd!132", role = UserRole.visitor };
        _mockUserRepository.Setup(repo => repo.GetByUsername("doesnotexist")).Throws(new NotFoundException("User not found with username doesnotexist."));

        // Act & Assert
        var exception = Assert.Throws<NotFoundException>(() => _authService.LoginUser(user));
        Assert.Equal("User not found with username doesnotexist.", exception.ErrorMessage);
    }

    [Fact]
    public void LoginUser_NullUser_ThrowsNullReferenceException()
    {
        // Act & Assert
        Assert.Throws<NullReferenceException>(() => _authService.LoginUser(null!));
    }

    [Fact]
    public void RegisterUser_ValidUser_ReturnsToken()
    {
        SetupTokenProvider();
        // Arrange
        var user = new User { username = "newUser", password = "validPass!312", role = UserRole.visitor };
        _mockUserRepository.Setup(repo => repo.GetByUsername("newUser")).Throws(new NotFoundException(message: ""));
        _mockPasswordHasher.Setup(hasher => hasher.ValidatePassword(user));
        _mockPasswordHasher.Setup(hasher => hasher.HashPassword("validPass!312")).Returns("hashedPassword");
        _mockUserRepository.Setup(repo => repo.Create(It.IsAny<User>()));
        _mockTokenProvider.Setup(provider => provider.Create(It.IsAny<User>())).Returns("token");

        // Act
        var result = _authService.RegisterUser(user);

        // Assert
        Assert.Equal("token", result);
    }

    [Theory]
    [InlineData("newAdmin", "validPass!312", "admin")]
    [InlineData("banon123", "validPass!312", "anon")]
    [InlineData("bguest123", "validPass!312", "guest")]
    [InlineData("bvisitor123", "validPass!312", "visitor")]
    [InlineData("test", "validPass!312", "test")]
    [InlineData("testguest", "validPass!312", "guest")]
    public void RegisterUser_RestrictedUsername_ThrowsServiceException(string username, string password, string restrictedWord)
    {
        // Arrange
        var user = new User { username = username, password = password, role = UserRole.visitor };

        // Act & Assert
        var exception = Assert.Throws<ServiceException>(() => _authService.RegisterUser(user));
        Assert.Equal(StatusCodes.Status400BadRequest, exception.StatusCode);
        Assert.Equal($"Username cannot contain '{restrictedWord}'.", exception.ErrorMessage);
    }

    [Fact]
    public void RegisterUser_ExistingUsername_ThrowsServiceException()
    {
        // Arrange
        var user = new User { username = "newUser", password = "validPass!312", role = UserRole.visitor };
        _mockUserRepository.Setup(repo => repo.GetByUsername("newUser")).Returns(user);

        // Act & Assert
        var exception = Assert.Throws<ServiceException>(() => _authService.RegisterUser(user));
        Assert.Equal(StatusCodes.Status409Conflict, exception.StatusCode);
        Assert.Equal("User already exists with that username.", exception.ErrorMessage);
    }
}
