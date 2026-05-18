import { createFileRoute } from "@tanstack/react-router";
import { AccountView } from "../../views/account-view.js";

export const Route = createFileRoute("/_auth/account")({
  component: AccountRoute,
});

function AccountRoute() {
  const { auth } = Route.useRouteContext();

  if (auth.isBooting) {
    return (
      <div className="auth-session-card">
        <p className="auth-eyebrow">Checking session</p>
        <h2>Loading account</h2>
      </div>
    );
  }

  return <AccountView user={auth.user!} />;
}
