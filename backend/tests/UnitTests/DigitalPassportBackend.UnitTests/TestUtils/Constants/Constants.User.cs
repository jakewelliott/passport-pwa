using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.UnitTests.TestUtils.Constants
{
    public static partial class Constants
    {
        public static List<User> Users = new()
        {
            new()
            {
                id = 1,
                username = "visitor_1",
                password = "visitor_1_password",
                role = UserRole.visitor,
                createdAt = DateTime.Now,
                updatedAt = DateTime.Now
            },
            new()
            {
                id = 2,
                username = "admin_user",
                password = "admin_password",
                role = UserRole.admin,
                createdAt = DateTime.Now,
                updatedAt = DateTime.Now
            },
            new()
            {
                id = 5,
                username = "visitor_2",
                password = "visitor_2_password",
                role = UserRole.visitor,
                createdAt = DateTime.Now,
                updatedAt = DateTime.Now
            }
        };
    }
}