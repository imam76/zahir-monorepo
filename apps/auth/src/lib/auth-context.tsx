import { createContext, useMemo, useState, type ReactNode } from "react";
import type {
  SignInValues,
  SignUpValues,
  UserButtonUser,
} from "@repo/ui/auth";
import {
  createMockSignInSession,
  createMockSignUpSession,
} from "../services/mock-auth.js";

export interface AuthState {
  isLoading: boolean;
  user: UserButtonUser | null;
  signIn: (values: SignInValues) => Promise<void>;
  signUp: (values: SignUpValues) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserButtonUser | null>(null);

  const value = useMemo<AuthState>(
    () => ({
      isLoading,
      user,
      async signIn(values) {
        setIsLoading(true);
        setUser(await createMockSignInSession(values));
        setIsLoading(false);
      },
      async signUp(values) {
        setIsLoading(true);
        setUser(await createMockSignUpSession(values));
        setIsLoading(false);
      },
      signOut() {
        setUser(null);
      },
    }),
    [isLoading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
