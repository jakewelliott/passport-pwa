using Microsoft.Extensions.Configuration;

namespace DigitalPassportBackend.UnitTests.TestUtils;
public static class TestConfiguration
{
    public static IConfiguration GetConfiguration()
    {
# if DEBUG
        DotEnv.Load(Path.Combine(Directory.GetCurrentDirectory(), "../../../../../../../.env"));
# else
        DotEnv.Load(Path.Combine(Directory.GetCurrentDirectory(), "../.env"));
# endif
        return new ConfigurationBuilder()
            .AddEnvironmentVariables()
            .Build();
    }
}