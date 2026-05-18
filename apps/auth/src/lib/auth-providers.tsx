import {
  AuthProviderIcon,
  type AuthProviderAction,
} from "@repo/zahir-auth";

export const authProviders: AuthProviderAction[] = [
  {
    id: "github",
    label: "Continue with GitHub",
    icon: <AuthProviderIcon provider="github" />,
    onClick: () => undefined,
  },
  {
    id: "google",
    label: "Continue with Google",
    icon: <AuthProviderIcon provider="google" />,
    onClick: () => undefined,
  },
  {
    id: "apple",
    label: "Continue with Apple",
    icon: <AuthProviderIcon provider="apple" />,
    onClick: () => undefined,
  },
  {
    id: "microsoft",
    label: "Continue with Microsoft",
    icon: <AuthProviderIcon provider="microsoft" />,
    onClick: () => undefined,
  },
];
