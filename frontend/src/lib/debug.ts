import chalk from 'chalk';

// variable to switch between production and development

export const PRODUCTION = process.env.PROD === "PROD" ? true : false;
export const DEBUG = !PRODUCTION;

// switch this to true to mute all debug statements
const MUTED = false;

// Custom logging function that writes to both console and terminal
const log = (message: string): void => {
  console.log(message);
  if (import.meta.hot) {
    import.meta.hot.send('terminal:log', { message });
  }
};

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
  FETCH: true,
} as const;

type DebugType = keyof typeof DebugControl;

// chalk is an esm module, so im commenting it out for now
const MessageColors: Record<DebugType, (str: string) => string> = {
  RENDER: chalk.gray,
  LOADER: chalk.hex('#FFA500'), // orange
  MISC: chalk.yellow,
  HOOK: chalk.green,
  FETCH: chalk.cyan.dim, // teal-like
  QUERY: chalk.cyan,
  SUBSCRIPTION: chalk.blue,
  MUTATE: chalk.magenta,
  AUTH: chalk.magentaBright,
  EFFECT: chalk.blue.dim, // indigo-like
  STORAGE: chalk.greenBright, // lime
  LAYOUT: chalk.gray,
  ENV: chalk.yellowBright, // gold
  TEST: chalk.magenta.dim, // lavender-like
  NOTIFICATIONS: chalk.redBright,
  STORE: chalk.greenBright, // lime
  ERROR: chalk.red,
};

const padRight = (str: string, length: number): string => str.padEnd(length, ' ');

export const dbg = (t: DebugType, where: string, what?: unknown): void => {
  if (MUTED) return;
  if (DEBUG && DebugControl[t]) {
    const logType = padRight(`[${t}]`, 10);
    const location = padRight(where, 20);
    const message = what ? sjason(what) : '';
    const inlineMessage = message.length > 40 || message.includes('{') ? '(obj)' : message;
    log(MessageColors[t](`${logType}\t${location}\t${inlineMessage}`));
    // log(`${logType}\t${location}\t${inlineMessage}`);
    if (inlineMessage === '(obj)') {
      log(JSON.stringify(what, null, 2));
    }
  }
};

export const dbgif = (cond: boolean, t: DebugType, where: string, what?: unknown): void => {
  if (cond) {
    dbg(t, where, what);
  }
};

export const jason = (p: unknown): void => {
  log(sjason(p));
};

export const sjason = (p: unknown): string => {
  if (typeof p === 'string') {
    return p;
  }
  return JSON.stringify(p, null, 2);
};
