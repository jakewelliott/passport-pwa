using Microsoft.Extensions.Configuration;

namespace DigitalPassportBackend.UnitTests.TestUtils;
public static class TestConfiguration
{
    public static IConfiguration GetConfiguration()
    {
        DotEnv.Load(Path.Combine(Directory.GetCurrentDirectory(), "../../../../../../../.env"));
        return new ConfigurationBuilder()
            .AddEnvironmentVariables()
            .Build();
    }
}