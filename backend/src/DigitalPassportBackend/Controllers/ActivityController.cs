using Microsoft.AspNetCore.Mvc;
using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Services;
using Microsoft.OpenApi.Extensions;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using NetTopologySuite.Geometries;
using System.Text.Json;

namespace DigitalPassportBackend.Controllers;

[ApiController]
[Route("/api/activity")]
[Authorize]
public class ActivityController(IActivityService activityService) : ControllerBase
{

    private readonly IActivityService _activityService = activityService;

    [HttpGet("park/{locationId}")]
    [Authorize(Roles = "visitor")]
    public IActionResult Get(int locationId)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(_activityService.GetParkActivity(locationId, userId));
    }

    [HttpPost("stamps/collect/{park_abbreviation}")]
    // [Authorize(Roles = "visitor")]
    public IActionResult CollectStamp(
        string park_abbreviation, 
        [FromBody] CollectStampRequest request)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(CollectStampResponse.FromDomain(_activityService.CollectStamp(park_abbreviation, request.latitude, request.longitude, request.inaccuracyRadius, request.method, request.dateTime, userId)));
    }

    public record CollectStampResponse(int id, DateTime createdAt, string method, string parkAbbreviation)
    {
        public static CollectStampResponse FromDomain(CollectedStamp stamp)
        {
            return new CollectStampResponse(
                stamp.id,
                stamp.createdAt,
                stamp.method.GetDisplayName(),
                stamp.park.parkAbbreviation
            );
        }
    }

    public record CollectStampRequest( double latitude, 
        double longitude,
        double inaccuracyRadius,
        string method, 
        DateTime? dateTime)
    {
    }
}
