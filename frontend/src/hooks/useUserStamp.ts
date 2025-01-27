import { useUser } from "./queries/useUser";
import type { ParkCode } from "@/lib/mock/types";

export const useUserStamp = (code: ParkCode) => {
	// re-use our query hooks whenever possible
	const { data: user, isLoading } = useUser();

	// return undefined if loading
	if (isLoading) return undefined;

	// return null if stamp not collected yet
	const stamp = user?.stamps.find((stamp) => stamp.code === code) || null;

	// return the stamp and loading state
	return stamp;
};
