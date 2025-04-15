// using Microsoft.AspNetCore.Mvc;
// using DigitalPassportBackend.Domain;
// using DigitalPassportBackend.Services;
// using Microsoft.OpenApi.Extensions;
// using Microsoft.AspNetCore.Authorization;
// using System.Security.Claims;
// using NetTopologySuite.Geometries;
// using NetTopologySuite.Index.HPRtree;
// using DigitalPassportBackend.Domain.DTO;

// namespace DigitalPassportBackend.Controllers;

// [ApiController]
// [Route("/api/activity")]
// [Authorize]
// public class ActivityController(IActivityService activityService) : ControllerBase
// {

//     private readonly IActivityService _activityService = activityService;

//     //
//     // STAMPS
//     //

//     /*
//     [HttpPost("stamps/{parkId}")]
//     [Authorize(Roles = "visitor")]
//     public IActionResult CollectStamp(
//         int parkId,
//         [FromBody] CollectStampRequest request)
//     {
//         var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
//         return Ok(CollectStampResponse.FromDomain(_activityService.CollectStamp(parkId, userId, request.geopoint, request.method, request.dateTime)));
//     }

//     [HttpGet("stamps/collected")]
//     [Authorize(Roles = "visitor")]
//     public IActionResult GetCollectedStamps()
//     {
//         var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
//         return Ok(_activityService.GetCollectedStamps(userId).Select(CollectedStampResponse.FromDomain).ToList());
//     }
//     */

//     // 
//     // BUCKET LIST
//     //

//     /*
//     [HttpPost("bucketlist")]
//     [Authorize(Roles = "admin")]
//     public IActionResult CreateBucketListItem([FromBody] BucketListItemDTO item)
//     {
//         _activityService.CreateBucketListItem(item);
//         return Ok();
//     }

//     [HttpGet("bucketlist")]
//     public IActionResult GetBucketListItems()
//     {
//         var items = _activityService.GetBucketListItems();
//         return Ok(items.Select(BucketListItemResponse.FromDomain));
//     }

//     [HttpGet("bucketlist/completed")]
//     [Authorize(Roles = "visitor,admin")]
//     public IActionResult GetCompletedBucketListItems()
//     {
//         var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
//         var items = _activityService.GetCompletedBucketListItems(userId);
//         return Ok(items.Select(CompletedBucketListItemResponse.FromDomain));
//     }

//     [HttpPost("bucketlist/{itemId}")]
//     [Authorize(Roles = "visitor")]
//     public IActionResult ToggleBucketListItemCompletion(int itemId, [FromBody] ToggleBucketListItemCompletionRequest req)
//     {
//         var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
//         var result = _activityService.ToggleBucketListItemCompletion(itemId, userId, req.geopoint);
//         return Ok(CompletedBucketListItemResponse.FromDomain(result));
//     }

//     [HttpPut("bucketlist/{bucketListId}")]
//     [Authorize(Roles = "admin")]
//     public IActionResult UpdateBucketListItem([FromBody] BucketListItemDTO item)
//     {
//         _activityService.UpdateBucketListItem(item);
//         return Ok();
//     }

//     [HttpDelete("bucketlist/{bucketListId}")]
//     public IActionResult DeleteBucketListItem(int bucketListId)
//     {
//         _activityService.DeleteBucketListItem(bucketListId);
//         return Ok();
//     }
//     */

//     //
//     // PARK VISITS
//     //

    

//     //
//     // PRIVATE NOTES
//     //

    

//     //
//     // FAVORITE PARKS
//     //

   

//     public record Geopoint(double latitude, double longitude, double inaccuracyRadius)
//     {
//     }

//     public record VisitParkRequest(Geopoint geopoint)
//     {
//     }

//     public record ParkVisitResponse(int id, DateTime createdAt, string parkAbbreviation)
//     {
//         public static ParkVisitResponse FromDomain(ParkVisit visit)
//         {
//             return new(
//                 visit.id,
//                 visit.createdAt,
//                 visit.park!.parkAbbreviation
//             );
//         }
//     }
    
//     /*
//     public record ToggleBucketListItemCompletionRequest(Geopoint geopoint)
//     {}

//     public record CompletedBucketListItemResponse(int id, int bucketListItemId, DateTime updatedAt)
//     {
//         public static CompletedBucketListItemResponse FromDomain(CompletedBucketListItem item)
//         {
//             return new CompletedBucketListItemResponse(
//                 item.id,
//                 item.bucketListItemId,
//                 item.updatedAt
//             );
//         }
//     }

//     public record BucketListItemResponse(int id, string task, DateTime createdAt, int? parkId, string? parkName)
//     {
//         public static BucketListItemResponse FromDomain(BucketListItem item)
//         {
//             return new BucketListItemResponse(
//                 item.id,
//                 item.task,
//                 item.createdAt,
//                 item.parkId,
//                 item.park?.parkName
//             );
//         }
//     }
//     */

//     public record PrivateNoteResponse(int parkId, string note, DateTime updatedAt)
//     {
//         public static PrivateNoteResponse FromDomain(PrivateNote note)
//         {
//             return new PrivateNoteResponse(note.park != null ? note.park.id : 0, note.note, note.updatedAt);
//         }
//     }

//     public record PrivateNoteRequest(string note, DateTime updatedAt)
//     {
//     }
// }
