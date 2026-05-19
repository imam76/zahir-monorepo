import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import { UserButton } from "@repo/zahir-auth";
import {
  BarChart3,
  Bell,
  Building2,
  FileText,
  Home,
  LayoutDashboard,
  Menu,
  Package,
  Search,
  Settings,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/use-auth.js";
import { Badge } from "../ui/badge.js";
import { Button } from "../ui/button.js";
import { cn } from "../../lib/utils.js";

type NavigationItem = {
  icon: typeof LayoutDashboard;
  label: string;
  to?: "/account";
};

const navigationItems: NavigationItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/account" },
  { icon: FileText, label: "Konten" },
  { icon: Package, label: "Katalog" },
  { icon: Users, label: "Pelanggan" },
  { icon: BarChart3, label: "Laporan" },
  { icon: Settings, label: "Pengaturan" },
] as const;

export function CmsShell() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="min-h-svh bg-[radial-gradient(circle_at_top_left,hsl(173_78%_92%),transparent_30rem),linear-gradient(180deg,hsl(178_35%_98%),hsl(220_43%_97%))] text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[17rem] border-r border-sidebar-border bg-sidebar/94 text-sidebar-foreground backdrop-blur lg:flex lg:flex-col">
        <SidebarContent />
      </aside>

      <div className="lg:pl-[17rem]">
        <header className="sticky top-0 z-20 flex h-[4.25rem] items-center gap-[13px] border-b border-border/80 bg-background/90 px-4 backdrop-blur md:px-[21px]">
          <Button
            className="lg:hidden"
            onClick={() => setIsMobileNavOpen(true)}
            size="icon"
            type="button"
            variant="ghost"
          >
            <Menu />
            <span className="sr-only">Open menu</span>
          </Button>
          <div className="hidden items-center gap-2 text-sm font-medium text-muted-foreground sm:flex">
            <Home className="size-4" />
            <span>Dashboard</span>
          </div>

          <div className="relative hidden max-w-[34rem] flex-1 md:block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              className="h-10 w-full rounded-md border border-input/80 bg-card/82 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
              placeholder="Cari konten, pelanggan, faktur..."
              type="search"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Badge className="hidden border-border/70 bg-card text-muted-foreground shadow-sm sm:inline-flex">
              Produksi
            </Badge>
            <Button
              className="border-border/80 bg-card/80"
              size="icon"
              type="button"
              variant="outline"
            >
              <Bell />
              <span className="sr-only">Notifikasi</span>
            </Button>
            {auth.user ? (
              <UserButton
                onManageAccount={() => undefined}
                onSignOut={() => {
                  void auth.signOut().then(() => navigate({ to: "/" }));
                }}
                user={auth.user}
              />
            ) : null}
          </div>
        </header>

        <main className="mx-auto grid w-full max-w-[1180px] gap-[21px] px-4 py-[21px] md:px-[34px] md:py-[21px]">
          <Outlet />
        </main>
      </div>

      {isMobileNavOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-foreground/35"
            onClick={() => setIsMobileNavOpen(false)}
            type="button"
          />
          <aside className="absolute inset-y-0 left-0 flex w-[17rem] max-w-[85vw] flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-xl">
            <div className="relative flex min-h-full flex-col">
              <SidebarContent onNavigate={() => setIsMobileNavOpen(false)} />
              <Button
                className="absolute right-3 top-3 text-sidebar-foreground hover:bg-sidebar-accent"
                onClick={() => setIsMobileNavOpen(false)}
                size="icon"
                type="button"
                variant="ghost"
              >
                <X />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="flex h-[4.25rem] items-center gap-3 border-b border-sidebar-border px-[21px]">
        <div className="flex size-10 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
          <Building2 className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">Zahir CMS</p>
          <p className="truncate text-xs text-sidebar-foreground/58">
            Backoffice
          </p>
        </div>
      </div>

      <nav
        className="flex-1 space-y-1 px-[13px] py-[21px]"
        aria-label="CMS modules"
      >
        {navigationItems.map((item) =>
          item.to ? (
            <Link
              activeProps={{
                className:
                  "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm",
              }}
              className={cn(
                "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-sidebar-foreground/72 transition-colors",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
              key={item.label}
              onClick={onNavigate}
              to={item.to}
            >
              <item.icon className="size-4" />
              <span>{item.label}</span>
            </Link>
          ) : (
            <button
              className="flex h-10 w-full items-center justify-between rounded-md px-3 text-left text-sm font-medium text-sidebar-foreground/64 transition-colors hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground"
              key={item.label}
              type="button"
            >
              <span className="flex items-center gap-3">
                <item.icon className="size-4" />
                <span>{item.label}</span>
              </span>
              <span className="rounded-md border border-sidebar-border bg-sidebar px-1.5 py-0.5 text-[10px] font-medium text-sidebar-foreground/54">
                Segera
              </span>
            </button>
          ),
        )}
      </nav>

      <div className="border-t border-sidebar-border p-[13px]">
        <div className="rounded-md border border-sidebar-border bg-sidebar-accent/72 p-[13px]">
          <p className="text-sm font-semibold">Ruang kerja</p>
          <p className="mt-1 text-xs leading-5 text-sidebar-foreground/62">
            Modul konten, katalog, dan pelanggan siap ditambahkan tanpa mengubah
            struktur layout.
          </p>
        </div>
      </div>
    </>
  );
}
