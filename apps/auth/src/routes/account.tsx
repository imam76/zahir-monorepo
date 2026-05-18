import { createFileRoute } from "@tanstack/react-router";
import { AccountView } from "../views/account-view.js";

export const Route = createFileRoute("/account")({
  component: AccountView,
});
