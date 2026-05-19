import { createFileRoute, redirect } from "@tanstack/react-router";
import { CmsShell } from "../../components/cms/cms-shell.js";

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context, location }) => {
    if (context.auth.isBooting) {
      return;
    }

    if (!context.auth.user) {
      throw redirect({
        replace: true,
        search: {
          redirect: location.href,
        },
        to: "/",
      });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return <CmsShell />;
}
