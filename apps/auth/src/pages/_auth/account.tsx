import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { UserButton } from "@repo/zahir-auth";
import { useAuth } from "../../hooks/use-auth.js";

export const Route = createFileRoute("/_auth/account")({
  component: AccountRoute,
});

function AccountRoute() {
  const { auth } = Route.useRouteContext();
  const session = useAuth();
  const navigate = useNavigate();

  if (auth.isBooting) {
    return (
      <div className="auth-session-card">
        <p className="auth-eyebrow">Checking session</p>
        <h2>Loading account</h2>
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
          void session.signOut().then(() => navigate({ to: "/" }));
        }}
        user={auth.user!}
      />
    </div>
  );
}
