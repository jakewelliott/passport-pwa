using DigitalPassportBackend.Domain;

using Microsoft.AspNetCore.Http.HttpResults;

namespace DigitalPassportBackend.UnitTests.TestUtils.Constants
{
    public static partial class Constants
    {
        public static List<ParkAddress> ParkAddresses = new()
        {
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
        };
    }
}