import { createFileRoute, redirect } from "@tanstack/react-router";
import { SignInView } from "../views/sign-in-view.js";

export const Route = createFileRoute("/")({
  validateSearch: (search): { redirect?: string } => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isBooting) {
      return;
    }

    if (context.auth.user) {
      throw redirect({
        to: search.redirect ?? "/account",
      });
    }
  },
  component: SignInRoute,
});

function SignInRoute() {
  const search = Route.useSearch();

  return <SignInView redirectTo={search.redirect ?? "/account"} />;
}
