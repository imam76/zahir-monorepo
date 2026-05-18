import { useNavigate } from "@tanstack/react-router";
import { SignUp } from "@repo/ui/auth";
import { useAuth } from "../hooks/use-auth.js";
import { authProviders } from "../lib/auth-providers.js";

export function SignUpView() {
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
      providers={authProviders}
    />
  );
}
