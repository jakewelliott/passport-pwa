public PrivateNote GetParkNote(int userId, int parkId)
    {
        var note = _privateNoteRepository.GetByParkAndUser(userId, parkId);
        if (note == null)
        {
            note = CreateUpdatePrivateNote(userId, parkId, "", DateTime.UtcNow);
        }
        note.parkId = parkId;
        return note;
    }

    public List<PrivateNote> GetNotes(int userId)
    {
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

    public PrivateNote CreateUpdatePrivateNote(int userId, int parkId, string note, DateTime updatedAt)
    {
        // Check if there is already a note in the database.
        var locationId = parkId == 0 ? 0 : _locationsRepository.GetById(parkId).id;
				// TODO: handle the case with an invalid parkId??
        var privateNote = _privateNoteRepository.GetByParkAndUser(userId, locationId);
        if (privateNote != null)
        {
            // Update it
            privateNote.note = note;
            privateNote.updatedAt = updatedAt;
            return _privateNoteRepository.Update(privateNote);
        }
        else
        {
            // Create it
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