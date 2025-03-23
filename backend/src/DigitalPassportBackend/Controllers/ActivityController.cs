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

    [HttpGet("stamps/collected")]
    [Authorize(Roles = "visitor")]
    public IActionResult GetCollectedStamps()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(_activityService.GetCollectedStamps(userId).Select(CollectedStampResponse.FromDomain).ToList());
    }

    [HttpPost("stamps/{parkId}")]
    [Authorize(Roles = "visitor")]
    public IActionResult CollectStamp(
        int parkId,
        [FromBody] CollectStampRequest request)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(CollectStampResponse.FromDomain(_activityService.CollectStamp(parkId, userId, request.geopoint, request.method, request.dateTime)));
    }

    [HttpPost("notes/{parkId}")]
    [Authorize(Roles = "visitor,admin")]
    public IActionResult CreateUpdateNote(int parkId, [FromBody] PrivateNoteRequest req)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(PrivateNoteResponse.FromDomain(_activityService.CreateUpdatePrivateNote(parkId, userId, req.note, req.updatedAt)));
    }

    [HttpGet("notes/{parkId}")]
    [Authorize(Roles = "visitor,admin")]
    public IActionResult GetParkNote(int parkId)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(PrivateNoteResponse.FromDomain(_activityService.GetParkNote(parkId, userId)));
    }

    [HttpGet("notes")]
    [Authorize(Roles = "visitor,admin")]
    public IActionResult GetNotes()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(_activityService.GetNotes(userId).Select(PrivateNoteResponse.FromDomain).ToList());
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
        var result = _activityService.ToggleBucketListItemCompletion(itemId, userId, req.geopoint);
        return Ok(CompletedBucketListItemResponse.FromDomain(result));
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

    [HttpPost("visit/{parkId}")]
    [Authorize(Roles = "visitor")]
    public IActionResult VisitPark(int parkId, [FromBody] VisitParkRequest req)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(ParkVisitResponse.FromDomain(_activityService.VisitPark(userId, parkId, req.geopoint)));
    }

		public record Geopoint(double latitude, double longitude, double inaccuracyRadius)
		{}


    public record VisitParkRequest(Geopoint geopoint)
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

    
    public record ToggleBucketListItemCompletionRequest(Geopoint geopoint)
    {}

    public record CompletedBucketListItemResponse(int id, int bucketListItemId, DateTime updatedAt)
    {
        public static CompletedBucketListItemResponse FromDomain(CompletedBucketListItem item)
        {
            return new CompletedBucketListItemResponse(
                item.id,
                item.bucketListItemId,
                item.updatedAt
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
        Geopoint geopoint,
        string method,
        DateTime? dateTime)
    {
    }

    public record PrivateNoteResponse(string parkAbbreviation, string note, DateTime updatedAt)
    {
        public static PrivateNoteResponse FromDomain(PrivateNote note)
        {
            return new PrivateNoteResponse(note.park != null ? note.park.parkAbbreviation : "generalNotes", note.note, note.updatedAt);
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
