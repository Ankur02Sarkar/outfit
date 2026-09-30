import { Link, NavLink } from "react-router";

import { SKIN } from "~/data/colors";
import { cn } from "~/lib/utils";

const NAV_ITEMS = [
  { to: "/wardrobe", label: "Wardrobe" },
  { to: "/combos", label: "Combos" },
  { to: "/builder", label: "Builder" },
  { to: "/system", label: "System" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 md:px-8">
        <Link to="/" className="flex shrink-0 items-baseline gap-3">
          <span className="font-display text-[15px] font-semibold tracking-[0.24em] uppercase">
            The Capsule
          </span>
          <span className="hidden text-[10px] tracking-[0.18em] text-muted-foreground uppercase sm:inline">
            Ankur · Quiet Luxury Study
          </span>
        </Link>

        <nav className="no-scrollbar ml-auto flex items-center gap-1 overflow-x-auto">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "relative rounded-full px-3 py-1.5 text-[11px] font-medium tracking-[0.16em] uppercase transition-colors",
                  isActive
                    ? "bg-foreground text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 border-l border-hairline pl-5 lg:flex">
          <span
            aria-hidden
            className="size-3.5 rounded-full ring-1 ring-foreground/20"
            style={{ backgroundColor: SKIN.hex }}
          />
          <div className="leading-tight">
            <p className="text-[11px] font-medium tracking-wide">Medium Brown</p>
            <p className="text-[10px] text-muted-foreground">Warm golden undertone</p>
          </div>
        </div>
      </div>
    </header>
  );
}
