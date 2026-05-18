import { createRootRouteWithContext } from "@tanstack/react-router";
import type { RouterContext } from "../lib/router-context.js";
import { RootShell } from "../views/root-shell.js";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootShell,
});
