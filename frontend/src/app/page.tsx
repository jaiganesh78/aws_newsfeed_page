import Link from "next/link";
import { ArrowRight, Cloud, Newspaper, UsersRound } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";

export default function Home() {
  return (
    <AppShell>
      <section className="gradient-container min-h-[420px] p-6 sm:p-8 lg:p-10">
        <div className="gradient-overlay" />
        <div className="relative flex min-h-[360px] max-w-4xl flex-col justify-between">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/45 bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground backdrop-blur">
            <Cloud className="size-4" aria-hidden="true" />
            AWS SBG REC
          </div>

          <div className="space-y-6">
            <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-foreground">
              Build, learn, and stay connected with the AWS student community.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-foreground/75">
              A shared platform foundation for community updates, learning
              pathways, events, and the upcoming AWS community newsroom.
            </p>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:scale-[1.02]"
            >
              Preview news route
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-label="Platform foundations"
        className="mt-6 grid gap-4 md:grid-cols-3"
      >
        {[
          {
            title: "Community hub",
            description:
              "A single place for AWS Student Builder Groups REC updates.",
            icon: UsersRound,
          },
          {
            title: "News-ready shell",
            description:
              "Reusable layout, theme tokens, and query infrastructure are ready.",
            icon: Newspaper,
          },
          {
            title: "Cloud learning",
            description:
              "Placeholder navigation keeps events and learning paths discoverable.",
            icon: Cloud,
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="rounded-[var(--radius-lg)] border border-border bg-card p-6 [box-shadow:var(--shadow-soft)]"
            >
              <div className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-foreground text-background">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <h2 className="font-display text-xl font-semibold">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                {item.description}
              </p>
            </article>
          );
        })}
      </section>
    </AppShell>
  );
}
