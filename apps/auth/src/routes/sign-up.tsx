import { createFileRoute } from "@tanstack/react-router";
import { SignUpView } from "../views/sign-up-view.js";

export const Route = createFileRoute("/sign-up")({
  component: SignUpView,
});
