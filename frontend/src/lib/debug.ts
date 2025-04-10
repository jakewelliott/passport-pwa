// switch this to true to mute all debug statements
const MUTED = false;

export const PRODUCTION = import.meta.env.PROD; // special for vite, using process breaks service worker
export const DEBUG = import.meta.env.DEV;

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
    CACHE: true,
    SW: true,
} as const;

type DebugType = keyof typeof DebugControl;

const MessageStyles: Record<DebugType, string> = {
    RENDER: 'color: gray',
    LOADER: 'color: #FFA500', // orange
    MISC: 'color: yellow',
    HOOK: 'color: green',
    FETCH: 'color: #00AAAA; opacity: 0.7', // teal-like
    QUERY: 'color: cyan',
    SUBSCRIPTION: 'color: blue',
    MUTATE: 'color: magenta',
    AUTH: 'color: #FF00FF', // magenta bright
    EFFECT: 'color: #0000AA; opacity: 0.7', // indigo-like
    STORAGE: 'color: #00FF00', // lime
    LAYOUT: 'color: gray',
    ENV: 'color: #FFFF00', // gold
    TEST: 'color: #AA00AA; opacity: 0.7', // lavender-like
    NOTIFICATIONS: 'color: #FF0000', // red bright
    STORE: 'color: #00FF00', // lime
    ERROR: 'color: red',
    CACHE: 'color: blue',
    SW: 'color: blue',
};

const padRight = (str: string, length: number): string => str.padEnd(length, ' ');

export const dbg = (t: DebugType, where: string, what?: unknown): void => {
    if (MUTED) return;
    if (DEBUG && DebugControl[t]) {
        const logType = padRight(`[${t}]`, 10);
        const location = padRight(where, 20);
        const message = what ? sjason(what) : '';
        console.log(`%c${logType}\t${location}\t${message}`, MessageStyles[t]);
    }
};

export const dbgif = (cond: boolean, t: DebugType, where: string, what?: unknown): void => {
    if (cond) {
        dbg(t, where, what);
    }
};

export const jason = (p: unknown): void => {
    console.log(sjason(p));
};

export const sjason = (p: unknown): string => {
    if (typeof p === 'string') {
        return p;
    }
    return JSON.stringify(p, null, 2);
};

dbg('ENV', 'DEBUG', DEBUG.toString());
