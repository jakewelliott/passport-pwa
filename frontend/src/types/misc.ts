export interface Geopoint {
    latitude: number;
    longitude: number;
    inaccuracyRadius: number;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface Address {
    title: string;
    addressLineOne: string;
    addressLineTwo: string;
    city: string;
    state: string;
    zipcode: number;
}

// denotes when an API call takes no body
const emptySymbol = Symbol('EmptyObject type');
export type EmptyBody = { [emptySymbol]?: never };
