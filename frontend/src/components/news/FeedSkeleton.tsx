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

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(260px,1fr)]">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-[var(--radius-lg)] border border-border bg-card p-4 [box-shadow:var(--shadow-soft)]"
            >
              <SkeletonBlock className="aspect-[16/10]" />
              <SkeletonBlock className="mt-5 h-5" />
              <SkeletonBlock className="mt-3 h-5 w-4/5" />
              <SkeletonBlock className="mt-5 h-16" />
            </div>
          ))}
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
