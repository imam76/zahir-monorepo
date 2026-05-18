import { type FormEvent, useId } from "react";
import { Mail, UserRound } from "lucide-react";
import { AuthCard } from "./auth-card";
import { PasswordField } from "./password-field";
import { type AuthProviderAction } from "./sign-in";

export interface SignUpValues {
  name: string;
  email: string;
  password: string;
}

export interface SignUpProps {
  title?: string;
  description?: string;
  submitLabel?: string;
  nameLabel?: string;
  emailLabel?: string;
  passwordLabel?: string;
  isLoading?: boolean;
  error?: string;
  providers?: AuthProviderAction[];
  terms?: string;
  onSubmit: (values: SignUpValues) => void | Promise<void>;
  onSignIn?: () => void;
}

export function SignUp({
  title = "Create account",
  description = "Start with your email and password.",
  submitLabel = "Create account",
  nameLabel = "Name",
  emailLabel = "Email",
  passwordLabel = "Password",
  isLoading = false,
  error,
  providers = [],
  terms = "By continuing, you agree to the terms and privacy policy.",
  onSubmit,
  onSignIn,
}: SignUpProps) {
  const nameId = useId();
  const emailId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    onSubmit({
      name: String(formData.get("name") ?? ""),
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
        onSignIn ? (
          <p className="z-auth-switch">
            Already have an account?{" "}
            <button type="button" onClick={onSignIn}>
              Sign in
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
          <label className="z-auth-label" htmlFor={nameId}>
            {nameLabel}
          </label>
          <div className="z-auth-input-shell">
            <UserRound aria-hidden size={18} />
            <input
              autoComplete="name"
              className="z-auth-input z-auth-input--with-icon"
              id={nameId}
              name="name"
              placeholder="Ada Lovelace"
              required
              type="text"
            />
          </div>
        </div>

        <div className="z-auth-field">
          <label className="z-auth-label" htmlFor={emailId}>
            {emailLabel}
          </label>
          <div className="z-auth-input-shell">
            <Mail aria-hidden size={18} />
            <input
              autoComplete="email"
              className="z-auth-input z-auth-input--with-icon"
              id={emailId}
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </div>
        </div>

        <PasswordField
          autoComplete="new-password"
          hint="Use at least 8 characters."
          label={passwordLabel}
          minLength={8}
          name="password"
          required
        />

        {terms ? <p className="z-auth-terms">{terms}</p> : null}
        {error ? <p className="z-auth-banner">{error}</p> : null}

        <button className="z-auth-primary-button" disabled={isLoading} type="submit">
          {isLoading ? "Loading..." : submitLabel}
        </button>
      </form>
    </AuthCard>
  );
}
