import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { boardPlans, destinationCards, heroStats, highlights, navigationLinks, processSteps } from "@/constants/booking";



export default function Home() {
  return (
    <main className="flex-1 bg-background text-foreground transition-colors duration-300">
      <header className="animate-fade-in mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="BookWiz home">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
            <ShieldCheck className="h-5 w-5 text-secondary" />
          </span>
          <span className="text-lg font-semibold tracking-tight">Hotel Booking</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navigationLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Link
          href="/booking/citizenship"
          className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90"
        >
          Start planning
        </Link>
      </header>

      <section className="animate-fade-up mx-auto grid w-full max-w-6xl grid-cols-1 gap-14 px-6 pb-20 pt-8 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:pt-16">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-secondary shadow-sm">
            Simple hotel booking, step by step
          </p>

          <h1 className="mt-6 font-serif text-5xl leading-[1.02] tracking-tight text-foreground md:text-6xl">
            Plan a stay that feels
            <span className="block text-primary">clear from the first click.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            BookWiz turns a hotel trip into a guided flow. Choose a destination,
            lock in your dates, select a board type, and review the total with no
            hidden math.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/booking/citizenship"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_12px_30px_-14px_rgba(15,61,62,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Begin booking
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40"
            >
              See the flow
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-card px-4 py-4 shadow-sm backdrop-blur transition-colors duration-300"
              >
                <div className="text-2xl font-semibold tracking-tight text-foreground">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-primary/15 blur-3xl" />

          <article className="animate-scale-in overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-[0_30px_60px_-28px_rgba(15,23,42,0.28)]">
            <header className="flex items-center justify-between bg-primary px-6 py-4 text-primary-foreground">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground/70">
                  Booking summary
                </p>
                <p className="mt-1 font-serif text-xl italic tracking-tight">
                  Live preview
                </p>
              </div>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-secondary-foreground">
                FB
              </span>
            </header>

            <div className="px-6 py-6">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                    Destination
                  </p>
                  <p className="mt-1 font-serif text-3xl tracking-tight text-foreground">Istanbul</p>
                </div>
                <div className="flex-1 px-3 pt-4">
                  <div className="h-px border-t-2 border-dashed border-border" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                    Dates
                  </p>
                  <p className="mt-1 font-medium text-foreground">Sep 12 · 5 nights</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                    Hotel
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">Hilton</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                    Board
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">Full Board</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                    Total
                  </p>
                  <p className="mt-1 text-sm font-semibold text-secondary">$865</p>
                </div>
              </div>
            </div>

            <div className="relative flex items-center py-2">
              <span className="absolute -left-3 h-6 w-6 rounded-full bg-background" />
              <div className="h-px w-full border-t-2 border-dashed border-border" />
              <span className="absolute -right-3 h-6 w-6 rounded-full bg-background" />
            </div>

            <div className="flex items-end justify-between px-6 pb-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                  Daily price
                </p>
                <p className="mt-1 font-serif text-4xl tracking-tight text-foreground">
                  $173
                </p>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 12 }).map((_, index) => (
                  <span
                    key={index}
                    className="h-8 w-[3px] rounded-full bg-primary"
                    style={{ opacity: index % 3 === 0 ? 1 : 0.3 }}
                  />
                ))}
              </div>
            </div>
          </article>
        </aside>
      </section>

      <section id="how-it-works" className="animate-fade-up mx-auto w-full max-w-6xl px-6 py-20 md:px-10">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-secondary">
            The route
          </p>
          <h2 className="mt-3 font-serif text-4xl tracking-tight text-foreground md:text-5xl">
            Three steps to a complete booking
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {processSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <Card key={step.title} className="rounded-3xl border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-semibold text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="highlights" className="animate-fade-up mx-auto w-full max-w-6xl px-6 py-20 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-secondary">
              Highlights
            </p>
            <h2 className="mt-3 font-serif text-4xl tracking-tight text-foreground md:text-5xl">
              Built for clear booking decisions
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              The homepage now mirrors the booking experience itself: structured,
              direct, and focused on the data a traveler needs before they start.
            </p>
          </div>

          <div className="rounded-[2rem] border border-border bg-card p-7 shadow-sm">
            <ul className="space-y-4">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                  <span className="text-sm leading-relaxed text-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="destinations" className="animate-fade-up mx-auto w-full max-w-6xl px-6 py-20 md:px-10">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-secondary">
            Destinations
          </p>
          <h2 className="mt-3 font-serif text-4xl tracking-tight text-foreground md:text-5xl">
            A focused set of places to start from
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {destinationCards.map((destination) => (
            <article
              key={destination.country}
              className="rounded-[1.75rem] border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl tracking-tight text-foreground">
                    {destination.country}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {destination.hotels} hotel{destination.hotels > 1 ? "s" : ""} available
                  </p>
                </div>
                <div className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground">
                  From ${destination.from}
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {destination.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="animate-fade-up mx-auto w-full max-w-6xl px-6 pb-20 md:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          {boardPlans.map((plan) => (
            <article
              key={plan.code}
              className="rounded-[1.75rem] border border-border bg-card p-7 shadow-sm transition-colors duration-300"
            >
              <div className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] ${plan.tone}`}>
                {plan.code}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{plan.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {plan.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="animate-fade-up mx-auto w-full max-w-6xl px-6 pb-20 md:px-10">
        <div className="flex flex-col gap-8 rounded-[2rem] bg-primary px-8 py-12 text-primary-foreground md:flex-row md:items-center md:justify-between md:px-14">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground/70">
              Ready to start
            </p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight md:text-4xl">
              Build the booking in the same order the app asks for it.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">
              The landing page now reflects the product flow, so the first click
              already feels like part of the booking.
            </p>
          </div>

          <Link
            href="/booking/citizenship"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-8 py-4 text-sm font-semibold text-secondary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary/90"
          >
            Start booking now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 pb-10 text-xs text-muted-foreground md:flex-row md:px-10">
        <span>Simple hotel booking experience.</span>
        <div className="flex gap-6">
          <a href="#how-it-works" className="transition hover:text-foreground">
            How it works
          </a>
          <a href="#destinations" className="transition hover:text-foreground">
            Destinations
          </a>
          <a href="/booking/citizenship" className="transition hover:text-foreground">
            Start booking
          </a>
        </div>
      </footer>
    </main>
  );
}
