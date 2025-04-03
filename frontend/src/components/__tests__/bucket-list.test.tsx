import { BucketList } from '@/components/bucket-list';
import { useBucketList } from '@/hooks/queries/useBucketList';
import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { beforeAll, describe, expect, it } from 'vitest';

const { render, checkHook } = setupTestEnv();
describe('Bucket List', () => {
    beforeAll(async () => {
        await checkHook(useBucketList, 'useBucketList');
    });

    it('matches snapshot', () => {
        const { container } = render(<BucketList />);
        expect(container).toMatchSnapshot();
    });
});
