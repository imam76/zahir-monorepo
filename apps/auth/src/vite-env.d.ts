/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ZAHIR_ACCEPT_LANGUAGE?: string;
  readonly VITE_ZAHIR_API_BASE_URL?: string;
  readonly VITE_ZAHIR_CLIENT_ID?: string;
  readonly VITE_ZAHIR_CLIENT_SECRET?: string;
  readonly VITE_ZAHIR_JWT_SECRET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
