import { StrictMode, createContext, useContext, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useNavigate,
} from "@tanstack/react-router";
import {
  AuthProviderIcon,
  SignIn,
  SignUp,
  UserButton,
  type SignInValues,
  type SignUpValues,
  type UserButtonUser,
} from "@repo/ui/auth";
import "@repo/ui/styles.css";
import "./styles.css";

interface AuthState {
  isLoading: boolean;
  user: UserButtonUser | null;
  signIn: (values: SignInValues) => Promise<void>;
  signUp: (values: SignUpValues) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

const providers = [
  {
    id: "github",
    label: "Continue with GitHub",
    icon: <AuthProviderIcon provider="github" />,
    onClick: () => undefined,
  },
  {
    id: "google",
    label: "Continue with Google",
    icon: <AuthProviderIcon provider="google" />,
    onClick: () => undefined,
  },
  {
    id: "apple",
    label: "Continue with Apple",
    icon: <AuthProviderIcon provider="apple" />,
    onClick: () => undefined,
  },
  {
    id: "microsoft",
    label: "Continue with Microsoft",
    icon: <AuthProviderIcon provider="microsoft" />,
    onClick: () => undefined,
  },
];

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserButtonUser | null>(null);

  const value = useMemo<AuthState>(
    () => ({
      isLoading,
      user,
      async signIn(values) {
        setIsLoading(true);
        await waitForSkeleton();
        setUser({
          name: values.email.split("@")[0] || "Account",
          email: values.email,
        });
        setIsLoading(false);
      },
      async signUp(values) {
        setIsLoading(true);
        await waitForSkeleton();
        setUser({
          name: values.name || values.email.split("@")[0] || "Account",
          email: values.email,
        });
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

function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return auth;
}

function RootShell() {
  return (
    <AuthProvider>
      <main className="auth-page">
        <section className="auth-shell">
          <aside className="auth-copy">
            <p className="auth-eyebrow">Zahir Auth</p>
            <h1>Auth skeleton</h1>
            <p>
              Vite app baru ini pakai TanStack Router dan komponen auth dari
              package UI. Semua request masih mock sampai backend Go
              disambungkan.
            </p>
            <nav className="auth-nav" aria-label="Auth routes">
              <Link to="/">Sign in</Link>
              <Link to="/sign-up">Sign up</Link>
              <Link to="/account">Account</Link>
            </nav>
          </aside>
          <section className="auth-stage">
            <Outlet />
          </section>
        </section>
      </main>
    </AuthProvider>
  );
}

function SignInRoute() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <SignIn
      isLoading={auth.isLoading}
      onForgotPassword={() => undefined}
      onSignUp={() => void navigate({ to: "/sign-up" })}
      onSubmit={async (values) => {
        await auth.signIn(values);
        await navigate({ to: "/account" });
      }}
      providers={providers}
    />
  );
}

function SignUpRoute() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <SignUp
      isLoading={auth.isLoading}
      onSignIn={() => void navigate({ to: "/" })}
      onSubmit={async (values) => {
        await auth.signUp(values);
        await navigate({ to: "/account" });
      }}
      providers={providers}
    />
  );
}

function AccountRoute() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.user) {
    return (
      <div className="auth-session-card">
        <p className="auth-eyebrow">Signed out</p>
        <h2>No mock session yet</h2>
        <p>Sign in or create an account to preview the user menu skeleton.</p>
        <button type="button" onClick={() => void navigate({ to: "/" })}>
          Back to sign in
        </button>
      </div>
    );
  }

  return (
    <div className="auth-session-card">
      <p className="auth-eyebrow">Signed in</p>
      <h2>Mock session ready</h2>
      <UserButton
        onManageAccount={() => undefined}
        onSignOut={() => {
          auth.signOut();
          void navigate({ to: "/" });
        }}
        user={auth.user}
      />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: RootShell,
});

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: SignInRoute,
});

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-up",
  component: SignUpRoute,
});

const accountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account",
  component: AccountRoute,
});

const routeTree = rootRoute.addChildren([
  signInRoute,
  signUpRoute,
  accountRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

function waitForSkeleton() {
  return new Promise((resolve) => {
    window.setTimeout(resolve, 350);
  });
}
