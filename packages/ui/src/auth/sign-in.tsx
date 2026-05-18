import { type FormEvent, type ReactNode, useId } from "react";
import { Mail } from "lucide-react";
import { AuthCard } from "./auth-card";
import { PasswordField } from "./password-field";

export interface SignInValues {
  email: string;
  password: string;
}

export interface AuthProviderAction {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick: () => void | Promise<void>;
}

export interface SignInProps {
  title?: string;
  description?: string;
  submitLabel?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  passwordLabel?: string;
  defaultEmail?: string;
  isLoading?: boolean;
  error?: string;
  providers?: AuthProviderAction[];
  onSubmit: (values: SignInValues) => void | Promise<void>;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
}

export function SignIn({
  title = "Sign in",
  description = "Welcome back. Use your account to continue.",
  submitLabel = "Continue",
  emailLabel = "Email",
  emailPlaceholder = "you@example.com",
  passwordLabel = "Password",
  defaultEmail,
  isLoading = false,
  error,
  providers = [],
  onSubmit,
  onForgotPassword,
  onSignUp,
}: SignInProps) {
  const emailId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    onSubmit({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });
  }

  return (
    <AuthCard
      eyebrow="Authentication"
      title={title}
      description={description}
      footer={
        onSignUp ? (
          <p className="z-auth-switch">
            Need an account?{" "}
            <button type="button" onClick={onSignUp}>
              Create one
            </button>
          </p>
        ) : null
      }
    >
      {providers.length > 0 ? (
        <div className="z-auth-provider-list">
          {providers.map((provider) => (
            <button
              className="z-auth-secondary-button"
              aria-label={provider.label}
              key={provider.id}
              onClick={provider.onClick}
              type="button"
            >
              <span className="z-auth-provider-icon" aria-hidden>
                {provider.icon ?? provider.label.slice(0, 2).toUpperCase()}
              </span>
              <span className="z-auth-provider-label">{provider.label}</span>
            </button>
          ))}
        </div>
      ) : null}

      {providers.length > 0 ? <div className="z-auth-separator">or</div> : null}

      <form className="z-auth-form" onSubmit={handleSubmit}>
        <div className="z-auth-field">
          <label className="z-auth-label" htmlFor={emailId}>
            {emailLabel}
          </label>
          <div className="z-auth-input-shell">
            <Mail aria-hidden size={18} />
            <input
              autoComplete="email"
              className="z-auth-input z-auth-input--with-icon"
              defaultValue={defaultEmail}
              id={emailId}
              name="email"
              placeholder={emailPlaceholder}
              required
              type="email"
            />
          </div>
        </div>

        <PasswordField
          autoComplete="current-password"
          label={passwordLabel}
          name="password"
          required
        />

        {onForgotPassword ? (
          <button
            className="z-auth-link-button z-auth-link-button--end"
            onClick={onForgotPassword}
            type="button"
          >
            Forgot password?
          </button>
        ) : null}

        {error ? <p className="z-auth-banner">{error}</p> : null}

        <button className="z-auth-primary-button" disabled={isLoading} type="submit">
          {isLoading ? "Loading..." : submitLabel}
        </button>
      </form>
    </AuthCard>
  );
}
