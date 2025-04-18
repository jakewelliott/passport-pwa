// Misc utility types that aren't standalone records in a table

export interface Geopoint {
    latitude: number;
    longitude: number;
    inaccuracyRadius: number;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export type Address = {
    title: string;
    addressLineOne: string;
    addressLineTwo: string;
    city: string;
    state: string;
    zipcode: number;
};

// denotes when an API call takes no body
const emptySymbol = Symbol('EmptyObject type');
export type EmptyBody = { [emptySymbol]?: never };
