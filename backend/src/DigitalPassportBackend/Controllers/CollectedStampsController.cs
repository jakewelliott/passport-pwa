using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Controllers;

[ApiController]
[Route("api/stamps")]
[Authorize]
public class CollectedStampsController : ControllerBase
{
    private readonly DigitalPassportDbContext _context;

    public CollectedStampsController(DigitalPassportDbContext context)
    {
        _context = context;
    }

    [HttpGet("{userId}")]
    public async Task<ActionResult<List<object>>> GetUserCollectedStamps(int userId)
    {
        var collectedStamps = await _context.CollectedStamps
            .Include(s => s.park)
            .Where(s => s.userId == userId)
            .OrderByDescending(s => s.createdAt)
            .Select(s => new
            {
                s.id,
                s.method,
                s.createdAt,
                s.updatedAt,
                s.userId,
                s.parkId,
                abbreviation = s.park.parkAbbreviation
            })
            .ToListAsync();

        return Ok(collectedStamps);
    }
} 