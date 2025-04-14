
using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Domain.DTO;

using NetTopologySuite.Geometries;
using static DigitalPassportBackend.Controllers.ActivityController;

namespace DigitalPassportBackend.Services;
public interface IActivityService
{
	// Stamps
    public CollectedStamp CollectStamp(
        int parkId,
        int userId,
        Geopoint geopoint,
        string method,
        DateTime? dateTime);
    public List<CollectedStamp> GetCollectedStamps(int userId);

    // Bucket List
    public void CreateBucketListItem(BucketListItemDTO item);
    public List<BucketListItem> GetBucketListItems();
    public List<CompletedBucketListItem> GetCompletedBucketListItems(int userId);
    public CompletedBucketListItem ToggleBucketListItemCompletion(int itemId, int userId, Geopoint geopoint);
    public void UpdateBucketListItem(BucketListItemDTO item);
    public void DeleteBucketListItem(int id);

    // Park Visit
    public ParkVisit VisitPark(int userId, int parkId, Geopoint geopoint);
    public List<ParkVisit> GetParkVisits(int userId);

    // Private Notes
    public PrivateNote GetParkNote(int userId, int parkId);
    public List<PrivateNote> GetNotes(int userId);
    public PrivateNote CreateUpdatePrivateNote(int userId, int parkId, string note, DateTime updatedAt);

    // Favorite parks
    public void AddFavoritePark(int userId, int parkId);
    public List<int> GetFavoriteParks(int userId);
    public void DeleteFavoritePark(int userId, int parkId);
}
