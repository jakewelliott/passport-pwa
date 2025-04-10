using System.Diagnostics.CodeAnalysis;

namespace DigitalPassportBackend.Domain;

public interface IEntity
{
    int id { get; init; }
    DateTime createdAt { get; set; }
    DateTime updatedAt { get; set; }
}