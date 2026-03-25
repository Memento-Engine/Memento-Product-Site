import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AgentParallelThumbnail } from "@/components/blog/AgentParallelThumbnail";

export const metadata: Metadata = {
  title: "Blog | Memento AI",
  description:
    "Thoughts on memory, AI agents, and building Memento — a local-first personal search engine.",
};

const posts = [
  {
    slug: "what-coding-agents-taught-me-about-memento",
    tag: "Architecture",
    title: "What AI Coding Agents Taught Me About Building Memento",
    excerpt:
      "AI coding agents navigate unknown codebases with tools and evidence. Memento does the same—but through your memory. I dug into OpenCode's architecture and found a design pattern that changed how I think about the project.",
    date: "March 25, 2026",
    readTime: "7 min read",
    thumbnail: "agent-parallel",
  },
];

export default function BlogPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-bg absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,255,163,0.06),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(122,0,255,0.06),transparent_40%)]" />
      </div>

      <section className="mx-auto flex w-full max-w-5xl flex-col px-4 pb-20 pt-10 sm:px-6 sm:pb-28 sm:pt-14">
        {/* Nav row */}
        <div className="flex items-center justify-between gap-4">
          <Button
            asChild
            variant="ghost"
            className="gap-2 rounded-full px-0 hover:bg-transparent"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </Button>
        </div>

        {/* Page header */}
        <div className="mt-12 sm:mt-16">
          <p className="text-sm font-medium text-primary">Blog</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Ideas & Progress
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Notes on memory, AI agents, and what we're learning while building
            Memento.
          </p>
        </div>

        {/* Posts */}
        <div className="mt-12 grid gap-6 sm:mt-16">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border border-border/60 bg-card/50 p-0 transition-all duration-300 hover:border-primary/30 hover:bg-card/80 hover:shadow-[0_0_30px_rgba(0,255,163,0.06)]"
            >
              <div className="overflow-hidden rounded-t-2xl">
                <AgentParallelThumbnail compact />
              </div>

              <div className="p-5 sm:p-6">
                {/* Tag + meta row */}
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

                {/* Title */}
                <h2 className="mt-3 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {post.excerpt}
                </p>

                {/* Read more */}
                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary/80 transition-colors group-hover:text-primary">
                  Read post
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
