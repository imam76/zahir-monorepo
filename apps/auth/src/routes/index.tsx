import { createFileRoute } from "@tanstack/react-router";
import { SignInView } from "../views/sign-in-view.js";

export const Route = createFileRoute("/")({
  component: SignInView,
});
