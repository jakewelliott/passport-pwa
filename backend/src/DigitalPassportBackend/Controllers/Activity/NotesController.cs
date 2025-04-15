using Microsoft.AspNetCore.Mvc;
using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Services;
using Microsoft.OpenApi.Extensions;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using NetTopologySuite.Geometries;
using NetTopologySuite.Index.HPRtree;
using DigitalPassportBackend.Domain.DTO;

namespace DigitalPassportBackend.Controllers;

[ApiController]
[Route("/api/activity/notes")]
[Authorize]
public class NotesController(IActivityService activityService) : ControllerBase
{

    private readonly IActivityService _activityService = activityService;

    //
    // PUBLIC ROUTES
    //

    // CREATE UPDATE NOTE
    [HttpPost("notes/{parkId}")]
    [Authorize(Roles = "visitor,admin")]
    public IActionResult CreateUpdateNote(int parkId, [FromBody] PrivateNoteRequest req)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(PrivateNoteResponse.FromDomain(_activityService.CreateUpdatePrivateNote(userId, parkId, req.note, req.updatedAt)));
    }

    // GET PARK NOTE
    [HttpGet("notes/{parkId}")]
    [Authorize(Roles = "visitor,admin")]
    public IActionResult GetParkNote(int parkId)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(PrivateNoteResponse.FromDomain(_activityService.GetParkNote(userId, parkId)));
    }

    // GET ALL NOTES
    [HttpGet("notes")]
    [Authorize(Roles = "visitor,admin")]
    public IActionResult GetNotes()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(_activityService.GetNotes(userId).Select(PrivateNoteResponse.FromDomain).ToList());
    }
}