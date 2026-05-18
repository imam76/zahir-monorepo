import { useNavigate } from "@tanstack/react-router";
import { UserButton } from "@repo/zahir-auth";
import { useAuth } from "../hooks/use-auth.js";

export function AccountView() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth.isBooting) {
    return (
      <div className="auth-session-card">
        <p className="auth-eyebrow">Checking session</p>
        <h2>Loading account</h2>
      </div>
    );
  }

  if (!auth.user) {
    return (
      <div className="auth-session-card">
        <p className="auth-eyebrow">Signed out</p>
        <h2>No active session</h2>
        <p>Sign in to continue to your account.</p>
        <button type="button" onClick={() => void navigate({ to: "/" })}>
          Back to sign in
        </button>
      </div>
    );
  }

  return (
    <div className="auth-session-card">
      <p className="auth-eyebrow">Signed in</p>
      <h2>Session ready</h2>
      <UserButton
        onManageAccount={() => undefined}
        onSignOut={() => {
          void auth.signOut().then(() => navigate({ to: "/" }));
        }}
        user={auth.user}
      />
    </div>
  );
}
