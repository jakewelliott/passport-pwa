using System.Diagnostics.CodeAnalysis;

using Microsoft.AspNetCore.Http;

namespace DigitalPassportBackend.UnitTests.TestUtils;
[ExcludeFromCodeCoverage]
public static class TestFileHelper
{
    public static IFormFile Open(string fileName)
    {
        var stream = new FileStream(Path.Combine(TestConfiguration.TestingResourcePath, fileName), FileMode.Open, FileAccess.Read)
        {
            Position = 0
        };
        return new FormFile(stream, 0, stream.Length, fileName, fileName);
    }
}