using System;
using System.Security.Cryptography;

using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;

using NetTopologySuite.Operation.Buffer;

namespace DigitalPassportBackend.Security;
public class PasswordHasher
{
    private const int SaltSize = 16; // 128 bit 
    private const int KeySize = 32; // 256 bit
    private const int Iterations = 10000;

    public void ValidatePassword(User user)
    {
        string password = user.password;
        string username = user.username;

        // Password must be between 8 and 64 characters
        if (password.Length < 8 || password.Length > 64)
        {
            throw new InvalidPasswordException("Password must be between 8 and 64 characters long.");
        }

        // Password cannot contain the username
        if (password.Contains(username, StringComparison.OrdinalIgnoreCase))
        {
            throw new InvalidPasswordException("Password must not include your username.");
        }

        // Password must contain 3 of the following but no spaces
        int characterTypes = 0;
        if (password.Any(char.IsUpper)) characterTypes++; // Uppercase
        if (password.Any(char.IsLower)) characterTypes++; // Lowercase
        if (password.Any(char.IsDigit)) characterTypes++; // Number
        if (password.Any(ch => !char.IsLetterOrDigit(ch))) characterTypes++; // Special character
        if (password.Contains(' '))
        {
            throw new InvalidPasswordException("Password contains an invalid character");
        }
        if (characterTypes < 3)
        {
            throw new InvalidPasswordException("Password must contain at least 3 of the following: uppercase letters, lowercase letters, numbers, or special characters.");
        }

        // Check for common words or sequences
        var commonWords = new[] { "password", "abc", "aaa", "123", "pass" };
        foreach (var word in commonWords)
        {
            if (password.IndexOf(word, StringComparison.OrdinalIgnoreCase) >= 0)
            {
                throw new InvalidPasswordException($"Password must not include common words or sequences such as '{word}'.");
            }
        }
    }

    public string HashPassword(string password)
    {
        using (var algorithm = new Rfc2898DeriveBytes(
            password,
            SaltSize,
            Iterations,
            HashAlgorithmName.SHA256))
        {
            var key = Convert.ToBase64String(algorithm.GetBytes(KeySize));
            var salt = Convert.ToBase64String(algorithm.Salt);

            return $"{Iterations}.{salt}.{key}";
        }
    }

    public bool VerifyPassword(string hash, string password)
    {
        var parts = hash.Split('.', 3);

        if (parts.Length != 3)
        {
            throw new FormatException("Unexpected hash format.");
        }

        var iterations = Convert.ToInt32(parts[0]);
        var salt = Convert.FromBase64String(parts[1]);
        var key = Convert.FromBase64String(parts[2]);

        using (var algorithm = new Rfc2898DeriveBytes(
            password,
            salt,
            iterations,
            HashAlgorithmName.SHA256))
        {
            var keyToCheck = algorithm.GetBytes(KeySize);
            return keyToCheck.SequenceEqual(key);
        }
    }
}
