import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  FileText,
  PackageCheck,
  RefreshCcw,
  Users,
} from "lucide-react";
import { Badge } from "../../components/ui/badge.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card.js";
import { cn } from "../../lib/utils.js";

export const Route = createFileRoute("/_auth/account")({
  component: AccountRoute,
});

const stats = [
  {
    icon: FileText,
    label: "Konten terbit",
    tone: "bg-primary/10 text-primary",
    trend: "+12.5%",
    value: "128",
  },
  {
    icon: Users,
    label: "Pelanggan aktif",
    tone: "bg-indigo-50 text-indigo-700",
    trend: "+8.2%",
    value: "4,286",
  },
  {
    icon: Clock3,
    label: "Menunggu tinjauan",
    tone: "bg-amber-50 text-amber-700",
    trend: "24 item",
    value: "73",
  },
] as const;

const healthChecks = [
  {
    label: "Sesi API",
    tone: "bg-primary",
    value: "Stabil",
  },
  {
    label: "Antrean konten",
    tone: "bg-amber-500",
    value: "Ditinjau",
  },
  {
    label: "Sinkron katalog",
    tone: "bg-indigo-600",
    value: "Siap",
  },
] as const;

const queueItems = [
  {
    due: "Hari ini",
    item: "Halaman utama",
    owner: "Konten",
    status: "Ditinjau",
  },
  {
    due: "Besok",
    item: "Harga paket",
    owner: "Produk",
    status: "Ditinjau",
  },
  {
    due: "Jumat",
    item: "Katalog integrasi",
    owner: "Operasional",
    status: "Draf",
  },
] as const;

const activities = [
  {
    meta: "2 menit lalu",
    title: "Banner homepage diperbarui",
    type: "Konten",
  },
  {
    meta: "12 menit lalu",
    title: "Segmentasi pelanggan tersinkron",
    type: "CRM",
  },
  {
    meta: "36 menit lalu",
    title: "Template faktur direview",
    type: "Keuangan",
  },
] as const;

function AccountRoute() {
  const { auth } = Route.useRouteContext();

  if (auth.isBooting) {
    return (
      <div className="grid min-h-[420px] place-items-center">
        <div className="rounded-md border border-border bg-card p-[21px]">
          <p className="text-sm text-muted-foreground">Memeriksa sesi</p>
          <h2 className="mt-2 text-xl font-semibold">Memuat CMS</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="grid gap-[21px] lg:grid-cols-[minmax(0,1.618fr)_minmax(320px,1fr)]">
        <Card className="border-border/80 bg-card/92">
          <CardHeader className="gap-[13px] p-[21px] md:p-[26px]">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="border-primary/15 bg-primary/10 text-primary">
                Aktif
              </Badge>
              <Badge className="border-indigo-200 bg-indigo-50 text-indigo-700">
                Ruang kerja CMS
              </Badge>
            </div>
            <div>
              <CardTitle className="max-w-2xl text-2xl leading-tight tracking-tight md:text-3xl">
                Dashboard operasi konten dan pelanggan.
              </CardTitle>
              <CardDescription className="mt-[13px] max-w-2xl leading-6">
                Pantau antrean terbit, kesehatan integrasi, dan aktivitas tim
                dari satu ruang kerja yang ringkas.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-[13px] px-[21px] pb-[21px] md:grid-cols-3 md:px-[26px] md:pb-[26px]">
            {[
              ["Antrean terbit", "8 item"],
              ["Persetujuan berjalan", "5 permintaan"],
              ["Sinkron terakhir", "Baru saja"],
            ].map(([label, value]) => (
              <div
                className="rounded-md border border-border/70 bg-background/72 p-[13px]"
                key={label}
              >
                <p className="text-xs font-medium text-muted-foreground">
                  {label}
                </p>
                <p className="mt-1 text-sm font-semibold">{value}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/86">
          <CardHeader className="flex-row items-start justify-between p-[21px]">
            <div>
              <CardTitle>Kesehatan sistem</CardTitle>
              <CardDescription className="mt-1">
                Sinyal operasional ruang kerja
              </CardDescription>
            </div>
            <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
              <PackageCheck className="size-5" />
            </div>
          </CardHeader>
          <CardContent className="grid gap-[13px] px-[21px] pb-[21px]">
            {healthChecks.map((item) => (
              <div
                className="flex items-center justify-between gap-4"
                key={item.label}
              >
                <div className="flex items-center gap-3">
                  <span className={cn("size-2 rounded-sm", item.tone)} />
                  <span className="text-sm text-muted-foreground">
                    {item.label}
                  </span>
                </div>
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            ))}
            <div className="mt-1 flex items-center gap-2 rounded-md border border-border/70 bg-background/74 px-3 py-2 text-sm text-muted-foreground">
              <RefreshCcw className="size-4" />
              Diperbarui baru saja
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-[13px] md:grid-cols-3">
        {stats.map((item) => (
          <Card className="border-border/80 bg-card/90" key={item.label}>
            <CardHeader className="flex-row items-center justify-between space-y-0 p-[21px] pb-[13px]">
              <CardDescription>{item.label}</CardDescription>
              <div
                className={cn(
                  "flex size-9 items-center justify-center rounded-md",
                  item.tone,
                )}
              >
                <item.icon className="size-4" />
              </div>
            </CardHeader>
            <CardContent className="px-[21px] pb-[21px]">
              <div className="text-3xl font-semibold">{item.value}</div>
              <div
                className={cn(
                  "mt-3 flex items-center gap-1 text-sm",
                  item.label === "Menunggu tinjauan"
                    ? "text-amber-700"
                    : "text-primary",
                )}
              >
                <ArrowUpRight className="size-4" />
                {item.trend}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-[21px] lg:grid-cols-[minmax(0,1.618fr)_minmax(320px,1fr)]">
        <Card className="border-border/80 bg-card/92">
          <CardHeader className="p-[21px] pb-[13px]">
            <CardTitle>Antrean terbit</CardTitle>
            <CardDescription>
              Item yang perlu dicek sebelum tampil ke pelanggan.
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto px-[21px] pb-[21px]">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="py-3 font-medium">Item</th>
                  <th className="py-3 font-medium">Pemilik</th>
                  <th className="py-3 font-medium">Status</th>
                  <th className="py-3 font-medium">Target</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {queueItems.map((item) => (
                  <tr key={item.item}>
                    <td className="py-4 font-medium">{item.item}</td>
                    <td className="py-4 text-muted-foreground">
                      {item.owner}
                    </td>
                    <td className="py-4">
                      <Badge
                        className={
                          item.status === "Ditinjau"
                            ? "border-amber-200 bg-amber-50 text-amber-800"
                            : "border-indigo-200 bg-indigo-50 text-indigo-700"
                        }
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="py-4 text-muted-foreground">{item.due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/86">
          <CardHeader className="p-[21px] pb-[13px]">
            <CardTitle>Aktivitas terbaru</CardTitle>
            <CardDescription>Perubahan penting di ruang kerja.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-[21px] px-[21px] pb-[21px]">
            {activities.map((activity) => (
              <div className="flex gap-3" key={activity.title}>
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <CheckCircle2 className="size-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {activity.type} / {activity.meta}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
