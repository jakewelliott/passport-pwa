using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Domain.DTO;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Repository;

public class NotesService
{
    private readonly ILocationsRepository _locationsRepository;
    private readonly IUserRepository _userRepository;
    private readonly IPrivateNoteRepository _privateNoteRepository;

    public NotesService(
        ILocationsRepository locationsRepository,
        IUserRepository userRepository,
        IPrivateNoteRepository privateNoteRepository
    )
    {
        _locationsRepository = locationsRepository;
        _userRepository = userRepository;
        _privateNoteRepository = privateNoteRepository;
    }

    public List<PrivateNote> GetAll(int userId)
    {
        // TODO: use the DTO
        return _privateNoteRepository.GetByUser(userId)
            .Select(x =>
            {
                var note = new PrivateNote
                {
                    id = x.id,
                    note = x.note,
                    createdAt = x.createdAt,
                    updatedAt = x.updatedAt,
                    userId = x.userId,
                    user = x.user,
                    parkId = x.parkId == null ? 0 : x.parkId,
                    park = x.parkId != null ? _locationsRepository.GetById(x.parkId.Value) : null
                };
                return note;
            })
            .ToList();
    }

    public PrivateNote Get(int userId, int parkId)
    {
        // TODO: use the DTO
        var note = _privateNoteRepository.GetByParkAndUser(userId, parkId);
        if (note == null)
        {
            note = CreateUpdatePrivateNote(userId, parkId, "", DateTime.UtcNow);
        }
        note.parkId = parkId;
        return note;
    }

    public PrivateNote CreateUpdate(int userId, int parkId, string note, DateTime updatedAt)
    {
        // ID 0 is used for general notes
        var locationId = parkId == 0 ? 0 : _locationsRepository.GetById(parkId).id;

        // Check if there is already a note in the database.
        var privateNote = _privateNoteRepository.GetByParkAndUser(userId, locationId);
        if (privateNote != null)
        {
            // If there is, update it
            privateNote.note = note;
            privateNote.updatedAt = updatedAt;
            return _privateNoteRepository.Update(privateNote);
        }
        else
        {
            // If there is no note, create it
            return _privateNoteRepository.Create(new()
            {
                note = note,
                user = _userRepository.GetById(userId),
                userId = userId,
                park = locationId == 0 ? null : _locationsRepository.GetById(locationId),
                parkId = locationId == 0 ? null : locationId,
                createdAt = updatedAt,
                updatedAt = updatedAt
            });
        }
    }
};