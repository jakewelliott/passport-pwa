import { mockUserProfile } from '@/lib/testing/mock/components';
import { parkNotes } from '@/lib/testing/mock/tables';
import { testQueryHook } from '@/lib/testing/testQueryHook';
import { describe, it } from 'vitest';
import { useGetAllNotes, useNote } from '../useNotes';

describe('useNotes', () => {
    it('should return all notes for a user', async () => {
        const userNotes = parkNotes.filter((note) => note.userId === mockUserProfile.id);
        await testQueryHook(useGetAllNotes, userNotes);
    });

    it('should return the users notes for a specific park', async () => {
        const parkId = 1;
        const userNotes = parkNotes
            .filter((note) => note.userId === mockUserProfile.id)
            .filter((note) => note.parkId === parkId);
        await testQueryHook(useNote, userNotes[0], [parkId]);
    });
});
