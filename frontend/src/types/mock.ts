export interface Park {
	code: string;
	name: string;
	city: string;
	stamp: `./stamps/${string}`; // ensure the stamp is a valid path
}

export interface UserProfile {
	username: string;
	email: string;
	password: string;
	stamps: string[];
}
