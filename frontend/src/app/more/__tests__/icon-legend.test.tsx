import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { IconLegend } from '@/app/more/icon-legend';

describe('IconLegend Component - User Stories', () => {
	// User Story: As a user, I want to understand what each icon means
	it('should display icons with their meanings', () => {
		render(
			<BrowserRouter>
				<IconLegend />
			</BrowserRouter>
		);

		expect(screen.getByText('Icon Legend')).toBeInTheDocument();
		expect(screen.getByText('Activities')).toBeInTheDocument();
		expect(screen.getByText('Amenities')).toBeInTheDocument();
	});

	// User Story: As a user, I want to see camping options explained
	it('should explain camping options', () => {
		render(
			<BrowserRouter>
				<IconLegend />
			</BrowserRouter>
		);

		expect(screen.getByText('Tent camping')).toBeInTheDocument();
		expect(screen.getByText('RV hookup camping*')).toBeInTheDocument();
		expect(screen.getByText('Group camping')).toBeInTheDocument();
	});

	// User Story: As a user, I want to understand facility amenities
	it('should explain facility amenity icons', () => {
		render(
			<BrowserRouter>
				<IconLegend />
			</BrowserRouter>
		);

		expect(screen.getByText('Boat ramp')).toBeInTheDocument();
		expect(screen.getByText('Visitor center')).toBeInTheDocument();
		expect(screen.getByText('Playground')).toBeInTheDocument();
	});

	// User Story: As a user, I want to understand activity icons
	it('should explain activity icons', () => {
		render(
			<BrowserRouter>
				<IconLegend />
			</BrowserRouter>
		);

		expect(screen.getByText('Hiking')).toBeInTheDocument();
		expect(screen.getByText('Swimming')).toBeInTheDocument();
		expect(screen.getByText('Biking')).toBeInTheDocument();
	});

	// User Story: As a user, I want to understand state trail stamps
	it('should explain state trail stamps', () => {
		render(
			<BrowserRouter>
				<IconLegend />
			</BrowserRouter>
		);

		expect(screen.getByText('State Trail Stamps')).toBeInTheDocument();
		expect(screen.getByText('Mountains-to-Sea')).toBeInTheDocument();
		expect(screen.getByText('Fonta Flora')).toBeInTheDocument();
	});
}); 