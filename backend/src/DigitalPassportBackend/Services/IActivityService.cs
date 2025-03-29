
using DigitalPassportBackend.Domain;
using NetTopologySuite.Geometries;
using static DigitalPassportBackend.Controllers.ActivityController;

namespace DigitalPassportBackend.Services;
public interface IActivityService
{
	List<CollectedStamp> GetCollectedStamps(int userId);
	CollectedStamp CollectStamp(int parkId, int userId, Geopoint geopoint, string method, DateTime? dateTime);
	PrivateNote CreateUpdatePrivateNote(int parkId, int userId, string note, DateTime updatedAt);
	List<BucketListItem> GetBucketListItems();
	List<CompletedBucketListItem> GetCompletedBucketListItems(int userId);
	PrivateNote GetParkNote(int parkId, int userId);
	List<PrivateNote> GetNotes(int userId);
	CompletedBucketListItem ToggleBucketListItemCompletion(int itemId, int userId, Geopoint geopoint);
	ParkVisit VisitPark(int userId, int parkId, Geopoint geopoint);
	List<ParkVisit> GetParkVisits(int userId);
	List<int> GetFavoriteParks(int userId);
	void AddFavoritePark(int userId, int parkId);
	void DeleteFavoritePark(int userid, int parkId);
}
