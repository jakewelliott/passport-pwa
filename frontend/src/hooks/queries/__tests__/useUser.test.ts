import { type TestableQueryHook, testQueryHook } from '@/lib/testing/testQueryHook';
import type { UserProfile } from '@/types';
import { describe, it } from 'vitest';
import { useUser } from '../useUser';

import { mockUserProfile } from '@/lib/testing/mock';

describe('User Profile', () => {
    it('should return the user', async () => {
        await testQueryHook(useUser as TestableQueryHook<UserProfile>, mockUserProfile);
    });
});
