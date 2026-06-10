import { cn } from "@/utils/cn";

function SkeletonBlock({ className }: { className: string }) {
  return (
    <div
      className={cn(
        "skeleton-shimmer rounded-[var(--radius-lg)] bg-white/55",
        className,
      )}
    />
  );
}

export function FeedSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-4xl">
        <SkeletonBlock className="h-4 w-48" />
        <SkeletonBlock className="mt-4 h-12 w-full max-w-2xl rounded-2xl" />
        <SkeletonBlock className="mt-4 h-6 w-full max-w-xl rounded-2xl" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.85fr)_minmax(320px,1fr)]">
        <SkeletonBlock className="min-h-[460px] rounded-[var(--radius-xl)] lg:min-h-[560px]" />
        <div className="hidden grid-rows-[1fr_1.15fr] gap-4 lg:grid">
          <div className="grid grid-cols-2 gap-4">
            <SkeletonBlock className="min-h-48" />
            <SkeletonBlock className="min-h-48" />
          </div>
          <SkeletonBlock className="min-h-64" />
        </div>
      </div>

      <div className="mt-14">
        <SkeletonBlock className="h-9 w-64 rounded-2xl" />
        <SkeletonBlock className="mt-3 h-5 w-full max-w-lg rounded-2xl" />
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <SkeletonBlock className="min-h-[460px] rounded-[var(--radius-xl)]" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonBlock key={index} className="min-h-64" />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14">
        <SkeletonBlock className="h-9 w-56 rounded-2xl" />
        <div className="mt-5 flex gap-5 overflow-hidden">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonBlock key={index} className="h-48 min-w-[320px]" />
          ))}
        </div>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(280px,1fr)]">
        <div>
          <SkeletonBlock className="h-9 w-56 rounded-2xl" />
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonBlock
                key={index}
                className={
                  index % 5 === 0
                    ? "min-h-[420px] md:col-span-2 lg:col-span-2"
                    : "min-h-72"
                }
              />
            ))}
          </div>
        </div>
        <div className="hidden rounded-[var(--radius-lg)] border border-border bg-card p-5 [box-shadow:var(--shadow-soft)] lg:block">
          <SkeletonBlock className="h-6 w-40" />
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonBlock key={index} className="mt-5 h-16" />
          ))}
        </div>
      </div>
    </div>
  );
}
