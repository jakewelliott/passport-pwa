using DigitalPassportBackend.Domain;

using Microsoft.AspNetCore.Http.HttpResults;

namespace DigitalPassportBackend.UnitTests.TestUtils.Constants
{
    public static partial class Constants
    {
        public static class Address
        {
            public const string title = "Main Address";
            public const string addressLineOne = "1010 State Park Road";
            public const string addressLineTwo = "";
            public const string city = "Carolina Beach";
            public const State state = State.NC;
            public const int zipcode = 28428;
        }
    }
}