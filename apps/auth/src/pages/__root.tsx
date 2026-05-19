import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { RouterContext } from "../lib/router-context.js";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootShell,
});

function RootShell() {
  return <Outlet />;
}
