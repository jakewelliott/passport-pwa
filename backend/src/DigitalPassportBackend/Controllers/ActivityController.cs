using Microsoft.AspNetCore.Mvc;
using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Services;
using Microsoft.OpenApi.Extensions;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using NetTopologySuite.Geometries;
using NetTopologySuite.Index.HPRtree;

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

    [HttpGet("stamps/collected")]
    [Authorize(Roles = "visitor")]
    public IActionResult GetCollectedStamps()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(_activityService.GetCollectedStamps(userId).Select(CollectedStampResponse.FromDomain).ToList());
    }

    [HttpPost("stamps/{parkAbbreviation}")]
    [Authorize(Roles = "visitor")]
    public IActionResult CollectStamp(
        string parkAbbreviation, 
        [FromBody] CollectStampRequest request)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(CollectStampResponse.FromDomain(_activityService.CollectStamp(parkAbbreviation, request.longitude, request.latitude, request.inaccuracyRadius, request.method, request.dateTime, userId)));
    }

    [HttpPost("notes/{parkAbbreviation}")]
    [Authorize(Roles = "visitor,admin")]
    public IActionResult CreateUpdateNote(string parkAbbreviation, [FromBody] PrivateNoteRequest req)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(PrivateNoteResponse.FromDomain(_activityService.CreateUpdatePrivateNote(parkAbbreviation, userId, req.note, req.updatedAt)));
    }

    // ADAM: added these for frontend type safety

    [HttpGet("bucketlist")]
    public IActionResult GetBucketListItems()
    {
        var items = _activityService.GetBucketListItems();
        return Ok(items.Select(BucketListItemResponse.FromDomain));
    }

    [HttpGet("bucketlist/completed")]
    [Authorize(Roles = "visitor")]
    public IActionResult GetCompletedBucketListItems()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var items = _activityService.GetCompletedBucketListItems(userId);
        return Ok(items.Select(CompletedBucketListItemResponse.FromDomain));
    }

    [HttpPost("bucketlist/{itemId}")]
    [Authorize(Roles = "visitor")]
    public IActionResult ToggleBucketListItemCompletion(int itemId, [FromBody] ToggleBucketListItemCompletionRequest req)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = _activityService.ToggleBucketListItemCompletion(itemId, userId, req.longitude, req.latitude);
        return Ok(CompletedBucketListItemResponse.FromDomain(result));
    }

    [HttpGet("visit")]
    [Authorize(Roles = "visitor")]
    public IActionResult GetLatestVisitedParks()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(_activityService.GetAllLatestParkVisits(userId).Select(ParkVisitResponse.FromDomain));
    }

    [HttpPost("visit/{parkAbbreviation}")]
    [Authorize(Roles = "visitor")]
    public IActionResult VisitPark(string parkAbbreviation, [FromBody] VisitParkRequest req)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(ParkVisitResponse.FromDomain(_activityService.VisitPark(userId, parkAbbreviation, req.longitude, req.latitude, req.inaccuracyRadius)));
    }

    public record VisitParkRequest(double longitude, double latitude, double inaccuracyRadius)
    {
    }

    public record ParkVisitResponse(int id, DateTime createdAt, string parkAbbreviation)
    {
        public static ParkVisitResponse FromDomain(ParkVisit visit)
        {
            return new(
                visit.id,
                visit.createdAt,
                visit.park.parkAbbreviation
            );
        }
    }

    public record ToggleBucketListItemCompletionRequest(double longitude, double latitude)
    {
    }

    public record CompletedBucketListItemResponse(int id, int bucketListItemId, DateTime updatedAt)
    {
        public static CompletedBucketListItemResponse FromDomain(CompletedBucketListItem item)
        {
            return new CompletedBucketListItemResponse(
                item.id,
                item.bucketListItemId,
                item.updated_at
            );
        }
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

    public record CollectedStampResponse(DateTime createdAt, string method, string parkAbbreviation)
    {
        public static CollectedStampResponse FromDomain(CollectedStamp stamp)
        {
            return new CollectedStampResponse(
                stamp.createdAt,
                stamp.method.GetDisplayName(),
                stamp.park.parkAbbreviation
            );
        }
    }

    public record CollectStampRequest(
				double latitude, 
        double longitude,
        double inaccuracyRadius,
        string method, 
        DateTime? dateTime)
    {
    }

    public record PrivateNoteResponse(int id, string note)
    {
        public static PrivateNoteResponse FromDomain(PrivateNote note)
        {
            return new PrivateNoteResponse(note.id, note.note);
        }
    }

    public record PrivateNoteRequest(string note, DateTime updatedAt)
    {
    }

    public record BucketListItemResponse(int id, string task, DateTime createdAt, int? parkId, string? parkName)
    {
        public static BucketListItemResponse FromDomain(BucketListItem item)
        {
            return new BucketListItemResponse(
                item.id,
                item.task,
                item.createdAt,
                item.parkId,
                item.park?.parkName
            );
        }
    }
}
