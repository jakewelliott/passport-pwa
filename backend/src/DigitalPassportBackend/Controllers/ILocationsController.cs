using Microsoft.AspNetCore.Mvc;

namespace DigitalPassportBackend.Controllers;

public interface ILocationsController
{
    IActionResult Get(string locationAbbrev);
}
