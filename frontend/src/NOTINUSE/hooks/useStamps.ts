import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Stamp } from "./types";
import { api } from "./api";
import { parkKeys } from "./useParks";

export const stampKeys = {
	all: ["stamps"] as const,
	lists: (parkId: number) => [...stampKeys.all, "list", parkId] as const,
	detail: (parkId: number, stampId: number) =>
		[...stampKeys.all, "detail", parkId, stampId] as const,
};

export const useStamps = (parkId: number) => {
	return useQuery<Stamp[], Error>({
		queryKey: stampKeys.lists(parkId),
		queryFn: () => api.getStamps(parkId),
		enabled: !!parkId,
	});
};

export const useCollectStamp = () => {
	const queryClient = useQueryClient();

	return useMutation<
		Stamp, // Success response type
		Error, // Error type
		{ parkId: number; stampId: number } // Variables type
	>({
		mutationFn: ({ parkId, stampId }) => api.collectStamp(parkId, stampId),
		onSuccess: ({ parkId }) => {
			// Invalidate related queries
			queryClient.invalidateQueries({ queryKey: stampKeys.lists(parkId) });
			queryClient.invalidateQueries({ queryKey: parkKeys.detail(parkId) });
		},
	});
};
