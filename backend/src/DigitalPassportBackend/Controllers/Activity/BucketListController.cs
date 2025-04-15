using Microsoft.AspNetCore.Mvc;
using DigitalPassportBackend.Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using DigitalPassportBackend.Domain.DTO;

namespace DigitalPassportBackend.Controllers.Activity;

[ApiController]
[Route("/api/activity/bucketlist")]
[Authorize]
public class BucketListController : ControllerBase
{
    private readonly IActivityService _activityService;

    public BucketListController(IActivityService activityService)
    {
        _activityService = activityService;
    }

    //
    // PUBLIC ROUTES
    //

    // GET ALL
    [HttpGet("")]
    [Authorize(Roles = "visitor,admin")]
    public IActionResult GetAll()
    {
        var items = _activityService.GetBucketListItems();
        return Ok(items.Select(BucketListItemDTO.FromDomain));
    }

    // GET COMPLETED
    [HttpGet("completed")]
    [Authorize(Roles = "visitor,admin")]
    public IActionResult GetCompleted()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var items = _activityService.GetCompletedBucketListItems(userId);
        return Ok(items.Select(CompletedBucketListItemResponse.FromDomain));
    }

    // TOGGLE COMPLETION
    [HttpPost("{itemId}")]
    [Authorize(Roles = "visitor")]
    public IActionResult ToggleCompleted(int itemId, [FromBody] ToggleBucketListItemCompletionRequest req)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = _activityService.ToggleBucketListItemCompletion(itemId, userId, req.geopoint);
        return Ok(CompletedBucketListItemResponse.FromDomain(result));
    }

    //
    // ADMIN ROUTES
    //

    // CREATE
    [HttpPost("")]
    [Authorize(Roles = "admin")]
    public IActionResult Create([FromBody] BucketListItemDTO item)
    {
        _activityService.CreateBucketListItem(item);
        return Ok();
    }

    // UPDATE
    [HttpPut("{bucketListId}")]
    [Authorize(Roles = "admin")]
    public IActionResult Update([FromBody] BucketListItemDTO item)
    {
        _activityService.UpdateBucketListItem(item);
        return Ok();
    }

    // DELETE
    [HttpDelete("{bucketListId}")]
    [Authorize(Roles = "admin")]
    public IActionResult Delete(int bucketListId)
    {
        _activityService.DeleteBucketListItem(bucketListId);
        return Ok();
    }
} 