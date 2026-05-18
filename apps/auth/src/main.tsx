import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { ZahirAuthProvider } from "@repo/zahir-auth";
import "@repo/zahir-auth/styles.css";
import "./styles.css";
import { useAuth } from "./hooks/use-auth.js";
import { router } from "./router.js";
import { getZahirAuthClient } from "./services/zahir-session.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ZahirAuthProvider
      client={getZahirAuthClient()}
      messages={{
        fallbackError: "Terjadi kesalahan saat memproses autentikasi.",
        logoutLocalCleared: "Session lokal sudah dibersihkan.",
      }}
    >
      <AuthRouterProvider />
    </ZahirAuthProvider>
  </StrictMode>,
);

function AuthRouterProvider() {
  const auth = useAuth();

  useEffect(() => {
    void router.invalidate();
  }, [auth.isBooting, auth.user]);

  return <RouterProvider context={{ auth }} router={router} />;
}
