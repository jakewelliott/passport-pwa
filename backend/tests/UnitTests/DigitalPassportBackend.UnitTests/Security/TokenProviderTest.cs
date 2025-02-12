using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Secutiry;
using DigitalPassportBackend.UnitTests.TestUtils;

using Microsoft.Extensions.Configuration;
using Xunit;

namespace DigitalPassportBackend.UnitTests.Security;

public class TokenProviderTests
{
    private readonly IConfiguration _configuration;
    private readonly TokenProvider _tokenProvider;

    public TokenProviderTests()
    {
        // Setup mock configuration
        _configuration = TestConfiguration.GetConfiguration();

        _tokenProvider = new TokenProvider(_configuration);
    }

    [Fact]
    public void Create_ReturnsValidToken()
    {
        // Arrange
        var user = new User
        {
            id = RandomNumberGenerator.GetInt32(2147483646),
            username = "testuser",
            password = "password",
            role = UserRole.visitor
        };

        // Act
        var token = _tokenProvider.Create(user);

        // Assert
        Assert.NotNull(token);
        Assert.NotEmpty(token);
    }

    [Fact]
    public void Create_TokenContainsCorrectClaims()
    {
        // Arrange
        var user = new User
        {
            id = RandomNumberGenerator.GetInt32(2147483646),
            username = "testuser",
            password = "password",
            role = UserRole.visitor
        };

        // Act
        var token = _tokenProvider.Create(user);

        // Assert
        var handler = new JwtSecurityTokenHandler();
        var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

        Assert.NotNull(jsonToken);
        Assert.Equal(user.id.ToString(), jsonToken!.Claims.First(claim => claim.Type == JwtRegisteredClaimNames.Sub).Value);
        Assert.Equal(user.username, jsonToken.Claims.First(claim => claim.Type == JwtRegisteredClaimNames.UniqueName).Value);
        Assert.Equal(user.role.ToString(), jsonToken.Claims.First(claim => claim.Type == "role").Value);
    }

    [Fact]
    public void Create_TokenHasCorrectIssuerAndAudience()
    {
        // Arrange
        var user = new User
        {
            id = RandomNumberGenerator.GetInt32(2147483646),
            username = "testuser",
            password = "password",
            role = UserRole.visitor
        };

        // Act
        var token = _tokenProvider.Create(user);

        // Assert
        var handler = new JwtSecurityTokenHandler();
        var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

        Assert.NotNull(jsonToken);
        Assert.Equal(_configuration["API_TOKEN_ISSUER"], jsonToken!.Issuer);
        Assert.Equal(_configuration["API_TOKEN_AUDIENCE"], jsonToken.Audiences.FirstOrDefault());
    }

    [Fact]
    public void Create_TokenHasCorrectExpirationTime()
    {
        // Arrange
        var user = new User
        {
            id = RandomNumberGenerator.GetInt32(2147483646),
            username = "testuser",
            password = "password",
            role = UserRole.visitor
        };

        // Act
        var token = _tokenProvider.Create(user);

        // Assert
        var handler = new JwtSecurityTokenHandler();
        var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

        Assert.NotNull(jsonToken);
        var expectedExpiration = DateTime.UtcNow.AddSeconds(_configuration.GetValue<int>("API_TOKEN_EXPIRATION"));
        Assert.True(jsonToken!.ValidTo >= expectedExpiration.AddSeconds(-5) && jsonToken.ValidTo <= expectedExpiration.AddSeconds(5));
    }
}
