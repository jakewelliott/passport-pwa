import { HikingEssentialItem } from '@/app/more/components/hiking-essential-item';
import { setupTestEnv } from '@/lib/testing/test-wrapper';
import { describe, expect, it } from 'vitest';

const defaultProps = {
    imageSrc: '/test-image.jpg',
    altText: 'Test Alt Text',
    title: 'Test Title',
    description: 'Test Description',
};

const { render } = setupTestEnv();
describe('HikingEssentialItem', () => {
    it('matches snapshot', () => {
        const { container } = render(<HikingEssentialItem {...defaultProps} />);
        expect(container).toMatchSnapshot();
    });
});
