import { Link, Outlet } from "@tanstack/react-router";

export function RootShell() {
  return (
    <main className="auth-page">
      <section className="auth-shell">
        <aside className="auth-copy">
          <p className="auth-eyebrow">Zahir Auth</p>
          <h1>Zahir session</h1>
          <p>
            Login memakai komponen auth dan session API Zahir. Session disimpan
            sementara di tab browser dan divalidasi saat halaman dibuka ulang.
          </p>
          <nav className="auth-nav" aria-label="Auth routes">
            <Link to="/">Sign in</Link>
            <Link to="/account">Account</Link>
          </nav>
        </aside>
        <section className="auth-stage">
          <Outlet />
        </section>
      </section>
    </main>
  );
}
