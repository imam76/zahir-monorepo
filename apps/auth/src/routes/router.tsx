import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { AccountView } from "../views/account-view.js";
import { RootShell } from "../views/root-shell.js";
import { SignInView } from "../views/sign-in-view.js";
import { SignUpView } from "../views/sign-up-view.js";

const rootRoute = createRootRoute({
  component: RootShell,
});

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: SignInView,
});

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-up",
  component: SignUpView,
});

const accountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account",
  component: AccountView,
});

const routeTree = rootRoute.addChildren([
  signInRoute,
  signUpRoute,
  accountRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
