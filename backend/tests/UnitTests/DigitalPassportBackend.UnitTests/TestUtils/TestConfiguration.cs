using System.Reflection;

using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DigitalPassportBackend.UnitTests.TestUtils;
public static class TestConfiguration
{
    public static IConfiguration GetConfiguration()
    {
        var workspace = Environment.GetEnvironmentVariable("GITHUB_WORKSPACE");
        throw new Exception(workspace);
        var dotenv = Path.Combine(
            workspace.IsNullOrEmpty()
                ? Directory.GetParent(Directory.GetCurrentDirectory())!
                    .Parent!.Parent!.Parent!.Parent!.Parent!.Parent!
                    .FullName
                : workspace!,
            ".env");
        DotEnv.Load(dotenv);
        return new ConfigurationBuilder()
            .AddEnvironmentVariables()
            .Build();
    }
}