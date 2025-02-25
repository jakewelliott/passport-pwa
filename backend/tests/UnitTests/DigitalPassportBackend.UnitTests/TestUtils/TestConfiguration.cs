using System.Diagnostics.CodeAnalysis;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.FileProviders.Physical;
using Microsoft.IdentityModel.Tokens;

namespace DigitalPassportBackend.UnitTests.TestUtils;
[ExcludeFromCodeCoverage]
public static class TestConfiguration
{
    public static readonly string TestingResourcePath = $"{GetProjectRoot()}\\backend\\tests\\UnitTests\\DigitalPassportBackend.UnitTests\\resources";

    public static IConfiguration GetConfiguration()
    {

        return new ConfigurationBuilder()
            .AddIniFile(new PhysicalFileProvider(GetProjectRoot(), ExclusionFilters.None),
                ".env",
                false,
                true)
            .Build();
    }

    private static string GetProjectRoot()
    {
        var workspace = Environment.GetEnvironmentVariable("GITHUB_WORKSPACE");
        return workspace.IsNullOrEmpty()
            ? Directory.GetParent(Directory.GetCurrentDirectory())!
                .Parent!.Parent!.Parent!.Parent!.Parent!.Parent!
                .FullName
            : workspace!;
    }
}