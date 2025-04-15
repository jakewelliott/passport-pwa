using DigitalPassportBackend.Domain;

namespace DigitalPassportBackend.Services.Activity;

public interface INotesService
{
    List<PrivateNote> GetAll(int userId);
    PrivateNote Get(int userId, int parkId);
    PrivateNote CreateUpdate(int userId, int parkId, string note, DateTime updatedAt);
}