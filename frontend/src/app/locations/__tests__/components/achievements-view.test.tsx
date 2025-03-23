import { mockPark, mockStamp } from '@/lib/testing/mock';
import { renderWithClient } from '@/lib/testing/test-wrapper';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AchievementsView from '../../components/achievements-view';

describe('AchievementsView', () => {
	it('should render', () => {
		renderWithClient(<AchievementsView park={mockPark} stamp={mockStamp} />);
		expect(screen.getByTestId('achievements-view')).toBeInTheDocument();
	});

	it('should show the stamp collected on date', () => {
		renderWithClient(<AchievementsView park={mockPark} stamp={mockStamp} />);
		expect(screen.getByTestId('stamp-collected-on')).toBeInTheDocument();
	});
});
