import { useNavigate } from "@tanstack/react-router";
import { SignIn } from "@repo/ui/auth";
import { useAuth } from "../hooks/use-auth.js";
import { authProviders } from "../lib/auth-providers.js";

export function SignInView() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <SignIn
      error={auth.error ?? undefined}
      isLoading={auth.isLoading}
      onForgotPassword={auth.clearError}
      onSignUp={() => {
        auth.clearError();
        void navigate({ to: "/sign-up" });
      }}
      onSubmit={async (values) => {
        try {
          await auth.signIn(values);
          await navigate({ to: "/account" });
        } catch {
          // Error state is owned by AuthProvider and rendered by SignIn.
        }
      }}
      providers={authProviders}
    />
  );
}
