import { useNavigate } from "@tanstack/react-router";
import { SignIn } from "@repo/zahir-auth";
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
      onSubmit={async (values) => {
        try {
          await auth.signIn(values);
          await navigate({ to: "/account" });
        } catch {
          // Error state is owned by the auth package and rendered by SignIn.
        }
      }}
      providers={authProviders}
    />
  );
}
