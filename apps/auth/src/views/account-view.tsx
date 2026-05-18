import { useNavigate } from "@tanstack/react-router";
import { UserButton, type ZahirAuthUser } from "@repo/zahir-auth";
import { useAuth } from "../hooks/use-auth.js";

interface AccountViewProps {
  user: ZahirAuthUser;
}

export function AccountView({ user }: AccountViewProps) {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div className="auth-session-card">
      <p className="auth-eyebrow">Signed in</p>
      <h2>Session ready</h2>
      <UserButton
        onManageAccount={() => undefined}
        onSignOut={() => {
          void auth.signOut().then(() => navigate({ to: "/" }));
        }}
        user={user}
      />
    </div>
  );
}
