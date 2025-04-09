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