import {
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
  );
}
