type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S;

type TransformKey<K extends string, SpecialCases extends Record<string, string>> = K extends keyof SpecialCases
  ? SpecialCases[K]
  : SnakeToCamelCase<K>;

export type SnakeToCamelCaseObject<T, SpecialCases extends Record<string, string> = Record<string, never>> = {
  [K in keyof T as TransformKey<string & K, SpecialCases>]: T[K];
};

export function toCamelCase<
  T extends Record<string, any>,
  SpecialCases extends Record<string, string> = Record<string, never>,
>(obj: T, specialCases: SpecialCases = {} as SpecialCases): SnakeToCamelCaseObject<T, SpecialCases> {
  const result: any = {};

  for (const key in obj) {
    // Check for special cases first
    if (key in specialCases) {
      result[specialCases[key]] = obj[key];
      continue;
    }

    // Otherwise do normal snake_case to camelCase conversion
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    result[camelKey] = obj[key];
  }

  return result;
}

// Common special cases for different types
export const PARK_SPECIAL_CASES = {
  park_abbreviation: 'abbreviation',
} as const;

export type ParkSpecialCases = typeof PARK_SPECIAL_CASES;

// Example usage:
// const snakeData = { park_abbreviation: "ABC", park_type: "SPA" };
// const camelData = toCamelCase(snakeData, PARK_SPECIAL_CASES);
// // Result: { abbreviation: "ABC", parkType: "SPA" }
