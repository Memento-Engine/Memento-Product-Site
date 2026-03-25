import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GithubLogo } from "@/components/ui/GithubLogo";
import { AgentParallelThumbnail } from "@/components/blog/AgentParallelThumbnail";

const SOURCE_CODE_URL = "https://github.com/Memento-Engine/Memento";

const posts: Record<
  string,
  {
    title: string;
    subtitle: string;
    tag: string;
    date: string;
    readTime: string;
  }
> = {
  "what-coding-agents-taught-me-about-memento": {
    title: "My Copilot Aha Moment — And What It Taught Me About Memento",
    subtitle:
      "Watching Copilot navigate an unknown codebase live, I realised Memento's agent is doing the exact same thing — just through your memories.",
    tag: "Architecture",
    date: "March 25, 2026",
    readTime: "6 min read",
  },
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  return {
    title: `${post.title} | Memento AI Blog`,
    description: post.subtitle,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-bg absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,163,0.07),transparent_45%)]" />
      </div>

      <article className="mx-auto w-full max-w-3xl px-4 pb-24 pt-10 sm:px-6 sm:pb-32 sm:pt-14">
        {/* Nav */}
        <div className="flex items-center justify-between gap-4">
          <Button
            asChild
            variant="ghost"
            className="gap-2 rounded-full px-0 hover:bg-transparent"
          >
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4" />
              All posts
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full border-border/60 bg-background/50 text-xs"
          >
            <a href={SOURCE_CODE_URL} target="_blank" rel="noreferrer">
              <GithubLogo className="h-3.5 w-3.5" />
              Repository
            </a>
          </Button>
        </div>

        {/* Header */}
        <div className="mt-10 sm:mt-14">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
              {post.tag}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground/60">
              <Calendar className="h-3 w-3" />
              {post.date}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground/60">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {post.subtitle}
          </p>
        </div>

        {/* Thumbnail */}
        <div className="mt-8 sm:mt-10">
          <AgentParallelThumbnail />
        </div>

        {/* Article body */}
        <div className="mt-10 sm:mt-14">
          <BlogBody />
        </div>

        {/* Footer CTA */}
        <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Open Source
          </p>
          <h3 className="mt-2 text-xl font-bold tracking-tight">
            Have thoughts on agent design?
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Memento is public and open for contributions. If you've worked on
            similar retrieval or agent systems and have ideas, open an issue or
            reach out directly.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild size="sm" className="rounded-full">
              <a href={SOURCE_CODE_URL} target="_blank" rel="noreferrer">
                <GithubLogo className="h-4 w-4" />
                View on GitHub
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full border-border/60 bg-background/50"
            >
              <a
                href={`${SOURCE_CODE_URL}/issues`}
                target="_blank"
                rel="noreferrer"
              >
                Open an issue
              </a>
            </Button>
          </div>
        </div>
      </article>
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Article content                                                            */
/* ─────────────────────────────────────────────────────────────────────────── */

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={`mt-10 sm:mt-12 ${className}`}>{children}</section>;
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-8 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-[15px] leading-[1.8] text-muted-foreground sm:text-base">
      {children}
    </p>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-xl border-l-2 border-primary/50 bg-primary/5 py-4 pl-5 pr-4">
      <p className="text-[14px] leading-relaxed text-foreground/90 sm:text-[15px]">
        {children}
      </p>
    </div>
  );
}

function InsightCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/50 p-4 sm:p-5">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
        {children}
      </p>
    </div>
  );
}

function BlogBody() {
  return (
    <div>
      {/* ── Introduction ── */}
      <P>
        It happened while I was using GitHub Copilot inside VS Code. I had
        opened a codebase I'd never touched before — a side project someone
        shared with me — and I asked Copilot to explain what a particular
        function did. Nothing unusual.
      </P>
      <P>
        But instead of just summarising, Copilot started{" "}
        <em className="text-foreground">working</em>. It read the file. Traced
        an import. Pulled up a type definition. Checked a config. And then it
        answered — with full context, citing the exact lines. I hadn't told it
        where to look. It just knew.
      </P>
      <Callout>
        That was the aha moment.{" "}
        <strong className="font-semibold text-foreground">
          Copilot wasn't magic — it was methodical.
        </strong>{" "}
        It used tools, gathered evidence, and reasoned its way to an answer.
        And I suddenly saw Memento in a completely new light.
      </Callout>

      {/* ── Section 1 ── */}
      <Section>
        <H2>The pattern underneath the magic</H2>
        <P>
          After that Copilot session I wanted to understand the mechanics
          properly — not just observe the output. The challenge: Copilot itself
          isn't open source. So I went looking for something that was.
        </P>
        <P>
          That led me to{" "}
          <strong className="font-semibold text-foreground">OpenCode</strong> — an
          open-source AI coding agent with a cleanly readable implementation.
          Because the code is public, I could actually trace exactly how the
          agent loop worked, not just guess from the outside. The loop is
          straightforward but remarkably effective:
        </P>
        <ol className="mt-4 space-y-2 pl-4">
          {[
            ["Understand the query", "What does the user actually want?"],
            [
              "Select a tool",
              "Read a file? Search a symbol? Run a test? Pick the best next signal.",
            ],
            ["Execute and observe", "Run the tool, receive the result."],
            [
              "Update the mental model",
              "What does this tell me? What's the next gap?",
            ],
            [
              "Repeat or answer",
              "Keep going until there's enough evidence to respond confidently.",
            ],
          ].map(([step, desc], i) => (
            <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-muted-foreground">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
                {i + 1}
              </span>
              <span>
                <span className="font-medium text-foreground">{step}</span> —{" "}
                {desc}
              </span>
            </li>
          ))}
        </ol>
        <P>
          The agent doesn't know the codebase in advance. It earns its
          understanding, tool call by tool call.
        </P>
      </Section>

      {/* ── Section 2 ── */}
      <Section>
        <H2>How this connects to Memento</H2>
        <P>
          Reading through OpenCode's source, one session stuck with me. The
          agent was asked to find why a function was broken in an unfamiliar
          repo. It searched, found three candidates, read the most relevant one,
          traced a dependency, surfaced the bug. Five tool calls. Zero prior
          knowledge.
        </P>
        <P>
          I closed the file and thought about a typical Memento session for the
          first time through this lens.
        </P>
        <Callout>
          A user asks:{" "}
          <em>"What was that article about Rust error handling I read last month?"</em>
          <br />
          <br />
          Memento needs to run a semantic search on memory entries, filter by
          approximate timeframe, score and re-rank candidates, pull the most
          relevant text snippets, and synthesize an answer.
        </Callout>
        <P>
          Same loop. Different memory. A coding agent's memory is the codebase —
          files, symbols, tests, configs. Memento's memory is{" "}
          <em className="text-foreground">your</em> past — screenshots, OCR text,
          timestamps, window titles, URLs. Change the tools, change the data, and
          the underlying architecture is identical.
        </P>
      </Section>

      {/* ── Section 3 ── */}
      <Section>
        <H2>What I learned reading OpenCode's source</H2>
        <P>
          The reason I went to OpenCode specifically was simple: it's open
          source. The whole agent loop — tool dispatch, context assembly,
          result trimming, LLM formatting — is right there to read. I spent
          several evenings going through it, and four things stood out clearly.
        </P>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <InsightCard title="Tool definitions are explicit contracts">
            Each tool has a precise schema — inputs, outputs, expected side
            effects. The agent never guesses what a tool does. This keeps the
            loop predictable and debuggable.
          </InsightCard>
          <InsightCard title="Context management is aggressive">
            Tool results are trimmed, ranked, and sometimes summarized before
            going back into context. Token budgets are a first-class concern, not
            an afterthought.
          </InsightCard>
          <InsightCard title="The agent loop is intentionally shallow">
            Surprisingly few abstractions. The core loop is tight and explicit:
            call tools → collect results → format context → call LLM → parse →
            repeat. No magic orchestration. Just disciplined structure.
          </InsightCard>
          <InsightCard title="Evidence is always traceable">
            Every claim the agent makes points back to something it actually read.
            The provenance chain is maintained throughout. No hallucination
            tolerated.
          </InsightCard>
        </div>
      </Section>

      {/* ── Section 4 ── */}
      <Section>
        <H2>What transferred to Memento</H2>
        <P>
          Studying OpenCode changed how I think about Memento's retrieval
          architecture. Several patterns transferred almost directly.
        </P>

        <div className="mt-5 space-y-4">
          {[
            {
              label: "Parallel retrieval, not sequential",
              body: "Don't run searches one at a time. Run multiple targeted queries simultaneously — by time window, by app context, by semantic meaning — then merge and rank. This is how coding agents fan out exploratory tool calls before converging on an answer.",
            },
            {
              label: "Evidence anchoring over fluency",
              body: "Memento should resist the urge to give fluent answers at the cost of accuracy. Every answer should be traceable back to a specific memory entry. If it can't be sourced, it shouldn't be said.",
            },
            {
              label: "Context curation is the real work",
              body: "The LLM doesn't see everything. Memento must make sharp decisions about which memory snippets are actually useful for a given query. Studying how coding agents trim and prioritize tool results gave a lot to work with here.",
            },
            {
              label: "Short tight loops beat long planning chains",
              body: "Trying to plan out a full retrieval strategy upfront leads to brittle behavior. Better to run one retrieval step, observe the results, and decide the next step dynamically — exactly like a coding agent navigating an unknown file system.",
            },
          ].map(({ label, body }) => (
            <div
              key={label}
              className="flex gap-3 rounded-xl border border-border/50 bg-card/40 p-4"
            >
              <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
              <div>
                <p className="text-[13px] font-semibold text-foreground">{label}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Section 5 ── */}
      <Section>
        <H2>Memento’s actual architecture</H2>
        <P>
          After that deep-dive into OpenCode I came back to Memento with fresh
          eyes and was honestly surprised by how much of this pattern was already
          there. Let me walk through what the agent actually does.
        </P>

        {/* Node pipeline */}
        <div className="mt-6 space-y-3">
          {[
            {
              num: "①",
              name: "Chat Context Manager",
              detail:
                "Runs on every request first. Applies a sliding-window summarization to keep the full chat history under 1 500 tokens — older turns are compressed by a FREE-tier LLM, the two most recent pairs are kept verbatim. Downstream nodes never see unbounded history.",
            },
            {
              num: "②",
              name: "Classifier & Router",
              detail:
                "Single FREE-tier LLM call that rewrites the query (resolves pronouns like \u201cit\u201d and relative times like \u201clast week\u201d to ISO timestamps), then routes: chat-only, search, or mixed. If the query is too vague it emits a clarification question and stops.",
            },
            {
              num: "③",
              name: "Planner Node",
              detail:
                "For complex queries a PREMIUM-tier LLM produces a validated intent DAG — each step has a goal, a skill hint, and declared dependencies. Cycles are detected and rejected; the planner retries up to twice on validation failure.",
            },
            {
              num: "④",
              name: "Scheduler",
              detail:
                "Pure code, no LLM. Topological-sorts the DAG into execution levels. Steps with no shared dependency land in the same level and run in parallel (max concurrency 3).",
            },
            {
              num: "⑤",
              name: "Executor + ReAct Loop",
              detail:
                "Each step runs its own ReAct loop: Think → Act (tool call) → Observe → repeat. Tools include SQL against local SQLite, semantic vector search, hybrid FTS+vector search, web search, and readMore to fetch full chunk text only when needed (preview-first to protect the context window). Global caps: 12 LLM calls, 30 s wall-clock.",
            },
            {
              num: "⑥",
              name: "Final Answer Node",
              detail:
                "Collects all StepResult objects, fetches full evidence text, and streams a cited answer via SSE. Memory citations use [[chunk_N]], web citations use [[web_N]]. Suggested follow-up questions are parsed from the response and sent to the frontend alongside resolved source metadata.",
            },
          ].map(({ num, name, detail }) => (
            <div
              key={name}
              className="flex gap-3 rounded-xl border border-border/50 bg-card/40 p-4"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
                {num}
              </span>
              <div>
                <p className="text-[13px] font-semibold text-foreground">{name}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                  {detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        <P>
          The data layer underneath is a local SQLite database with FTS5 for
          keyword search and 384-dim vector embeddings for semantic search — both
          served by a Rust daemon running on-device. Nothing leaves the machine
          unless the user triggers a web search.
        </P>
      </Section>

      {/* ── Needs better section ── */}
      <Section>
        <H2>What needs to get better</H2>
        <P>
          The architecture is solid but there are places where it needs to grow.
          This is where I’d genuinely love input from people who’ve built
          similar systems.
        </P>
        <div className="mt-5 space-y-3">
          {[
            {
              area: "Temporal reasoning at query time",
              detail:
                'The classifier rewrites relative times to ISO, but deeper queries like \u201cwhat was I researching the week before that meeting\u201d need the agent to reason across time spans, not just convert a timestamp. How should this layer work?',
            },
            {
              area: "Inter-step memory in multi-turn conversations",
              detail:
                'The chat context manager handles summarization well for back-and-forth chat, but follow-ups that reference earlier\u00a0search results within the same session \u2014 \u201cwhat about the other thing you found\u201d \u2014 are still fragile. Better session-level state management would help.',
            },
            {
              area: "Smarter evidence ranking before the final node",
              detail:
                'Each ReAct step does preview-first retrieval which protects the context window. But the final node currently uses all collected evidence without re-ranking across steps. A cross-step relevance pass before synthesis could sharpen answers significantly.',
            },
          ].map(({ area, detail }) => (
            <div
              key={area}
              className="rounded-xl border border-primary/15 bg-primary/5 p-4"
            >
              <p className="text-[13px] font-semibold text-foreground">{area}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                {detail}
              </p>
            </div>
          ))}
        </div>
        <P>
          If any of these map to problems you’ve solved — in a different product,
          a research project, or another open-source agent — I’d love to hear how
          you approached it. Open an issue or reach out directly.
        </P>
      </Section>

      {/* ── Closing ── */}
      <Section>
        <H2>Closing thought</H2>
        <P>
          The aha moment with Copilot didn’t just change how I think about coding
          agents — it changed how I think about Memento. OpenCode gave me
          a foundation and pointed my thinking in the right direction. Memento
          still needs better architectural design and sharper engineering
          practices — and that's exactly what I'm working toward.
        </P>
        <P>
          If you’ve built retrieval systems, agent pipelines, or anything in this
          neighbourhood and have thoughts on the open questions above,{" "}
          <strong className="font-medium text-foreground">
            suggestions are very welcome.
          </strong>{" "}
          Open an issue, drop a comment, or just tell me where you’d take it
          next.
        </P>
      </Section>
    </div>
  );
}
