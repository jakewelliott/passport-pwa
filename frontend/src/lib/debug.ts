// variable to switch between production and development
export const PRODUCTION = false;

// variable to enable debugging statements
export const DEBUG = !PRODUCTION;

// debugging utility function & types
const DebugControl = {
  AUTH: true,
  RENDER: true,
  HOOK: true,
  QUERY: true,
  MUTATE: true,
  MISC: true,
  SUBSCRIPTION: true,
  LOADER: true,
  EFFECT: true,
  STORAGE: true,
  LAYOUT: true,
  ENV: true,
  TEST: true,
  NOTIFICATIONS: true,
  STORE: true,
  ERROR: true,
} as const;

type DebugType = keyof typeof DebugControl; // ah so nice

const colors = {
  red: '\x1b[31m',
  black: '\x1b[30m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  brightBlack: '\x1b[90m',
  brightRed: '\x1b[91m',
  brightGreen: '\x1b[92m',
  brightYellow: '\x1b[93m',
  brightBlue: '\x1b[94m',
  brightMagenta: '\x1b[95m',
  brightCyan: '\x1b[96m',
  brightWhite: '\x1b[97m',
  orange: '\x1b[38;5;208m',
  pink: '\x1b[38;5;205m',
  purple: '\x1b[38;5;129m',
  indigo: '\x1b[38;5;54m',
  teal: '\x1b[38;5;23m',
  lime: '\x1b[38;5;118m',
  brown: '\x1b[38;5;130m',
  gray: '\x1b[38;5;245m',
  olive: '\x1b[38;5;100m',
  maroon: '\x1b[38;5;88m',
  navy: '\x1b[38;5;17m',
  coral: '\x1b[38;5;209m',
  turquoise: '\x1b[38;5;45m',
  lavender: '\x1b[38;5;183m',
  salmon: '\x1b[38;5;210m',
  gold: '\x1b[38;5;220m',
  plum: '\x1b[38;5;96m',
  khaki: '\x1b[38;5;185m',
  crimson: '\x1b[38;5;160m',
};

const MessageColors: Record<DebugType, string> = {
  RENDER: colors.gray,
  LOADER: colors.orange,
  MISC: colors.yellow,
  HOOK: colors.green,
  QUERY: colors.cyan,
  SUBSCRIPTION: colors.blue,
  MUTATE: colors.purple,
  AUTH: colors.pink,
  EFFECT: colors.indigo,
  STORAGE: colors.lime,
  LAYOUT: colors.gray,
  ENV: colors.gold,
  TEST: colors.lavender,
  NOTIFICATIONS: colors.brightRed,
  STORE: colors.lime,
  ERROR: colors.red,
};

const RESET_COLOR = '\x1b[0m';

const padRight = (str: string, length: number): string => str.padEnd(length, ' ');

const cutString = (s: string, n: number): string => {
  const str = `${s} `;
  return str.substring(0, Math.min(n, str.length));
};

export const dbg = (t: DebugType, where: string, what?: unknown): void => {
  if (DEBUG && DebugControl[t]) {
    const logType = padRight(`[${t}]`, 10);
    const location = padRight(where, 20);
    const message = what?.toString() ?? '';

    console.log(`${MessageColors[t]}${logType}\t${location}\t${cutString(message, 40)}${RESET_COLOR}`);
  }
};

export const dbgif = (cond: boolean, t: DebugType, where: string, what?: unknown): void => {
  if (cond) {
    dbg(t, where, what);
  }
};

export const jason = (p: unknown): void => {
  console.log(JSON.stringify(p, null, 2));
};

export const sjason = (p: unknown): string => {
  return JSON.stringify(p, null, 2);
};

// removes all null fields from an object and logs a count
export const nonull = <T extends Record<string, unknown>>(obj: T, log = false): Partial<T> => {
  let count = 0;
  const result = { ...obj };

  for (const key in result) {
    if (result[key] === null) {
      delete result[key];
      count++;
    }
  }

  if (log) {
    console.log(`Removed ${count} null fields`);
  }

  return result;
};
