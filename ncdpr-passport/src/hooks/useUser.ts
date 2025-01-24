import { useQuery } from "@tanstack/react-query";
import type { User, Stamp } from "./types";
import { api } from "./api";

export const userKeys = {
	all: ["users"] as const,
	detail: (id: number) => [...userKeys.all, "detail", id] as const,
	stamps: (id: number) => [...userKeys.all, "stamps", id] as const,
};

export function useUser(userId: number) {
	return useQuery<User, Error>({
		queryKey: userKeys.detail(userId),
		queryFn: () => api.getUser(userId),
		enabled: !!userId,
	});
}

export function useUserStamps(userId: number) {
	return useQuery<Stamp[], Error>({
		queryKey: userKeys.stamps(userId),
		queryFn: () => api.getUserStamps(userId),
		enabled: !!userId,
	});
}
