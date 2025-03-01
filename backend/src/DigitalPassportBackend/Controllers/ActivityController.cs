using Microsoft.AspNetCore.Mvc;
using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Services;
using Microsoft.OpenApi.Extensions;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

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
    [Authorize(Roles = "visitor")]
    public IActionResult CreateNote(string parkAbbreviation, [FromBody] PrivateNoteRequest req)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(PrivateNoteResponse.FromDomain(_activityService.CreatePrivateNote(parkAbbreviation, userId, req.note)));
    }
    
    [HttpPost("notes/update/{noteId}")]
    [Authorize(Roles = "visitor")]
    public IActionResult UpdateNote(int noteId, [FromBody] PrivateNoteRequest req)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(PrivateNoteResponse.FromDomain(_activityService.UpdatePrivateNote(noteId, userId, req.note)));
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

    public record CollectStampRequest( double latitude, 
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

    public record PrivateNoteRequest(string note)
    {
    }
}
