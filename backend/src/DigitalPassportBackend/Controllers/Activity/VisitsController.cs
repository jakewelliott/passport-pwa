using Microsoft.AspNetCore.Mvc;
using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Services;
using Microsoft.OpenApi.Extensions;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using NetTopologySuite.Geometries;
using NetTopologySuite.Index.HPRtree;
using DigitalPassportBackend.Domain.DTO;

namespace DigitalPassportBackend.Controllers.Activity;

[ApiController]
[Route("/api/activity/visits")]
[Authorize]
public class VisitsController(IActivityService activityService) : ControllerBase
{
    [HttpPost("visit/{parkId}")]
    [Authorize(Roles = "visitor")]
    public IActionResult VisitPark(int parkId, [FromBody] VisitParkRequest req)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(ParkVisitResponse.FromDomain(_activityService.VisitPark(userId, parkId, req.geopoint)));
    }

    [HttpGet("visit")]
    [Authorize(Roles = "visitor")]
    public IActionResult GetVisitedParks()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = _activityService.GetParkVisits(userId).Select(i => new
        {
            id = i.id,
            createdAt = i.createdAt,
            parkId = i.parkId,
        });
        return Ok(result);
    }
}