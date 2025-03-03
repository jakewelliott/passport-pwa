
using DigitalPassportBackend.Domain;
using NetTopologySuite.Geometries;
namespace DigitalPassportBackend.Services;
public interface IActivityService
{
    List<CollectedStamp> GetCollectedStamps(int userId);
    CollectedStamp CollectStamp(string park_abbreviation, double latitude, double longitude, double inaccuracyRadius, string method, DateTime? dateTime, int userId);
		ParkActivity GetParkActivity(int locationId, int userId);
    PrivateNote CreateUpdatePrivateNote(string parkAbbr, int userId, string note, DateTime updatedAt);

		// adding these to make our life easier on the frontend
		List<BucketListItem> GetBucketListItems();
		List<CompletedBucketListItem> GetCompletedBucketListItems(int userId);
		CompletedBucketListItem ToggleBucketListItemCompletion(int itemId, int userId, double longitude, double latitude, double inaccuracyRadius);
}
