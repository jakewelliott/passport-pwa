
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
[Route("/api/activity/favorites")]
[Authorize]
public class FavoritesController(IActivityService activityService) : ControllerBase
{

    //
    // PUBLIC ROUTES
    //

    // ADD FAVORITE PARK
    [HttpPost("parks/favorites/{parkId}")]
    [Authorize(Roles = "visitor,admin")]
    public IActionResult AddFavoritePark(int parkId)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        _activityService.AddFavoritePark(userId, parkId);
        return Ok();
    }

    // GET FAVORITE PARKS
    [HttpGet("parks/favorites")]
    [Authorize(Roles = "visitor,admin")]
    public IActionResult GetFavoriteParks()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(_activityService.GetFavoriteParks(userId));
    }

    // DELETE FAVORITE PARK
    [HttpDelete("parks/favorites/{parkId}")]
    [Authorize(Roles = "visitor,admin")]
    public IActionResult DeleteFavoritePark(int parkId)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        _activityService.DeleteFavoritePark(userId, parkId);
        return Ok();
    }
}