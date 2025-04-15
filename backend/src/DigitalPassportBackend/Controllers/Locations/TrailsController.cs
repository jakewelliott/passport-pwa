using Microsoft.AspNetCore.Mvc;
using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Domain.DTO;
using DigitalPassportBackend.Services;
using Microsoft.AspNetCore.Authorization;
using DigitalPassportBackend.Errors;

namespace DigitalPassportBackend.Controllers.Locations;

[ApiController]
[Route("/api/locations/trails")]
public class TrailsController : ControllerBase
{
    private readonly ILocationsService _locationsService;

    public TrailsController(ILocationsService locationsService)
    {
        _locationsService = locationsService;
    }

    // PUBLIC ROUTES

    [HttpGet("")]
    [Authorize(Roles = "visitor,admin")]
    public IActionResult GetAllTrails()
    {
        return Ok(_locationsService.GetAllTrails()
            .Select(t => TrailDTO.FromDomain(t, _locationsService.GetTrailIcons(t.id))));
    }

    // ADMIN ROUTES

    [HttpPost("")]
    [Authorize(Roles = "admin")]
    public IActionResult CreateTrail([FromBody] TrailDTO trail)
    {
        var t = trail.ToDomain(out var icons);
        _locationsService.CreateTrail(t, icons);
        return Ok();
    }

    [HttpPut("")]
    [Authorize(Roles = "admin")]
    public IActionResult UpdateTrail([FromBody] TrailDTO trail)
    {
        var t = trail.ToDomain(out var icons);
        _locationsService.UpdateTrail(t, icons);
        return Ok();
    }

    [HttpDelete("{trailId}")]
    [Authorize(Roles = "admin")]
    public IActionResult DeleteTrail(int trailId)
    {
        _locationsService.DeleteTrail(trailId);
        return Ok();
    }
}