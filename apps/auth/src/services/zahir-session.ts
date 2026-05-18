import type {
  SignInValues,
  UserButtonUser,
} from "@repo/zahir-auth";
import { postZahirSession } from "@repo/zahir-auth";

export async function createZahirSignInSession(
  values: SignInValues,
): Promise<UserButtonUser> {
  await postZahirSession({
    acceptLanguage: getAcceptLanguage(),
    baseUrl: getApiBaseUrl(),
    keys: {
      clientId: getRequiredEnv("VITE_ZAHIR_CLIENT_ID"),
      clientSecret: getRequiredEnv("VITE_ZAHIR_CLIENT_SECRET"),
      jwtSecret: getRequiredEnv("VITE_ZAHIR_JWT_SECRET"),
    },
    password: values.password,
    username: values.email,
  });

  return {
    email: values.email,
    name: getAccountName(values.email),
  };
}

function getAccountName(email: string) {
  return email.split("@")[0] || "Account";
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
