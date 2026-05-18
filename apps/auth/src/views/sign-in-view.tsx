import { useRouter } from "@tanstack/react-router";
import { SignIn } from "@repo/zahir-auth";
import { useAuth } from "../hooks/use-auth.js";
import { authProviders } from "../lib/auth-providers.js";

interface SignInViewProps {
  redirectTo: string;
}

export function SignInView({ redirectTo }: SignInViewProps) {
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
          router.history.push(redirectTo);
        } catch {
          // Error state is owned by the auth package and rendered by SignIn.
        }
      }}
      providers={authProviders}
    />
  );
}
