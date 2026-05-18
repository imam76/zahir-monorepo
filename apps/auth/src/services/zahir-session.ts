import type {
  SignInValues,
  UserButtonUser,
} from "@repo/ui/auth";

const SESSION_PATH = "/api/v3/session";
const SESSION_TOKEN_EXPIRES_IN_SECONDS = 30 * 60;

export async function createZahirSignInSession(
  values: SignInValues,
): Promise<UserButtonUser> {
  const signedToken = await generateSessionToken({
    clientId: getRequiredEnv("VITE_ZAHIR_CLIENT_ID"),
    clientSecret: getRequiredEnv("VITE_ZAHIR_CLIENT_SECRET"),
    jwtSecret: getRequiredEnv("VITE_ZAHIR_JWT_SECRET"),
    password: values.password,
    username: values.email,
  });

  const response = await fetch(createSessionUrl(), {
    body: JSON.stringify({}),
    headers: {
      Accept: "application/json",
      "Accept-Language": getAcceptLanguage(),
      Authorization: `Bearer ${signedToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const payload = await readJsonResponse(response);

  if (!response.ok) {
    throw new Error(getSessionErrorMessage(payload, response.status));
  }

  return {
    name: getSessionName(payload, values.email),
    email: values.email,
  };
}

export async function createUnsupportedSignUpSession(): Promise<UserButtonUser> {
  throw new Error(
    `Sign up belum tersambung ke Zahir API. Gunakan login untuk membuat session.`,
  );
}

interface SessionResponse {
  acl?: unknown;
  company?: {
    name?: unknown;
  };
  data?: {
    name?: unknown;
    user?: {
      email?: unknown;
      name?: unknown;
    };
  };
  user?: {
    email?: unknown;
    name?: unknown;
  };
  zahir_id?: {
    email?: unknown;
    first_name?: unknown;
    last_name?: unknown;
  };
  message?: unknown;
  meta?: {
    message?: unknown;
  };
}

interface GenerateSessionTokenOptions {
  clientId: string;
  clientSecret: string;
  jwtSecret: string;
  password: string;
  username: string;
}

async function generateSessionToken({
  clientId,
  clientSecret,
  jwtSecret,
  password,
  username,
}: GenerateSessionTokenOptions) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const encodedHeader = encodeBase64UrlJson({
    alg: "HS256",
    typ: "JWT",
  });
  const encodedBody = encodeBase64UrlJson({
    aud: encodeBase64(`${username}:${password}`),
    exp: currentTimestamp + SESSION_TOKEN_EXPIRES_IN_SECONDS,
    iat: currentTimestamp - 60,
    iss: encodeBase64(`${clientId}:${clientSecret}`),
  });
  const token = `${encodedHeader}.${encodedBody}`;
  const signature = await createHmacSha256Signature(token, jwtSecret);

  return `${token}.${signature}`;
}

function createSessionUrl() {
  return new URL(SESSION_PATH, getApiBaseUrl()).toString();
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

async function readJsonResponse(response: Response): Promise<SessionResponse> {
  try {
    return (await response.json()) as SessionResponse;
  } catch {
    return {};
  }
}

function getSessionErrorMessage(payload: SessionResponse, status: number) {
  if (typeof payload.message === "string") {
    return payload.message;
  }

  if (typeof payload.meta?.message === "string") {
    return payload.meta.message;
  }

  return `Login gagal. Server mengembalikan status ${status}.`;
}

function getSessionName(payload: SessionResponse, email: string) {
  if (typeof payload.user?.name === "string") {
    return payload.user.name;
  }

  if (typeof payload.data?.user?.name === "string") {
    return payload.data.user.name;
  }

  if (typeof payload.data?.name === "string") {
    return payload.data.name;
  }

  if (
    typeof payload.zahir_id?.first_name === "string" ||
    typeof payload.zahir_id?.last_name === "string"
  ) {
    return `${payload.zahir_id.first_name ?? ""} ${
      payload.zahir_id.last_name ?? ""
    }`.trim();
  }

  return getAccountName(email);
}

function getAccountName(email: string) {
  return email.split("@")[0] || "Account";
}

async function createHmacSha256Signature(value: string, secret: string) {
  const key = await window.crypto.subtle.importKey(
    "raw",
    encodeUtf8(secret),
    {
      hash: "SHA-256",
      name: "HMAC",
    },
    false,
    ["sign"],
  );
  const signature = await window.crypto.subtle.sign("HMAC", key, encodeUtf8(value));

  return encodeBase64Url(new Uint8Array(signature));
}

function encodeBase64UrlJson(value: Record<string, number | string>) {
  return encodeBase64Url(encodeUtf8(JSON.stringify(value)));
}

function encodeBase64Url(bytes: Uint8Array) {
  return encodeBase64FromBytes(bytes)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/, "");
}

function encodeBase64(value: string) {
  return encodeBase64FromBytes(encodeUtf8(value));
}

function encodeBase64FromBytes(bytes: Uint8Array) {
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return window.btoa(binary);
}

function encodeUtf8(value: string) {
  return new TextEncoder().encode(value);
}
