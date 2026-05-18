import type {
  SignInValues,
  SignUpValues,
  UserButtonUser,
} from "@repo/ui/auth";

const MOCK_AUTH_DELAY_MS = 350;

export async function createMockSignInSession(
  values: SignInValues,
): Promise<UserButtonUser> {
  await waitForMockAuth();

  return {
    name: getAccountName(values.email),
    email: values.email,
  };
}

export async function createMockSignUpSession(
  values: SignUpValues,
): Promise<UserButtonUser> {
  await waitForMockAuth();

  return {
    name: values.name || getAccountName(values.email),
    email: values.email,
  };
}

function getAccountName(email: string) {
  return email.split("@")[0] || "Account";
}

function waitForMockAuth() {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, MOCK_AUTH_DELAY_MS);
  });
}
