using System.Reflection;

using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DigitalPassportBackend.UnitTests.TestUtils;
public static class TestConfiguration
{
    public static IConfiguration GetConfiguration()
    {
        var dotenv = Path.Combine(
            Environment.GetEnvironmentVariable("GITHUB_WORKSPACE").IsNullOrEmpty()
                ? Directory.GetParent(Directory.GetCurrentDirectory())!
                    .Parent!.Parent!.Parent!.Parent!.Parent!.Parent!
                    .FullName
                : Environment.GetEnvironmentVariable("GITHUB_WORKSPACE")!,
            ".env");
        DotEnv.Load(dotenv);
        return new ConfigurationBuilder()
            .AddEnvironmentVariables()
            .Build();
    }
}