const DEFAULT_BASE_URL = "https://go.zahironline.com";
const SESSION_PATH = "/api/v3/session";
const SESSION_TOKEN_EXPIRES_IN_SECONDS = 30 * 60;

export interface ZahirAuthKeys {
  clientId: string;
  clientSecret: string;
  jwtSecret: string;
}

export interface GenerateZahirSessionTokenOptions {
  keys: ZahirAuthKeys;
  password: string;
  username: string;
}

export interface PostZahirSessionOptions extends GenerateZahirSessionTokenOptions {
  acceptLanguage?: string;
  baseUrl?: string;
}

interface ZahirSessionErrorResponse {
  message?: unknown;
  meta?: {
    message?: unknown;
  };
}

export async function postZahirSession({
  acceptLanguage = "",
  baseUrl = DEFAULT_BASE_URL,
  keys,
  password,
  username,
}: PostZahirSessionOptions) {
  const signedToken = await generateZahirSessionToken({
    keys,
    password,
    username,
  });
  const response = await fetch(createSessionUrl(baseUrl), {
    body: JSON.stringify({}),
    headers: {
      Accept: "application/json",
      "Accept-Language": acceptLanguage,
      Authorization: `Bearer ${signedToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const payload = await readJsonResponse(response);

  if (!response.ok) {
    throw new Error(getZahirSessionErrorMessage(payload, response.status));
  }

}

export async function generateZahirSessionToken({
  keys,
  password,
  username,
}: GenerateZahirSessionTokenOptions) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const encodedHeader = encodeBase64UrlJson({
    alg: "HS256",
    typ: "JWT",
  });
  const encodedBody = encodeBase64UrlJson({
    aud: encodeBase64(`${username}:${password}`),
    exp: currentTimestamp + SESSION_TOKEN_EXPIRES_IN_SECONDS,
    iat: currentTimestamp - 60,
    iss: encodeBase64(`${keys.clientId}:${keys.clientSecret}`),
  });
  const token = `${encodedHeader}.${encodedBody}`;
  const signature = await createHmacSha256Signature(token, keys.jwtSecret);

  return `${token}.${signature}`;
}

function createSessionUrl(baseUrl: string) {
  return new URL(SESSION_PATH, baseUrl).toString();
}

async function readJsonResponse(
  response: Response,
): Promise<ZahirSessionErrorResponse> {
  try {
    return (await response.json()) as ZahirSessionErrorResponse;
  } catch {
    return {};
  }
}

function getZahirSessionErrorMessage(
  payload: ZahirSessionErrorResponse,
  status: number,
) {
  if (typeof payload.message === "string") {
    return payload.message;
  }

  if (typeof payload.meta?.message === "string") {
    return payload.meta.message;
  }

  return `Login gagal. Server mengembalikan status ${status}.`;
}

async function createHmacSha256Signature(value: string, secret: string) {
  if (!globalThis.crypto?.subtle) {
    throw new Error("Web Crypto API tidak tersedia untuk signing JWT.");
  }

  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    encodeUtf8(secret),
    {
      hash: "SHA-256",
      name: "HMAC",
    },
    false,
    ["sign"],
  );
  const signature = await globalThis.crypto.subtle.sign(
    "HMAC",
    key,
    encodeUtf8(value),
  );

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

  return globalThis.btoa(binary);
}

function encodeUtf8(value: string) {
  return new TextEncoder().encode(value);
}
