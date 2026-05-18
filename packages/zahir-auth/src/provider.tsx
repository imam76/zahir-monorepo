import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createBrowserSessionStorage,
  createZahirAuthClient,
  type CreateZahirAuthClientOptions,
  type ZahirAuthClient,
  type ZahirAuthSession,
  type ZahirAuthUser,
  type ZahirSignInOptions,
} from "./client.js";

export interface ZahirAuthContextValue {
  error: string | null;
  isBooting: boolean;
  isLoading: boolean;
  session: ZahirAuthSession | null;
  user: ZahirAuthUser | null;
  clearError: () => void;
  signIn: (values: ZahirSignInOptions) => Promise<void>;
  signOut: () => Promise<void>;
}

export interface ZahirAuthProviderProps {
  children: ReactNode;
  client?: ZahirAuthClient;
  config?: CreateZahirAuthClientOptions;
  messages?: {
    fallbackError?: string;
    logoutLocalCleared?: string;
  };
  onError?: (error: unknown) => void;
  onSessionChange?: (session: ZahirAuthSession | null) => void;
}

const ZahirAuthContext = createContext<ZahirAuthContextValue | null>(null);

export function ZahirAuthProvider({
  children,
  client,
  config,
  messages,
  onError,
  onSessionChange,
}: ZahirAuthProviderProps) {
  const authClient = useMemo(() => {
    if (client) {
      return client;
    }

    if (!config) {
      throw new Error("ZahirAuthProvider requires either client or config.");
    }

    return createZahirAuthClient({
      ...config,
      storage: config.storage ?? createBrowserSessionStorage(),
    });
  }, [client, config]);
  const [error, setError] = useState<string | null>(null);
  const [isBooting, setIsBooting] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSessionState] = useState<ZahirAuthSession | null>(null);

  function setSession(nextSession: ZahirAuthSession | null) {
    setSessionState(nextSession);
    onSessionChange?.(nextSession);
  }

  useEffect(() => {
    let isMounted = true;

    async function bootSession() {
      const storedSession = authClient.getStoredSession();

      if (!storedSession) {
        setIsBooting(false);
        return;
      }

      try {
        const nextSession = await authClient.getCurrentSession(storedSession.id);

        if (isMounted) {
          setSession(nextSession);
        }
      } catch (error) {
        authClient.clearSession();
        onError?.(error);

        if (isMounted) {
          setSession(null);
        }
      } finally {
        if (isMounted) {
          setIsBooting(false);
        }
      }
    }

    void bootSession();

    return () => {
      isMounted = false;
    };
  }, [authClient]);

  const value = useMemo<ZahirAuthContextValue>(
    () => ({
      error,
      isBooting,
      isLoading,
      session,
      user: session?.user ?? null,
      clearError() {
        setError(null);
      },
      async signIn(values) {
        setIsLoading(true);
        setError(null);

        try {
          setSession(await authClient.signIn(values));
        } catch (error) {
          setError(getAuthErrorMessage(error, messages?.fallbackError));
          onError?.(error);
          throw error;
        } finally {
          setIsLoading(false);
        }
      },
      async signOut() {
        setIsLoading(true);
        setError(null);

        try {
          await authClient.signOut(session?.id);
        } catch (error) {
          setError(
            `${getAuthErrorMessage(error, messages?.fallbackError)} ${
              messages?.logoutLocalCleared ?? "Local session has been cleared."
            }`,
          );
          onError?.(error);
        } finally {
          setSession(null);
          setIsLoading(false);
        }
      },
    }),
    [authClient, error, isBooting, isLoading, messages, session],
  );

  return (
    <ZahirAuthContext.Provider value={value}>
      {children}
    </ZahirAuthContext.Provider>
  );
}

export function useZahirAuth() {
  const auth = useContext(ZahirAuthContext);

  if (!auth) {
    throw new Error("useZahirAuth must be used inside ZahirAuthProvider.");
  }

  return auth;
}

function getAuthErrorMessage(error: unknown, fallback?: string) {
  if (error instanceof Error) {
    return error.message;
  }

  return fallback ?? "Authentication failed.";
}
