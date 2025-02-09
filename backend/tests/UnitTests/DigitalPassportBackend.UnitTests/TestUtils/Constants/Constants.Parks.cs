using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.UnitTests.TestUtils.Constants
{
    public static partial class Constants
    {
        public static List<Park> Parks = new()
        {
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
        };
    }
}