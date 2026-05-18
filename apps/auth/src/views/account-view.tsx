import { useNavigate } from "@tanstack/react-router";
import { UserButton } from "@repo/ui/auth";
import { useAuth } from "../hooks/use-auth.js";

export function AccountView() {
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
