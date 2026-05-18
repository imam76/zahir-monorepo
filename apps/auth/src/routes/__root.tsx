import { createRootRoute } from "@tanstack/react-router";
import { RootShell } from "../views/root-shell.js";

export const Route = createRootRoute({
  component: RootShell,
});
