using System.Diagnostics.CodeAnalysis;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.StaticFiles;

namespace DigitalPassportBackend.UnitTests.TestUtils;
[ExcludeFromCodeCoverage]
public static class TestFileHelper
{
    public static IFormFile Open(string fileName)
    {
        var filePath = Path.Combine(TestConfiguration.TestingResourcePath, fileName);

        var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read)
        {
            Position = 0
        };
        var file = new FormFile(stream, 0, stream.Length, fileName, fileName)
        {
            Headers = new HeaderDictionary()
        };
        new FileExtensionContentTypeProvider().TryGetContentType(filePath, out var contentType);
        file.ContentType = contentType ?? "application/octet-stream";
        return file;
    }
}