import {
  deleteZahirUserSession,
  getZahirUserSession,
  postZahirSession,
  type ZahirAuthKeys,
  type ZahirSessionResponse,
} from "./session.js";

const DEFAULT_STORAGE_KEY = "zahir.auth.session";

export interface ZahirAuthUser {
  email: string;
  name: string;
}

export interface ZahirAuthSession {
  id: string;
  user: ZahirAuthUser;
}

export interface ZahirAuthStorage {
  clear: () => void;
  read: () => ZahirAuthSession | null;
  save: (session: ZahirAuthSession) => void;
}

export interface CreateZahirAuthClientOptions {
  acceptLanguage?: string;
  baseUrl?: string;
  keys: ZahirAuthKeys;
  storage?: ZahirAuthStorage;
}

export interface ZahirSignInOptions {
  email: string;
  password: string;
}

export type ZahirAuthClient = ReturnType<typeof createZahirAuthClient>;

export function createZahirAuthClient({
  acceptLanguage = "",
  baseUrl,
  keys,
  storage,
}: CreateZahirAuthClientOptions) {
  return {
    clearSession() {
      storage?.clear();
    },
    getStoredSession() {
      return storage?.read() ?? null;
    },
    async getCurrentSession(id?: string) {
      const storedSession = storage?.read() ?? null;
      const sessionId = id ?? storedSession?.id;

      if (!sessionId) {
        return null;
      }

      const response = await getZahirUserSession({
        acceptLanguage,
        baseUrl,
        id: sessionId,
        keys,
      });
      const session = createAuthSession(response, storedSession?.user.email ?? "");

      storage?.save(session);

      return session;
    },
    async signIn({ email, password }: ZahirSignInOptions) {
      const response = await postZahirSession({
        acceptLanguage,
        baseUrl,
        keys,
        password,
        username: email,
      });
      const session = createAuthSession(response, email);

      storage?.save(session);

      return session;
    },
    async signOut(id?: string) {
      const sessionId = id ?? storage?.read()?.id;

      try {
        if (sessionId) {
          await deleteZahirUserSession({
            acceptLanguage,
            baseUrl,
            id: sessionId,
            keys,
          });
        }
      } finally {
        storage?.clear();
      }
    },
  };
}

export function createBrowserSessionStorage(
  key = DEFAULT_STORAGE_KEY,
): ZahirAuthStorage {
  return {
    clear() {
      globalThis.sessionStorage?.removeItem(key);
    },
    read() {
      const value = globalThis.sessionStorage?.getItem(key);

      if (!value) {
        return null;
      }

      try {
        return parseAuthSession(JSON.parse(value));
      } catch {
        globalThis.sessionStorage?.removeItem(key);
        return null;
      }
    },
    save(session) {
      globalThis.sessionStorage?.setItem(key, JSON.stringify(session));
    },
  };
}

function createAuthSession(
  response: ZahirSessionResponse,
  fallbackEmail: string,
): ZahirAuthSession {
  if (!response.id) {
    throw new Error("Login berhasil, tapi session id tidak ditemukan.");
  }

  const email = response.zahir_id?.email || fallbackEmail;
  const name = [response.zahir_id?.first_name, response.zahir_id?.last_name]
    .filter(Boolean)
    .join(" ");

  return {
    id: response.id,
    user: {
      email,
      name: name || getAccountName(email),
    },
  };
}

function getAccountName(email: string) {
  return email.split("@")[0] || "Account";
}

function parseAuthSession(value: unknown): ZahirAuthSession | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const session = value as Partial<ZahirAuthSession>;

  if (!session.id || typeof session.id !== "string") {
    return null;
  }

  if (!session.user || typeof session.user !== "object") {
    return null;
  }

  if (!session.user.email || typeof session.user.email !== "string") {
    return null;
  }

  return {
    id: session.id,
    user: {
      email: session.user.email,
      name:
        typeof session.user.name === "string"
          ? session.user.name
          : getAccountName(session.user.email),
    },
  };
}
