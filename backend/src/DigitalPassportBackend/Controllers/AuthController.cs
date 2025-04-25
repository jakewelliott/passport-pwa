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

    // Public Functionality
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

    // Admin Functionality
    [HttpGet("all")]
    [Authorize(Roles = "admin")]
    public IActionResult GetAllUsers() {
        var users = new List<UserDto>();
        _authService.GetAllUsers().ForEach(user => 
            users.Add(new UserDto {
                username = user.username,
                id= user.id,
                role = user.role.ToString(),
                createdAt = user.createdAt.ToString(),
                updatedAt = user.updatedAt.ToString(),
            })
        );
        return Ok(users);
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