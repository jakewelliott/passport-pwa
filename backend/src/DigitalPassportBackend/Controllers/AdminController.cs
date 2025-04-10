using DigitalPassportBackend.Domain.DTO;
using DigitalPassportBackend.Services;

using Microsoft.AspNetCore.Authorization;

using Microsoft.AspNetCore.Mvc;

namespace DigitalPassportBackend.Controllers;

[ApiController]
[Route("/api")]
public class AdminController(IAdminService adminService) : ControllerBase
{
    private readonly IAdminService _adminService = adminService;

    //
    // Locations
    // 
    
    [HttpPost("locations")]
    [Authorize(Roles = "admin")]
    public IActionResult CreatePark([FromBody] ParkDTO park)
    {
        var p = park.ToDomain(0, out var addrs, out var icons, out var blItems, out var photos);
        _adminService.CreatePark(p, addrs, icons, blItems, photos);
        return Ok();
    }

    [HttpPut("locations/{parkId}")]
    [Authorize(Roles = "admin")]
    public IActionResult UpdatePark(int parkId, [FromBody] ParkDTO park)
    {
        var p = park.ToDomain(parkId, out var addrs, out var icons, out var blItems, out var photos);
        _adminService.UpdatePark(p, addrs, icons, blItems, photos);
        return Ok();
    }

    [HttpDelete("locations/{parkId}")]
    [Authorize(Roles = "admin")]
    public IActionResult DeletePark(int parkId)
    {
        _adminService.DeletePark(parkId);
        return Ok();
    }
}