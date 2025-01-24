// Example types for your database models
export interface Park {
	id: number;
	name: string;
	location: string;
	description: string;
	latitude: number;
	longitude: number;
}

export interface Stamp {
	id: number;
	parkId: number;
	name: string;
	description: string;
	dateCollected?: string;
}

export interface User {
	id: number;
	username: string;
	email: string;
	stamps: Stamp[];
}
