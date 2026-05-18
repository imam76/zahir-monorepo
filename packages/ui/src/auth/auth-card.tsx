import { type ReactNode } from "react";

export interface AuthCardProps {
  children: ReactNode;
  eyebrow?: string;
  title: string;
  description?: string;
  footer?: ReactNode;
  className?: string;
}

export function AuthCard({
  children,
  eyebrow,
  title,
  description,
  footer,
  className,
}: AuthCardProps) {
  return (
    <section className={["z-auth-card", className].filter(Boolean).join(" ")}>
      <header className="z-auth-card__header">
        {eyebrow ? <p className="z-auth-card__eyebrow">{eyebrow}</p> : null}
        <h1 className="z-auth-card__title">{title}</h1>
        {description ? (
          <p className="z-auth-card__description">{description}</p>
        ) : null}
      </header>
      <div className="z-auth-card__body">{children}</div>
      {footer ? <footer className="z-auth-card__footer">{footer}</footer> : null}
    </section>
  );
}
