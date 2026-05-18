import { Eye, EyeOff } from "lucide-react";
import { type ComponentPropsWithoutRef, useId, useState } from "react";

export interface PasswordFieldProps
  extends Omit<ComponentPropsWithoutRef<"input">, "type"> {
  label?: string;
  hint?: string;
  error?: string;
}

export function PasswordField({
  label = "Password",
  hint,
  error,
  id,
  className,
  ...props
}: PasswordFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="z-auth-field">
      <label className="z-auth-label" htmlFor={inputId}>
        {label}
      </label>
      <div className="z-auth-password">
        <input
          {...props}
          id={inputId}
          type={isVisible ? "text" : "password"}
          className={["z-auth-input", className].filter(Boolean).join(" ")}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
        <button
          type="button"
          className="z-auth-icon-button"
          aria-label={isVisible ? "Hide password" : "Show password"}
          onClick={() => setIsVisible((current) => !current)}
        >
          {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {hint ? <p className="z-auth-help">{hint}</p> : null}
      {error ? (
        <p className="z-auth-error" id={`${inputId}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
