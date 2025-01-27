// biome-ignore lint/suspicious/noExplicitAny: we need to use any here
type ObjectMapper<T extends object> = (obj: any) => T;

// Returns a strongly typed mapper from a dummy object
const dummyMapper = <T extends object>(dummy: T): ObjectMapper<T> => {
	// biome-ignore lint/suspicious/noExplicitAny: we need to use any here
	return (obj: any): T => {
		return Object.keys(dummy).reduce(
			(mapped, key) => ({
				// biome-ignore lint/performance/noAccumulatingSpread: i do what i want, biome
				...mapped,
				// @ts-ignore we live on the edge
				[key]: obj[key] ?? dummy[key],
			}),
			{} as T,
		);
	};
};

export default dummyMapper;
