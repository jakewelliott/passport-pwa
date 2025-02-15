using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace DigitalPassportBackend.Domain;

[ExcludeFromCodeCoverage]
public class ParkActivity
{
    public required List<BucketListItemOverview> CompletedBucketListItems { get; set; }
    public DateTime? StampCollectedAt { get; set; }
    public PrivateNoteOverview? PrivateNote { get; set; }
    public DateTime? LastVisited { get; set; }
}
