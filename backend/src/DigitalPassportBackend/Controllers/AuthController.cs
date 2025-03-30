using Microsoft.AspNetCore.Mvc;
using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace DigitalPassportBackend.Controllers;

[ApiController]
[Route("/api/auth")]
public class AuthController(IAuthService authService) : ControllerBase
{

    private readonly IAuthService _authService = authService;

    [HttpGet]
    [Authorize]
    public IActionResult GetUserDetails()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var user = _authService.GetUserById(userId);

        var userDto = new CurrentUserDto
        {
            username = user.username,
            role = user.role.ToString(),
            token = User.FindFirstValue("token"),
        };
        return Ok(userDto);
    }

    [HttpGet("{userId}")]
    [Authorize(Roles = "admin")]
    public IActionResult Get(int userId)
    {
        var user = _authService.GetUserById(userId);
        var userDto = new UserDto
        {
            id = user.id,
            username = user.username,
            role = user.role.ToString(),
            createdAt = user.createdAt.ToString(),
            updatedAt = user.updatedAt.ToString()
        };
        return Ok(userDto);
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] LoginDto dto)
    {
        var user = new User
        {
            username = dto.username,
            password = dto.password,
            role = UserRole.visitor
        };
        return Ok(_authService.RegisterUser(user));
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginDto dto)
    {
        var user = new User
        {
            username = dto.username,
            password = dto.password,
            role = UserRole.visitor
        };
        return Ok(_authService.LoginUser(user));
    }
}

public class LoginDto
{
    public required string username { get; set; }
    public required string password { get; set; }
}
public class CurrentUserDto
{
    public required string username { get; set; }
    public required string role { get; set; }
    public string? token { get; set; }
}

public class UserDto
{
    public required int id { get; set; }
    public required string username { get; set; }
    public required string role { get; set; }
    public required string createdAt { get; set; }
    public required string updatedAt { get; set; }
}