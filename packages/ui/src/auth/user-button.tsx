import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { LogOut, Settings, UserRound } from "lucide-react";
import { type ReactNode } from "react";

export interface UserButtonUser {
  name?: string;
  email?: string;
  imageUrl?: string;
}

export interface UserButtonAction {
  label: string;
  icon?: ReactNode;
  onSelect: () => void;
}

export interface UserButtonProps {
  user: UserButtonUser;
  actions?: UserButtonAction[];
  onManageAccount?: () => void;
  onSignOut?: () => void;
}

export function UserButton({
  user,
  actions = [],
  onManageAccount,
  onSignOut,
}: UserButtonProps) {
  const initials = getInitials(user.name ?? user.email ?? "User");

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="z-user-button" type="button">
          <span className="z-user-button__avatar">
            {user.imageUrl ? (
              <img alt="" src={user.imageUrl} />
            ) : (
              <span>{initials}</span>
            )}
          </span>
          <span className="z-user-button__meta">
            <span>{user.name ?? "Account"}</span>
            {user.email ? <small>{user.email}</small> : null}
          </span>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="end" className="z-user-menu" sideOffset={8}>
          <div className="z-user-menu__identity">
            <span className="z-user-menu__avatar">{initials}</span>
            <span>
              <strong>{user.name ?? "Account"}</strong>
              {user.email ? <small>{user.email}</small> : null}
            </span>
          </div>

          {onManageAccount ? (
            <DropdownMenu.Item
              className="z-user-menu__item"
              onSelect={onManageAccount}
            >
              <Settings size={16} />
              Manage account
            </DropdownMenu.Item>
          ) : null}

          {actions.map((action) => (
            <DropdownMenu.Item
              className="z-user-menu__item"
              key={action.label}
              onSelect={action.onSelect}
            >
              {action.icon ?? <UserRound size={16} />}
              {action.label}
            </DropdownMenu.Item>
          ))}

          {onSignOut ? (
            <>
              <DropdownMenu.Separator className="z-user-menu__separator" />
              <DropdownMenu.Item className="z-user-menu__item" onSelect={onSignOut}>
                <LogOut size={16} />
                Sign out
              </DropdownMenu.Item>
            </>
          ) : null}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function getInitials(value: string) {
  return value
    .split(/[.@\s_-]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
