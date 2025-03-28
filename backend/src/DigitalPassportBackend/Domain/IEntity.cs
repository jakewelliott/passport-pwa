using System.Diagnostics.CodeAnalysis;

namespace DigitalPassportBackend.Domain;

public interface IEntity
{
    DateTime createdAt { get; set; }
    DateTime updatedAt { get; set; }
}