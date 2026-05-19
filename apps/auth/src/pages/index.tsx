import {
  Link,
  createFileRoute,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { SignIn } from "@repo/zahir-auth";
import { useAuth } from "../hooks/use-auth.js";
import { authProviders } from "../lib/auth-providers.js";

export const Route = createFileRoute("/")({
  validateSearch: (search): { redirect?: string } => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isBooting) {
      return;
    }

    if (context.auth.user) {
      throw redirect({
        to: search.redirect ?? "/account",
      });
    }
  },
  component: SignInRoute,
});

function SignInRoute() {
  const search = Route.useSearch();
  const auth = useAuth();
  const router = useRouter();

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <aside className="auth-copy">
          <p className="auth-eyebrow">Zahir Auth</p>
          <h1>Zahir session</h1>
          <p>
            Login memakai komponen auth dan session API Zahir. Session disimpan
            sementara di tab browser dan divalidasi saat halaman dibuka ulang.
          </p>
          <nav className="auth-nav" aria-label="Auth routes">
            <Link to="/">Sign in</Link>
            <Link to="/account">CMS</Link>
          </nav>
        </aside>
        <section className="auth-stage">
          <SignIn
            error={auth.error ?? undefined}
            isLoading={auth.isLoading}
            onForgotPassword={auth.clearError}
            onSubmit={async (values) => {
              try {
                await auth.signIn(values);
                await router.invalidate();
                router.history.push(search.redirect ?? "/account");
              } catch {
                // Error state is owned by the auth package and rendered by SignIn.
              }
            }}
            providers={authProviders}
          />
        </section>
      </section>
    </main>
  );
}
