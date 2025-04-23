/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />

interface ViteTypeOptions {
    // By adding this line, you can make the type of ImportMetaEnv strict
    // to disallow unknown keys.
    strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
    readonly VITE_API_HOSTNAME: string;
    readonly VITE_API_HTTP_PORT: string;
    readonly VITE_API_HTTPS_PORT: string;
    readonly VITE_API_USE_PORT: boolean;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
