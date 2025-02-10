using System.Security.Claims;
using System.Text;
using DigitalPassportBackend.Domain;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace DigitalPassportBackend.Secutiry;
public class TokenProvider(IConfiguration configuration)
{
    public string Create(User user)
    {
        string secretKey = configuration["API_TOKEN_KEY"]!;
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var tokenDescriptor = new SecurityTokenDescriptor{
            Subject = new ClaimsIdentity(
                [
                    new Claim(JwtRegisteredClaimNames.Sub, user.id.ToString()),
                    new Claim(JwtRegisteredClaimNames.UniqueName, user.username),
                    new Claim("role", user.role.ToString())
                ]
            ),
            Expires = DateTime.UtcNow.AddSeconds(configuration.GetValue<int>("API_TOKEN_EXPIRATION")),
            SigningCredentials = credentials,
            Issuer = configuration["API_TOKEN_ISSUER"]!,
            Audience = configuration["API_TOKEN_AUDIENCE"]!
        };

        var handler = new JsonWebTokenHandler();

        string token = handler.CreateToken(tokenDescriptor);

        return token;
    }
}