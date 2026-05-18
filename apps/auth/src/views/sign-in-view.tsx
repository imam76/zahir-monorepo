import { useNavigate } from "@tanstack/react-router";
import { SignIn } from "@repo/ui/auth";
import { useAuth } from "../hooks/use-auth.js";
import { authProviders } from "../lib/auth-providers.js";

export function SignInView() {
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
      providers={authProviders}
    />
  );
}
