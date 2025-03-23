import { LocationContact } from "@/app/locations/components/location-contact";
import DateHelper from "@/lib/date-helper";
import { mockPark } from '@/lib/testing/mock';
import { renderWithClient } from '@/lib/testing/test-wrapper';
import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AchievementsView from "../../components/achievements-view";

const parkWithManyAddresses = {
	...mockPark,
	addresses: [
		{
			title: "Address 1",
			addressLineOne: "Address 1",
			addressLineTwo: "",
			city: "City1",
			state: "ST",
			zipcode: 12345,
		},
		{
			title: "Address 2",
			addressLineOne: "Address 2",
			addressLineTwo: "",
			city: "City2",
			state: "ST",
			zipcode: 12346,
		},
		{
			title: "Address 3",
			addressLineOne: "Address 3",
			addressLineTwo: "",
			city: "City3",
			state: "ST",
			zipcode: 12347,
		},
	],
};

describe("LocationContact", () => {
	it("renders park name", () => {
		renderWithClient(<LocationContact park={mockPark} />);
		expect(screen.getByText(mockPark.parkName)).toBeInTheDocument();
	});

	it("renders GPS coordinates", () => {
		renderWithClient(<LocationContact park={mockPark} />);
		expect(
			screen.getByText(
				`GPS: ${mockPark.coordinates.latitude}, ${mockPark.coordinates.longitude}`
			)
		).toBeInTheDocument();
	});

	it("renders phone number", () => {
		renderWithClient(<LocationContact park={mockPark} />);
		expect(screen.getByText(mockPark.phone)).toBeInTheDocument();
	});

	it("renders email", () => {
		renderWithClient(<LocationContact park={mockPark} />);
		if (mockPark.email) {
			expect(screen.getByText(mockPark.email)).toBeInTheDocument();
		}
	});

	it("renders address when provided", () => {
		renderWithClient(<LocationContact park={mockPark} />);
		if (mockPark.addresses?.[0]) {
			const addressText = screen.getByText((content, element) => {
				return (
					element?.tagName.toLowerCase() === "p" &&
					content.includes(mockPark.addresses[0].addressLineOne) &&
					content.includes(mockPark.addresses[0].city) &&
					content.includes(mockPark.addresses[0].state) &&
					content.includes(mockPark.addresses[0].zipcode.toString())
				);
			});
			expect(addressText).toBeInTheDocument();
		}
	});

	it("renders contact icons", () => {
		renderWithClient(<LocationContact park={mockPark} />);
		const svgElements = document.querySelectorAll("svg");
		expect(svgElements.length).toBeGreaterThanOrEqual(1);
	});

	it("renders achievements", () => {
		renderWithClient(<LocationContact park={mockPark} />);
		const stampElement = screen.getByText(
			"Stamp collected on"
		);
		expect(stampElement).toBeInTheDocument();
		expect(screen.queryAllByTestId("BLI").length).toBe(0);
	});

	it("shows correct stamp text", () => {
		renderWithClient(<AchievementsView park={mockPark} />);
		const stampElement = screen.getByText("Stamp not yet collected");
		expect(stampElement).toBeInTheDocument();
		renderWithClient(<AchievementsView park={mockPark} />);
		let stampElements = screen.getAllByText("Stamp not yet collected");
		const currentDate = new Date().toISOString();
		renderWithClient(<AchievementsView park={mockPark} />);
		stampElements = screen.getAllByText(
			`Stamp collected on ${DateHelper.stringify(new Date(currentDate)).replace(
				",",
				" at"
			)}`
		);
		expect(stampElements.length).toEqual(1);
	});

	it("Renders bucket list items", () => {
		renderWithClient(<AchievementsView park={mockPark} />);
		const stampElements = screen.getByTestId("BLI");
		expect(stampElements).toBeInTheDocument();
	});

	it("renders unchecked bucket list icon when required", () => {
		renderWithClient(<AchievementsView park={mockPark} />);
		const stampElements = screen.getByTestId("BLI");
		expect(stampElements).toBeInTheDocument();
	});

	describe("multiple addresses", () => {
		it("shows only first two addresses by default", () => {


			renderWithClient(<LocationContact park={parkWithManyAddresses} />);

			expect(screen.getByText(/Address 1/)).toBeInTheDocument();
			expect(screen.getByText(/Address 2/)).toBeInTheDocument();
			expect(screen.queryByText(/Address 3/)).not.toBeInTheDocument();
			expect(screen.getByText("Show More")).toBeInTheDocument();
		});

		it("toggles between showing all addresses and collapsing them", () => {
			renderWithClient(<LocationContact park={parkWithManyAddresses} />);

			// Initially only shows 2 addresses
			expect(screen.queryByText(/Address 3/)).not.toBeInTheDocument();

			// Click "Show More"
			fireEvent.click(screen.getByText("Show More"));

			// Should now show all addresses
			expect(screen.getByText(/Address 1/)).toBeInTheDocument();
			expect(screen.getByText(/Address 2/)).toBeInTheDocument();
			expect(screen.getByText(/Address 3/)).toBeInTheDocument();
			expect(screen.getByText("Show Less")).toBeInTheDocument();

			// Click "Show Less"
			fireEvent.click(screen.getByText("Show Less"));

			// Should hide the third address again
			expect(screen.queryByText(/Address 3/)).not.toBeInTheDocument();
			expect(screen.getByText("Show More")).toBeInTheDocument();
		});
	});
});
