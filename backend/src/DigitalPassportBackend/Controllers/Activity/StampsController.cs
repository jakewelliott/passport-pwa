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
[Route("/api/activity/stamps")]
[Authorize]
public class StampsController : ControllerBase
{
    private readonly IActivityService _activityService;

    public StampsController(IActivityService activityService)
    {
        _activityService = activityService;
    }

    [HttpGet("collected")]
    [Authorize(Roles = "visitor")]
    public IActionResult GetCollectedStamps()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(_activityService.GetCollectedStamps(userId).Select(CollectedStampResponse.FromDomain).ToList());
    }

    [HttpPost("{parkId}")]
    [Authorize(Roles = "visitor")]
    public IActionResult CollectStamp(
        int parkId,
        [FromBody] CollectStampRequest request)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(CollectStampResponse.FromDomain(_activityService.CollectStamp(parkId, userId, request.geopoint, request.method, request.dateTime)));
    }

    public record CollectStampResponse(int id, DateTime createdAt, string method, string parkAbbreviation, int parkId)
    {
        public static CollectStampResponse FromDomain(CollectedStamp stamp)
        {
            return new CollectStampResponse(
                stamp.id,
                stamp.createdAt,
                stamp.method.GetDisplayName(),
                stamp.park.parkAbbreviation,
                stamp.park.id
            );
        }
    }

    public record CollectedStampResponse(DateTime createdAt, string method, string parkAbbreviation, int parkId)
    {
        public static CollectedStampResponse FromDomain(CollectedStamp stamp)
        {
            return new CollectedStampResponse(
                stamp.createdAt,
                stamp.method.GetDisplayName(),
                stamp.park.parkAbbreviation,
                stamp.park.id
            );
        }
    }

    public record CollectStampRequest(
        ActivityController.Geopoint geopoint,
        string method,
        DateTime? dateTime)
    {
    }
} 