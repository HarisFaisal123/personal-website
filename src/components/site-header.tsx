import { MAIN_NAV } from "@/config/site";
import { USER } from "@/features/profile/data/user";

import { MobileNav } from "./mobile-nav";
import { ThemeSwitch } from "./theme-switch";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 max-w-screen overflow-x-clip bg-background/85 backdrop-blur-sm">
      <div className="screen-line-after mx-auto flex h-14 max-w-3xl items-center gap-2 border-x border-edge px-2 sm:px-3">
        <a
          href="#top"
          className="flex items-center gap-2.5 rounded-sm"
          aria-label={`${USER.displayName} — back to top`}
        >
          <span
            className="flex size-7 items-center justify-center rounded-sm bg-foreground font-mono text-[11px] font-semibold text-background select-none"
            aria-hidden
          >
            {USER.initials}
          </span>
          <span className="text-sm font-semibold tracking-tight max-sm:sr-only">
            {USER.displayName}
          </span>
        </a>

        <div className="flex-1" />

        <nav aria-label="Sections" className="max-sm:hidden">
          <ul className="flex items-center gap-1">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : undefined)}
                  className="rounded-sm px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <span className="mx-1 h-4 w-px bg-edge sm:hidden" aria-hidden />

        <ThemeSwitch />
        <MobileNav className="sm:hidden" items={MAIN_NAV} />
      </div>
    </header>
  );
}
