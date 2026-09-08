import { USER } from "@/features/profile/data/user";

export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-clip">
      <div className="mx-auto max-w-3xl border-x border-edge">
        <div className="hatch h-10 border-b border-edge" aria-hidden />

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-4">
          <p className="font-mono text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {USER.displayName}
          </p>

          <p className="font-mono text-xs text-muted-foreground">
            {USER.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
