
using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using System.Security.Claims;

namespace DigitalPassportBackend.Controllers.Activity;

[ApiController]
[Route("/api/activity/favorites")]
[Authorize]
public class FavoritesController(IFavoritesService favoritesService) : ControllerBase
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