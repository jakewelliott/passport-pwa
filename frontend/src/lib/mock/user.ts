import DateHelper from "../date-helper";
import type { UserStamp, UserParkVisit, UserProfile } from "./types";
import userStampsJson from "./user_stamps.json";
import userParkVisitsJson from "./user_park_visits.json";

// biome-ignore lint/suspicious/noExplicitAny: using unsafe JSON parsing
const visitMapper = (visit: any): UserParkVisit => {
	return {
		code: visit.code,
		timestamp: DateHelper.parse(visit.timestamp),
	};
};

export const userParkVisits = userParkVisitsJson.map(visitMapper);

// biome-ignore lint/suspicious/noExplicitAny: using unsafe JSON parsing
const stampMapper = (stamp: any): UserStamp => {
	return {
		code: stamp.code,
		timestamp: DateHelper.parse(stamp.timestamp),
		location: stamp.location,
	};
};

export const userStamps = userStampsJson.map(stampMapper);

export const userProfile: UserProfile = {
	username: "dummyuser",
	email: "dummyuser@test.com",
	password: "dummyuser",
	stamps: userStamps,
	visits: userParkVisits,
};
