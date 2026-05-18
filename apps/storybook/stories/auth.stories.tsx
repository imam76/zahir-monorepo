import type { Meta, StoryObj } from "@storybook/react-vite";
import { AuthProviderIcon, SignIn, SignUp, UserButton } from "@repo/ui/auth";

const meta = {
  title: "Auth/Clerk-like",
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const providers = [
  {
    id: "github",
    label: "Continue with GitHub",
    icon: <AuthProviderIcon provider="github" />,
    onClick: () => alert("GitHub provider clicked"),
  },
  {
    id: "google",
    label: "Continue with Google",
    icon: <AuthProviderIcon provider="google" />,
    onClick: () => alert("Google provider clicked"),
  },
  {
    id: "apple",
    label: "Continue with Apple",
    icon: <AuthProviderIcon provider="apple" />,
    onClick: () => alert("Apple provider clicked"),
  },
  {
    id: "microsoft",
    label: "Continue with Microsoft",
    icon: <AuthProviderIcon provider="microsoft" />,
    onClick: () => alert("Microsoft provider clicked"),
  },
];

export const SignInForm: Story = {
  render: () => (
    <SignIn
      defaultEmail="imam@example.com"
      error=""
      onForgotPassword={() => alert("Forgot password")}
      onSignUp={() => alert("Go to sign up")}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      providers={providers}
    />
  ),
};

export const SignUpForm: Story = {
  render: () => (
    <SignUp
      onSignIn={() => alert("Go to sign in")}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      providers={providers}
    />
  ),
};

export const AccountMenu: Story = {
  render: () => (
    <UserButton
      actions={[
        {
          label: "Security",
          onSelect: () => alert("Security"),
        },
      ]}
      onManageAccount={() => alert("Manage account")}
      onSignOut={() => alert("Sign out")}
      user={{
        name: "Imam Zahir",
        email: "imam@example.com",
      }}
    />
  ),
};
