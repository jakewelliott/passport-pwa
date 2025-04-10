using DigitalPassportBackend.Domain.DTO;
using DigitalPassportBackend.Services;

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
    public IActionResult CreatePark([FromBody] ParkDTO park)
    {
        var p = park.ToDomain(out var addrs, out var icons, out var blItems, out var photos);
        _adminService.CreatePark(p, addrs, icons, blItems, photos);
        return Ok();
    }

    [HttpPut("locations/{parkId}")]
    public IActionResult UpdatePark(int parkId, [FromBody] ParkDTO park)
    {

    }

    [HttpDelete("locations/{parkId}")]
    public IActionResult DeletePark(int parkId)
    {

    }
}