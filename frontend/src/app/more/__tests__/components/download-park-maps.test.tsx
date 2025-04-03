import { DownloadParkMaps } from '@/app/more/components/download-park-maps';
import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { describe, expect, it } from 'vitest';

const { render } = setupTestEnv();
describe('DownloadParkMaps', () => {
    it('matches snapshot', () => {
        const { container } = render(<DownloadParkMaps />);
        expect(container).toMatchSnapshot();
    });
});
