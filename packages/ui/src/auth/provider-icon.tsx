import {
  faApple,
  faFacebook,
  faGithub,
  faGitlab,
  faGoogle,
  faMicrosoft,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type AuthProviderIconName =
  | "apple"
  | "facebook"
  | "github"
  | "gitlab"
  | "google"
  | "microsoft"
  | "x";

export interface AuthProviderIconProps {
  provider: AuthProviderIconName;
  className?: string;
}

const icons = {
  apple: faApple,
  facebook: faFacebook,
  github: faGithub,
  gitlab: faGitlab,
  google: faGoogle,
  microsoft: faMicrosoft,
  x: faXTwitter,
} satisfies Record<AuthProviderIconName, typeof faGithub>;

export function AuthProviderIcon({ provider, className }: AuthProviderIconProps) {
  return (
    <FontAwesomeIcon
      className={className}
      fixedWidth
      icon={icons[provider]}
    />
  );
}
