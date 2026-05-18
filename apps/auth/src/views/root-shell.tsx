import { Link, Outlet } from "@tanstack/react-router";
import { ZahirAuthProvider } from "@repo/zahir-auth";
import { getZahirAuthClient } from "../services/zahir-session.js";

export function RootShell() {
  return (
    <ZahirAuthProvider
      client={getZahirAuthClient()}
      messages={{
        fallbackError: "Terjadi kesalahan saat memproses autentikasi.",
        logoutLocalCleared: "Session lokal sudah dibersihkan.",
      }}
    >
      <main className="auth-page">
        <section className="auth-shell">
          <aside className="auth-copy">
            <p className="auth-eyebrow">Zahir Auth</p>
            <h1>Zahir session</h1>
            <p>
              Login memakai komponen auth dan session API Zahir. Session
              disimpan sementara di tab browser dan divalidasi saat halaman
              dibuka ulang.
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
    </ZahirAuthProvider>
  );
}
