import { mockUserProfile } from '@/lib/testing/mock/components';
import { bucketListItems, completedBucketListItems } from '@/lib/testing/mock/tables';
import { testQueryHook } from '@/lib/testing/testQueryHook';
import { describe, it } from 'vitest';
import { useBucketListItems, useCompletedBucketListItems } from '../useBucketList';

describe('Bucket List Queries', () => {
    it('useBucketListItems should return all bucket list items', async () => {
        await testQueryHook(useBucketListItems, bucketListItems);
    });

    it('useCompletedBucketListItems should return the completed bucket list items for the test user', async () => {
        const testUserItems = completedBucketListItems.filter((item) => item.userId === mockUserProfile.id);
        await testQueryHook(useCompletedBucketListItems, testUserItems);
    });

    // TODO: test mutation

    // TODO: test combined hook
});
