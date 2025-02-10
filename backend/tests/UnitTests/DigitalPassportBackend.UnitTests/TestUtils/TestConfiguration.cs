using Microsoft.Extensions.Configuration;

namespace DigitalPassportBackend.UnitTests.TestUtils;
public static class TestConfiguration
{
    public static IConfiguration GetConfiguration()
    {
        var root = Directory.GetCurrentDirectory();
        var dotenv = Path.Combine(root, ".env");
        DotEnv.Load(dotenv);
        var config = new ConfigurationBuilder()
            .AddEnvironmentVariables()
            .Build();

        return config;
    }
}