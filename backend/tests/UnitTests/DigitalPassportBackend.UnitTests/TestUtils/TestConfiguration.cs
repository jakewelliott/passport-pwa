using System.Diagnostics.CodeAnalysis;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.FileProviders.Physical;
using Microsoft.IdentityModel.Tokens;

namespace DigitalPassportBackend.UnitTests.TestUtils;
[ExcludeFromCodeCoverage]
public static class TestConfiguration
{
    public static IConfiguration GetConfiguration()
    {
        var workspace = Environment.GetEnvironmentVariable("GITHUB_WORKSPACE");
        var basePath = workspace.IsNullOrEmpty()
            ? Directory.GetParent(Directory.GetCurrentDirectory())!
                .Parent!.Parent!.Parent!.Parent!.Parent!.Parent!
                .FullName
            : workspace!;

        return new ConfigurationBuilder()
            .AddIniFile(new PhysicalFileProvider(basePath, ExclusionFilters.None),
                ".env",
                false,
                true)
            .Build();
    }
}