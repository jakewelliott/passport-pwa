using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.UnitTests.TestUtils.Constants
{
    public static partial class Constants
    {
        public static class Park
        {
            public const int id = 45;
            public const string parkName = "Carolina Beach State Park";
            public const string parkAbbreviation = "CABE";
            public const ParkType parkType = ParkType.SPA;
            public const string city = "Carolina Beach";
            public static readonly object coordinates = new { longitude = -77.9066, latitude = 34.0472 };
            public const long phone = 9104588206;
            public const string email = "carolina.beach@ncparks.gov";
            public const string stampImage = "";
            public const string establishedYear = "1969";
            public const string landmark = "Sugarloaf Dune, which has helped people find their way since 1663 and offers a great view of the Cape Fear River";
            public const string youCanFind = "the Venus flytrap, one of the rarest species of plants that eats bugs.";
            public const string trails = "■ 9 trails\n\n■ 1 wheelchair-accessible trail\n\n■ Kids TRACK Trail (follows Snow’s Cut Trail)\n\n■ 8.75 miles of hiking\n\n■ 1 mile of biking";
            public const string accesses = null;
            public const string website = "https://www.ncparks.gov/state-parks/carolina-beach-state-park";            
        }
    }
}