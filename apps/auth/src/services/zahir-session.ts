import {
  createBrowserSessionStorage,
  createZahirAuthClient,
} from "@repo/zahir-auth";

let zahirAuthClient: ReturnType<typeof createZahirAuthClient> | null = null;

export function getZahirAuthClient() {
  zahirAuthClient ??= createZahirAuthClient({
    acceptLanguage: getAcceptLanguage(),
    baseUrl: getApiBaseUrl(),
    keys: {
      clientId: getRequiredEnv("VITE_ZAHIR_CLIENT_ID"),
      clientSecret: getRequiredEnv("VITE_ZAHIR_CLIENT_SECRET"),
      jwtSecret: getRequiredEnv("VITE_ZAHIR_JWT_SECRET"),
    },
    storage: createBrowserSessionStorage(),
  });

  return zahirAuthClient;
}

function getApiBaseUrl() {
  return import.meta.env.VITE_ZAHIR_API_BASE_URL ?? "https://go.zahironline.com";
}

function getAcceptLanguage() {
  return import.meta.env.VITE_ZAHIR_ACCEPT_LANGUAGE ?? "";
}

function getRequiredEnv(
  key:
    | "VITE_ZAHIR_CLIENT_ID"
    | "VITE_ZAHIR_CLIENT_SECRET"
    | "VITE_ZAHIR_JWT_SECRET",
) {
  const value = import.meta.env[key];

  if (!value) {
    throw new Error(`Missing ${key} in apps/auth/.env`);
  }

  return value;
}
