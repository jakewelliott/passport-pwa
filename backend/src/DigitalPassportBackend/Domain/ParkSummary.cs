using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace DigitalPassportBackend.Domain;

[ExcludeFromCodeCoverage]
public class ParkSummary
{
    public required string Abbreviation { get; set; }
    public required string ParkName { get; set; }
    public string? City { get; set; }
    public required string State { get; set; }
}