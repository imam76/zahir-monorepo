import { createContext, useMemo, useState, type ReactNode } from "react";
import type {
  SignInValues,
  UserButtonUser,
} from "@repo/zahir-auth";
import { createZahirSignInSession } from "../services/zahir-session.js";

export interface AuthState {
  error: string | null;
  isLoading: boolean;
  user: UserButtonUser | null;
  clearError: () => void;
  signIn: (values: SignInValues) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserButtonUser | null>(null);

  const value = useMemo<AuthState>(
    () => ({
      error,
      isLoading,
      user,
      clearError() {
        setError(null);
      },
      async signIn(values) {
        setIsLoading(true);
        setError(null);

        try {
          setUser(await createZahirSignInSession(values));
        } catch (error) {
          setError(getAuthErrorMessage(error));
          throw error;
        } finally {
          setIsLoading(false);
        }
      },
      signOut() {
        setError(null);
        setUser(null);
      },
    }),
    [error, isLoading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function getAuthErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Terjadi kesalahan saat memproses autentikasi.";
}
