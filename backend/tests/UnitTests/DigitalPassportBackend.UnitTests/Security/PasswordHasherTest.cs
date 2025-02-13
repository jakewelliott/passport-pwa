using System;
using Xunit;
using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Security;

namespace DigitalPassportBackend.Tests.Security;

public class PasswordHasherTests
{
    private readonly PasswordHasher _passwordHasher;

    public PasswordHasherTests()
    {
        _passwordHasher = new PasswordHasher();
    }

    [Fact]
    public void ValidatePassword_ValidPassword_DoesNotThrow()
    {
        var user = new User { username = "newUser", password = "ValidPswrd!312", role = UserRole.visitor };
        _passwordHasher.ValidatePassword(user);
    }

    [Fact]
    public void ValidatePassword_PasswordTooShort_ThrowsInvalidPasswordException()
    {
        var user = new User { username = "newUser", password = "Vp!312", role = UserRole.visitor };
        var exception = Assert.Throws<InvalidPasswordException>(() => _passwordHasher.ValidatePassword(user));
        Assert.Equal("Password must be between 8 and 64 characters long.", exception.ErrorMessage);
    }

    [Fact]
    public void ValidatePassword_PasswordTooLong_ThrowsInvalidPasswordException()
    {
        var user = new User { username = "newUser", password = new string('A', 65) + "1!", role = UserRole.visitor };
        var exception = Assert.Throws<InvalidPasswordException>(() => _passwordHasher.ValidatePassword(user));
        Assert.Equal("Password must be between 8 and 64 characters long.", exception.ErrorMessage);
    }

    [Fact]
    public void ValidatePassword_PasswordContainsUsername_ThrowsInvalidPasswordException()
    {
        var user = new User { username = "newUser", password = "newuser!1", role = UserRole.visitor };
        var exception = Assert.Throws<InvalidPasswordException>(() => _passwordHasher.ValidatePassword(user));
        Assert.Equal("Password must not include your username.", exception.ErrorMessage);
    }

    [Fact]
    public void ValidatePassword_PasswordContainsSpace_ThrowsInvalidPasswordException()
    {
        var user = new User { username = "newUser", password = "newUs3r !1", role = UserRole.visitor };
        var exception = Assert.Throws<InvalidPasswordException>(() => _passwordHasher.ValidatePassword(user));
        Assert.Equal("Password contains an invalid character", exception.ErrorMessage);
        
    }

    [Theory]
    [InlineData("new3user1")]
    [InlineData("NEW3USER1")]
    [InlineData("new@user!")]
    [InlineData("NEW@USER!")]
    [InlineData("187542524!")]
    [InlineData("newuuserr")]
    public void ValidatePassword_PasswordDoesNotMeetCharacterRequirements_ThrowsInvalidPasswordException(string password)
    {
        var user = new User { username = "newUser", password = password, role = UserRole.visitor };
        var exception = Assert.Throws<InvalidPasswordException>(() => _passwordHasher.ValidatePassword(user));
        Assert.Equal("Password must contain at least 3 of the following: uppercase letters, lowercase letters, numbers, or special characters.", exception.ErrorMessage);
    }

    [Theory]
    [InlineData("Password132!")]
    [InlineData("abc54321!")]
    [InlineData("aaa54321!")]
    [InlineData("new4User123!")]
    public void ValidatePassword_PasswordContainsCommonWordOrSequence_ThrowsInvalidPasswordException(string password)
    {
        var user = new User { username = "newUser", password = password, role = UserRole.visitor };
        var exception = Assert.Throws<InvalidPasswordException>(() => _passwordHasher.ValidatePassword(user));
        Assert.Contains("Password must not include common words or sequences such as ", exception.ErrorMessage);
    }

    [Fact]
    public void HashPassword_ValidPassword_ReturnsHashedPassword()
    {
        var password = "newUser!312";
        var hashedPassword = _passwordHasher.HashPassword(password);
        Assert.Matches(@"^\d+\.[A-Za-z0-9+/]+=*\.[A-Za-z0-9+/]+=*$", hashedPassword);
    }

    [Fact]
    public void VerifyPassword_CorrectPassword_ReturnsTrue()
    {
        var password = "newUser!312";
        var hash = _passwordHasher.HashPassword(password);
        Assert.True(_passwordHasher.VerifyPassword(hash, password));
    }

    [Fact]
    public void VerifyPassword_IncorrectPassword_ReturnsFalse()
    {
        var correctPassword = "newUser!312";
        var incorrectPassword = "wrongUser!312";
        var hash = _passwordHasher.HashPassword(correctPassword);
        Assert.False(_passwordHasher.VerifyPassword(hash, incorrectPassword));
    }

    [Fact]
    public void VerifyPassword_InvalidHashFormat_ThrowsFormatException()
    {
        var hash = "1324.invalidhash";
        var password = "newUser!312";
        Assert.Throws<FormatException>(() => _passwordHasher.VerifyPassword(hash, password));
    }

    [Fact]
    public void VerifyPassword_InvalidIterationCount_ThrowsFormatException()
    {
        var hash = "invalidIteration.abc.def";
        var password = "newUser!312";
        Assert.Throws<FormatException>(() => _passwordHasher.VerifyPassword(hash, password));
    }

    [Fact]
    public void VerifyPassword_NullInput_ThrowsNullReferenceException()
    {
        Assert.Throws<NullReferenceException>(() => _passwordHasher.VerifyPassword(null!, "newUser!312"));
    }

    [Fact]
    public void VerifyPassword_NullInput_ThrowsFormatException()
    {

        Assert.Throws<FormatException>(() => _passwordHasher.VerifyPassword("10000.abc.def", null!));
    }
}
