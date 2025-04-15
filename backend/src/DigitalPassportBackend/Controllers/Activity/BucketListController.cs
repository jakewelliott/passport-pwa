


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
    public IActionResult GetBucketListItems()
    {
        var items = _activityService.GetBucketListItems();
        return Ok(items.Select(BucketListItemResponse.FromDomain));
    }

    // GET COMPLETED
    [HttpGet("completed")]
    [Authorize(Roles = "visitor,admin")]
    public IActionResult GetCompletedBucketListItems()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var items = _activityService.GetCompletedBucketListItems(userId);
        return Ok(items.Select(CompletedBucketListItemResponse.FromDomain));
    }

    // TOGGLE COMPLETION
    [HttpPost("{itemId}")]
    [Authorize(Roles = "visitor")]
    public IActionResult ToggleBucketListItemCompletion(int itemId, [FromBody] ToggleBucketListItemCompletionRequest req)
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
    public IActionResult CreateBucketListItem([FromBody] BucketListItemDTO item)
    {
        _activityService.CreateBucketListItem(item);
        return Ok();
    }

    // UPDATE
    [HttpPut("{bucketListId}")]
    [Authorize(Roles = "admin")]
    public IActionResult UpdateBucketListItem([FromBody] BucketListItemDTO item)
    {
        _activityService.UpdateBucketListItem(item);
        return Ok();
    }

    // DELETE
    [HttpDelete("{bucketListId}")]
    public IActionResult DeleteBucketListItem(int bucketListId)
    {
        _activityService.DeleteBucketListItem(bucketListId);
        return Ok();
    }

    public record ToggleBucketListItemCompletionRequest(ActivityController.Geopoint geopoint)
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