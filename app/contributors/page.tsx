import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, GitBranch, MessageSquare, Shield, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GithubLogo } from "@/components/ui/GithubLogo";

const SOURCE_CODE_URL = "https://github.com/Memento-Engine/Memento";
const ISSUES_URL = "https://github.com/Memento-Engine/Memento/issues";

export const metadata: Metadata = {
  title: "Contributors | Memento AI",
  description:
    "Learn how to contribute to Memento, review the public repository, and help improve the open-source memory search engine.",
};

const contributionAreas = [
  {
    title: "Code and fixes",
    description:
      "Improve the desktop app, performance, reliability, and the product site.",
    icon: GitBranch,
  },
  {
    title: "Issues and feedback",
    description:
      "Report bugs, propose product ideas, and help identify edge cases early.",
    icon: MessageSquare,
  },
  {
    title: "Privacy review",
    description:
      "Audit local-first behavior and verify how data flows through the product.",
    icon: Shield,
  },
];

const principles = [
  "Keep trust measurable: prefer changes that make behavior easier to inspect and verify.",
  "Preserve the local-first model: avoid expanding data sharing without a strong product reason.",
  "Favor small, reviewable pull requests over broad, difficult-to-verify rewrites.",
  "Document user-visible changes clearly so the product stays understandable.",
];

export default function ContributorsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-bg absolute inset-0 opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_30%)]" />
      </div>

      <section className="mx-auto flex w-full max-w-6xl flex-col px-4 pb-20 pt-10 sm:px-6 sm:pb-28 sm:pt-14">
        <div className="flex items-center justify-between gap-4">
          <Button asChild variant="ghost" className="rounded-full px-0 hover:bg-transparent">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </Button>

          <Button asChild variant="outline" className="rounded-full border-border/70 bg-background/60">
            <a href={SOURCE_CODE_URL} target="_blank" rel="noreferrer">
              <GithubLogo className="h-4 w-4" />
              Repository
            </a>
          </Button>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-sm font-medium text-primary">Contributors</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
              Memento is open source by design.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              The project is public because trust matters. If people are going to
              rely on Memento for memory, search, and AI answers, they should be
              able to inspect the implementation and improve it in the open.
              This is still an early open-source project, and that means there
              are bugs, rough edges, missing documentation, and a lot of room
              for improvement.
            </p>

            <div className="mt-8 max-w-2xl rounded-[1.75rem] border border-border/60 bg-card/60 p-5 text-sm leading-relaxed text-muted-foreground backdrop-blur-sm sm:p-6 sm:text-base">
              One person is actively building Memento right now. That is exactly
              why transparency matters here: the project is early, the scope is
              ambitious, and there is still a lot to improve. Contributions,
              architecture decisions, better approaches, fixes, feedback,
              documentation help, and careful review are all highly
              appreciated.
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="rounded-full px-6">
                <a href={SOURCE_CODE_URL} target="_blank" rel="noreferrer">
                  <GithubLogo className="h-5 w-5" />
                  View source code
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-border/70 bg-background/60 px-6">
                <a href={ISSUES_URL} target="_blank" rel="noreferrer">
                  <MessageSquare className="h-5 w-5" />
                  Open issues
                </a>
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-border/60 bg-card/60 p-6 backdrop-blur-sm sm:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary">
              <Sparkles className="h-7 w-7" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight">
              Where contributors can help
            </h2>
            <div className="mt-6 space-y-4">
              {contributionAreas.map((area) => {
                const Icon = area.icon;

                return (
                  <div
                    key={area.title}
                    className="rounded-2xl border border-border/60 bg-background/70 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {area.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {area.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <section className="mt-16 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-border/60 bg-card/50 p-6 backdrop-blur-sm sm:p-8">
            <p className="text-sm font-medium text-primary">How to contribute</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">
              Start with the repo, then pick a small, concrete improvement.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Small contributions are valuable here. Fixing a bug, improving a
              rough interaction, clarifying documentation, proposing a better
              architecture decision, or reviewing behavior for trust and privacy
              all move the project forward.
            </p>
            <ol className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <li>1. Read the public repository and open issues to understand current priorities.</li>
              <li>2. Choose a focused problem: bug fix, UX improvement, documentation, or privacy review.</li>
              <li>3. Open an issue or pull request with a narrow, reviewable scope.</li>
              <li>4. Explain the user impact and any trust, privacy, or performance tradeoffs clearly.</li>
            </ol>
          </div>

          <div className="rounded-[2rem] border border-border/60 bg-gradient-to-br from-primary/10 via-background to-foreground/5 p-6 sm:p-8">
            <p className="text-sm font-medium text-primary">Contribution principles</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">
              Changes should strengthen confidence, not just add features.
            </h2>
            <div className="mt-6 space-y-3">
              {principles.map((principle) => (
                <div
                  key={principle}
                  className="rounded-2xl border border-border/60 bg-background/75 px-4 py-3 text-sm leading-relaxed text-muted-foreground sm:text-base"
                >
                  {principle}
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}