import { render, screen } from '@testing-library/react';
import StayingSafe from '@/app/more/staying-safe';
import { describe, it, expect } from 'vitest';

describe('StayingSafe Component', () => {
	const safetyRules = [
		'Alcohol is not allowed except on individual campsites.',
		'Follow the rules for boating and fishing from the NC Wildlife Resources Commission. Make sure you have a fishing license if you are fishing.',
		'Do not fly drones in the park.',
		'Only have fires in grills and fire rings, and keep an eye on them.',
		'Do not bring firewood from far away; get it locally or make sure it is treated.',
		'No fireworks or weapons. Handguns are allowed with a concealed carry permit in outdoor areas only.',
		"Watch out for snakes, poison ivy, and ticks. Check for ticks after you've been hiking.",
		'Bring enough water for you and your pets.',
		"Stick to the trails, and don't go near steep edges. Be careful on wet trails, rocks, and bridges.",
		"Plan your hikes ahead of time so you don't get caught by darkness.",
		"Always wear a life jacket when you are paddling, boating, or swimming, especially if you're not a strong swimmer. Kids under 13 years old are required to wear one.",
		'Do not go paddling alone.',
		'Keep your pets on a leash all the time.',
		'You can only climb in certain spots and must get a permit first.',
		'Swim only in designated areas. Be careful if there are no lifeguards.',
		'Keep the park clean by using the trash and recycling bins.',
		'Hunting or trapping animals is not allowed.',
		'Do not feed or try to touch the animals. Tell the park staff if you see any sick ones.',
	];

	it('renders the title correctly', () => {
		render(<StayingSafe />);

		const title = screen.getByText('How to Stay Safe While Visiting NC State Parks');
		expect(title).toBeInTheDocument();
		expect(title).toHaveClass('mb-6', 'w-full', 'bg-supporting_inactiveblue', 'p-3', 'text-center', 'text-system_white', 'uppercase');
	});

	it('renders the description correctly', () => {
		render(<StayingSafe />);

		const description = screen.getByText(
			"To keep everyone safe and protect our parks, please follow these rules and safety guidelines while you're here!"
		);
		expect(description).toBeInTheDocument();
	});

	it('renders all safety rules as list items', () => {
		render(<StayingSafe />);

		const list = screen.getByRole('list');
		expect(list).toBeInTheDocument();

		const listItems = screen.getAllByRole('listitem');
		expect(listItems).toHaveLength(safetyRules.length);

		safetyRules.forEach((rule) => {
			expect(screen.getByText(rule)).toBeInTheDocument();
		});
	});

	it('renders each list item with correct structure', () => {
		render(<StayingSafe />);

		const listItems = screen.getAllByRole('listitem');

		listItems.forEach((item) => {
			// Check that each list item has a bullet point (•)
			const bulletPoint = item.querySelector('span:first-child');
			expect(bulletPoint).toBeInTheDocument();
			expect(bulletPoint?.textContent).toBe('•');

			// Check that each list item has text content
			const textContent = item.querySelector('span:last-child');
			expect(textContent).toBeInTheDocument();
			expect(textContent?.textContent).not.toBe('');
		});
	});
});
