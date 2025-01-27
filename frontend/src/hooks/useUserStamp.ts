import { useUser } from "./queries/useUser";
import type { ParkCode } from "@/lib/mock/types";

export const useUserStamp = (code: ParkCode) => {
	// re-use our query hooks whenever possible
	const { data: user, isLoading } = useUser();

	// return null if stamp not collected yet
	const stamp = user?.stamps.find((stamp) => stamp.code === code) || null;

	return { stamp, isLoading };
};
