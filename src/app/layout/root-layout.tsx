import { LayoutDashboard, Scale, Tags } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLinkSaverStore } from "@/store/use-link-saver-store";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/" },
  { icon: Scale, label: "Compare", to: "/compare" },
];

export function RootLayout() {
  const categoryCount = useLinkSaverStore((state) => state.categories.length);
  const compareCount = useLinkSaverStore(
    (state) => state.compareProductIds.length,
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.15),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(30,64,175,0.1),_transparent_28%),linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="sticky top-4 z-20 mb-8 rounded-2xl border border-blue-100 bg-white/95 px-5 py-4 shadow-[0_20px_50px_-35px_rgba(30,64,175,0.28)] backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-lg shadow-blue-700/25">
                <Tags className="size-6" />
              </div>
              <div>
                <Link
                  className="font-heading text-2xl font-semibold tracking-tight text-slate-950"
                  to="/"
                >
                  linkSaver
                </Link>
                <p className="mt-1 text-sm text-slate-600">
                  Save product ideas, compare offers, and keep purchase
                  decisions grounded.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Badge>{categoryCount} categories</Badge>
              <Badge className="border-blue-200 bg-blue-100 text-blue-900">
                {compareCount} selected for compare
              </Badge>
            </div>
          </div>

          <nav className="mt-4 flex flex-wrap gap-2">
            {navItems.map(({ icon: Icon, label, to }) => (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    buttonVariants({ size: "sm", variant: "ghost" }),
                    isActive
                      ? "bg-blue-100 text-blue-950"
                      : "bg-transparent text-slate-700 hover:bg-blue-50",
                  )
                }
                key={to}
                to={to}
              >
                <Icon className="size-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </header>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
