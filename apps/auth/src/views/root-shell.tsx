import { Link, Outlet } from "@tanstack/react-router";
import { AuthProvider } from "../lib/auth-context.js";

export function RootShell() {
  return (
    <AuthProvider>
      <main className="auth-page">
        <section className="auth-shell">
          <aside className="auth-copy">
            <p className="auth-eyebrow">Zahir Auth</p>
            <h1>Auth skeleton</h1>
            <p>
              Vite app baru ini pakai TanStack Router dan komponen auth dari
              package UI. Semua request masih mock sampai backend Go
              disambungkan.
            </p>
            <nav className="auth-nav" aria-label="Auth routes">
              <Link to="/">Sign in</Link>
              <Link to="/sign-up">Sign up</Link>
              <Link to="/account">Account</Link>
            </nav>
          </aside>
          <section className="auth-stage">
            <Outlet />
          </section>
        </section>
      </main>
    </AuthProvider>
  );
}
