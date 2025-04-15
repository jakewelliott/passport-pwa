using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Domain.DTO;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Repository;

using Microsoft.OpenApi.Extensions;
using NetTopologySuite.Geometries;
using static DigitalPassportBackend.Controllers.ActivityController;


namespace DigitalPassportBackend.Services;

public class ActivityService(
    IBucketListItemRepository bucketListItemRepository,
    ICompletedBucketListItemRepository completedBucketListItemRepository,
    ICollectedStampRepository collectedStampRepository,
    IPrivateNoteRepository privateNoteRepository,
    IParkVisitRepository parkVisitRepository,
    IFavoriteParkRepository favoriteParkRepository,
    ILocationsRepository locationsRepository,
    IUserRepository userRepository) : IActivityService
{
    private readonly IBucketListItemRepository _bucketListItemRepository = bucketListItemRepository;
    private readonly ICompletedBucketListItemRepository _completedBucketListItemRepository = completedBucketListItemRepository;
    private readonly ICollectedStampRepository _collectedStampRepository = collectedStampRepository;
    private readonly IPrivateNoteRepository _privateNoteRepository = privateNoteRepository;
    private readonly IParkVisitRepository _parkVisitRepository = parkVisitRepository;
    private readonly IFavoriteParkRepository _favoriteParkRepository = favoriteParkRepository;
    private readonly ILocationsRepository _locationsRepository = locationsRepository;
    private readonly IUserRepository _userRepository = userRepository;

    

    


    // Favorite parks
    
}
