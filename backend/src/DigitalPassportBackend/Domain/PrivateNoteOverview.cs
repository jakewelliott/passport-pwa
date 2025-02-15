using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace DigitalPassportBackend.Domain;

[ExcludeFromCodeCoverage]
public class PrivateNoteOverview
{
    public int Id { get; set; }
    public required string Note { get; set; }
}
