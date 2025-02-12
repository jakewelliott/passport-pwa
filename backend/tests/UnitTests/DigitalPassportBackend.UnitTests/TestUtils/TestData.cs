using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.UnitTests.TestUtils
{
    public static partial class TestData
    {
        public static readonly List<Park> Parks =
        [
            new() {
                id = 45,
                parkName = "Carolina Beach State Park",
                parkAbbreviation = "CABE",
                parkType = ParkType.SPA,
                city = "Carolina Beach",
                coordinates = new(-77.9066, 34.0472),
                phone = 9104588206,
                email = "carolina.beach@ncparks.gov",
                stampImage = "",
                establishedYear = "1969",
                landmark = "Sugarloaf Dune, which has helped people find their way since 1663 and offers a great view of the Cape Fear River",
                youCanFind = "the Venus flytrap, one of the rarest species of plants that eats bugs.",
                trails = "■ 9 trails\n\n■ 1 wheelchair-accessible trail\n\n■ Kids TRACK Trail (follows Snow’s Cut Trail)\n\n■ 8.75 miles of hiking\n\n■ 1 mile of biking",
                accesses = null,
                website = "https://www.ncparks.gov/state-parks/carolina-beach-state-park"
            },
            new()
            {
                id = 20,
                parkName = "Engineering Building II",
                parkAbbreviation = "EBII",
                parkType = ParkType.SNA,
                city = "Raleigh",
                coordinates = new(35.7720, -78.6740),
                phone = 9195152336,
                email = "engineering@ncsu.edu",
                stampImage = "",
                establishedYear = "1984",
                landmark = "CSC and ECE departments",
                youCanFind = "Stressed engineering students",
                trails = "trail information",
                accesses = null,
                website = "https://www.nscu.edu"
            }
        ];

        public static readonly List<Trail> Trails =
        [
            new()
            {
                id = 1,
                trailName = "trail name",
                length = "trail length",
                description = "trail description",
            },
            new()
            {
                id = 2,
                trailName = "trail name 2",
                length = "trail length 2",
                description = "trail description 2",
            },
            new()
            {
                id = 3,
                trailName = "trail name 3",
                length = "trail length 3",
                description = "trail description 3",
            },
            new()
            {
                id = 4,
                trailName = "trail name 4",
                length = "trail length 4",
                description = "trail description 4",
            },
        ];

        public static readonly List<TrailIcon> TrailIcons =
        [
            new()
            {
                id = 1,
                icon = TrailIconName.Accessible,
                trail = Trails[0],
            },
            new()
            {
                id = 2,
                icon = TrailIconName.Amphiteater,
                trail = Trails[1],
            },
            new()
            {
                id = 3,
                icon = TrailIconName.BackpackCamping,
                trail = Trails[2],
            },
            new()
            {
                id = 4,
                icon = TrailIconName.FourWDBeach,
                trail = Trails[3],
            },
        ];

        public static readonly List<ParkAddress> ParkAddresses =
        [
            new()
            {
                id = 6,
                title = "Main Address",
                addressLineOne = "890 Oval Drive",
                addressLineTwo = "",
                city = "Raleigh",
                state = State.NC,
                zipcode = 27606,
                parkId = Parks[1].id,
                park = Parks[1]
            },
            new()
            {
                id = 24,
                title = "Main Address",
                addressLineOne = "1010 State Park Road",
                addressLineTwo = "",
                city = "Carolina Beach",
                state = State.NC,
                zipcode = 28428,
                parkId = Parks[0].id,
                park = Parks[0]
            }
        ];

        public static readonly List<ParkIcon> ParkIcons =
        [
            new()
            {
                id = 4,
                icon = ParkIconNames.Fishing_Red,
                created_at = DateTime.UtcNow,
                updated_at = DateTime.UtcNow,
                parkId = Parks[0].id,
                park = Parks[0]
            },
            new()
            {
                id = 9,
                icon = ParkIconNames.Swimming_Red,
                created_at = DateTime.UtcNow,
                updated_at = DateTime.UtcNow,
                parkId = Parks[0].id,
                park = Parks[0]
            }
        ];

        public static readonly List<ParkPhoto> ParkPhotos =
        [
            new()
            {
                id = 42,
                photo = "https://facilities.ofa.ncsu.edu/files/2020/02/Engineering-II.jpg",
                alt = "Photo of EB2 from the south.",
                createdAt = DateTime.UtcNow,
                updatedAt = DateTime.UtcNow,
                parkId = Parks[1].id,
                park = Parks[1]
            },

            new()
            {
                id = 78,
                photo = "https://visit.ncsu.edu/wp-content/uploads/sites/27/2020/03/Engineering-Building-II.jpg",
                alt = "Aerial photo of EB2 from the north.",
                createdAt = DateTime.UtcNow,
                updatedAt = DateTime.UtcNow,
                parkId = Parks[1].id,
                park = Parks[1]
            }
        ];

        public static readonly List<User> Users =
        [
            new()
            {
                id = 1,
                username = "superAdmin",
                password = TestConfiguration.GetConfiguration()["ADMIN_PASS"]!,
                role = UserRole.admin,
                createdAt = DateTime.UtcNow,
                updatedAt = DateTime.UtcNow,
            },
            new()
            {
                id = 7,
                username = "visitor_0",
                password = "visitor_0_password",
                role = UserRole.visitor,
                createdAt = DateTime.UtcNow,
                updatedAt = DateTime.UtcNow
            },
            new()
            {
                id = 18,
                username = "usr_admin_1",
                password = "admin_password",
                role = UserRole.admin,
                createdAt = DateTime.UtcNow,
                updatedAt = DateTime.UtcNow
            },
            new()
            {
                id = 24,
                username = "visitor_1",
                password = "visitor_1_password",
                role = UserRole.visitor,
                createdAt = DateTime.UtcNow,
                updatedAt = DateTime.UtcNow
            }
        ];

        public static readonly List<BucketListItem> BucketList =
        [
            new()
            {
                id = 42,
                task = "Task 1 at CABE",
                createdAt = DateTime.UtcNow,
                updatedAt = DateTime.UtcNow,
                parkId = Parks[0].id,
                park = Parks[0]
            },
            new()
            {
                id = 84,
                task = "Task 1 at EB2",
                createdAt = DateTime.UtcNow,
                updatedAt = DateTime.UtcNow,
                parkId = Parks[1].id,
                park = Parks[1]
            },
            new()
            {
                id = 128,
                task = "Task 2 at CABE",
                createdAt = DateTime.UtcNow,
                updatedAt = DateTime.UtcNow,
                parkId = Parks[0].id,
                park = Parks[0]
            }
        ];

        public static readonly List<CompletedBucketListItem> CompletedBucketListItems = [
            new()
            {
                id = 9,
                location = new(34.0496, -77.9196),
                created_at = DateTime.UtcNow,
                updated_at = DateTime.UtcNow,
                parkId = Parks[0].id,
                park = Parks[0],
                bucketListItemId = BucketList[2].id,
                bucketListItem = BucketList[2],
                userId = Users[3].id,
                user = Users[3]
            },
            new()
            {
                id = 24,
                location = new(34.0481, -77.9132),
                created_at = DateTime.UtcNow,
                updated_at = DateTime.UtcNow,
                parkId = Parks[0].id,
                park = Parks[0],
                bucketListItemId = BucketList[0].id,
                bucketListItem = BucketList[0],
                userId = Users[1].id,
                user = Users[1]
            },
            new()
            {
                id = 84,
                location = new(35.7717, -78.6736),
                created_at = DateTime.UtcNow,
                updated_at = DateTime.UtcNow,
                parkId = Parks[1].id,
                park = Parks[1],
                bucketListItemId = BucketList[1].id,
                bucketListItem = BucketList[1],
                userId = Users[3].id,
                user = Users[3]
            }
        ];

        public static readonly List<CollectedStamp> CollectedStamps =
        [
            new()
            {
                id = 3,
                method = StampCollectionMethod.location,
                location = new(35.7716, -78.6737),
                createdAt = DateTime.UtcNow,
                updatedAt = DateTime.UtcNow,
                userId = Users[1].id,
                user = Users[1],
                parkId = Parks[1].id,
                park = Parks[1]
            },
            new()
            {
                id = 6,
                method = StampCollectionMethod.manual,
                location = new(35.7691, -78.6765),
                createdAt = DateTime.UtcNow,
                updatedAt = DateTime.UtcNow,
                userId = Users[3].id,
                user = Users[3],
                parkId = Parks[1].id,
                park = Parks[1]
            }
        ];
    }
}