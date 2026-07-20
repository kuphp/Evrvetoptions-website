import type { CompanyStat } from "@/lib/types";
import { RevealItem, RevealStagger } from "@/components/site/reveal";

export function StatsBand({ stats }: { stats: CompanyStat[] }) {
  if (stats.length === 0) return null;

  return (
    <section className="relative border-y bg-card/60">
      <div className="container-page">
        <RevealStagger className="grid grid-cols-2 divide-border lg:grid-cols-4 lg:divide-x">
          {stats.map((stat) => (
            <RevealItem key={stat.label}>
              <div className="flex flex-col items-center gap-1.5 px-4 py-9 text-center">
                <span className="text-3xl font-extrabold tracking-tight text-gradient sm:text-4xl">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
