import { USER } from "../data/user";

export function ProfileHeader() {
  return (
    <div className="screen-line-after border-x border-edge">
      {/* Banner. Decorative: the avatar below carries identity, and repeating a
          description of the same illustration would only add noise. */}
      <div className="relative border-b border-edge">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="h-28 w-full object-cover select-none sm:h-40"
          src={USER.cover}
          alt=""
          width={1536}
          height={480}
          aria-hidden
          fetchPriority="high"
        />

        {/* Melts the warm illustration into whichever palette is active. */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"
          aria-hidden
        />
      </div>

      <div className="flex">
        <div className="shrink-0 border-r border-edge p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="size-28 rounded-sm object-cover ring-1 ring-edge select-none sm:size-32"
            src={USER.avatar}
            alt={USER.displayName}
            width={320}
            height={320}
            fetchPriority="high"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="hatch flex-1" aria-hidden />

          <div className="border-t border-edge px-4 py-3">
            <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {USER.displayName}
            </h1>

            <p className="mt-1.5 font-mono text-[11px] font-medium tracking-[0.18em] text-accent uppercase">
              {USER.role}
            </p>
          </div>
        </div>
      </div>

      <p className="border-t border-edge px-4 py-3.5 text-sm/relaxed text-pretty text-muted-foreground">
        {USER.tagline}
      </p>
    </div>
  );
}
