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
        
        public static readonly List<ParkAddress> ParkAddresses = 
        [
            new()
            {
                id = 5,
                title = "Main Address",
                addressLineOne = "890 Oval Drive",
                addressLineTwo = "",
                city = "Raleigh",
                state = State.NC,
                zipcode = 27606,
                parkId = 20,
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
                parkId = 45,
                park = Parks[0]
            }
        ];

        public static readonly List<ParkIcon> ParkIcons = 
        [
            new()
            {
                id = 4,
                icon = ParkIconNames.Fishing_Red,
                created_at = DateTime.Now,
                updated_at = DateTime.Now,
                parkId = 45,
                park = Parks[0]
            },
            new()
            {
                id = 9,
                icon = ParkIconNames.Swimming_Red,
                created_at = DateTime.Now,
                updated_at = DateTime.Now,
                parkId = 45,
                park = Parks[0]
            }
        ];

        public static readonly List<BucketListItem> BucketList =
        [
            new()
            {
                id = 42,
                task = "Task 1 at CABE",
                createdAt = DateTime.Now,
                updatedAt = DateTime.Now,
                parkId = Parks[0].id,
                park = Parks[0]
            },
            new()
            {
                id = 84,
                task = "Task 1 at EB2",
                createdAt = DateTime.Now,
                updatedAt = DateTime.Now,
                parkId = Parks[1].id,
                park = Parks[1]
            },
            new()
            {
                id = 128,
                task = "Task 2 at CABE",
                createdAt = DateTime.Now,
                updatedAt = DateTime.Now,
                parkId = Parks[0].id,
                park = Parks[0]
            }
        ];
    }
}