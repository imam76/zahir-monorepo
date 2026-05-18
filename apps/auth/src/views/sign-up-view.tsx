import { useNavigate } from "@tanstack/react-router";
import { SignUp } from "@repo/ui/auth";
import { useAuth } from "../hooks/use-auth.js";
import { authProviders } from "../lib/auth-providers.js";

export function SignUpView() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <SignUp
      error={auth.error ?? undefined}
      isLoading={auth.isLoading}
      onSignIn={() => {
        auth.clearError();
        void navigate({ to: "/" });
      }}
      onSubmit={async (values) => {
        try {
          await auth.signUp(values);
          await navigate({ to: "/account" });
        } catch {
          // Error state is owned by AuthProvider and rendered by SignUp.
        }
      }}
      providers={authProviders}
    />
  );
}
