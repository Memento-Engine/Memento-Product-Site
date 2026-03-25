"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Code2,
  Database,
  FileSearch,
  GitBranch,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";

const leftTools = [
  { icon: FileSearch, label: "Read files" },
  { icon: Code2, label: "Parse AST" },
  { icon: GitBranch, label: "Trace deps" },
];

const rightTools = [
  { icon: Search, label: "Search memory" },
  { icon: Database, label: "Query index" },
  { icon: Brain, label: "Synthesize" },
];

export function AgentParallelThumbnail({ compact = false }: { compact?: boolean }) {
  const height = compact ? "h-44" : "h-60 sm:h-72";

  return (
    <div
      className={`relative w-full ${height} overflow-hidden rounded-2xl bg-card/80 border border-border/60`}
    >
      {/* Aurora gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,255,163,0.07)] via-[rgba(0,184,255,0.03)] to-[rgba(122,0,255,0.09)]" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Corner glow accents */}
      <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl" />
      <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />

      {/* Top badge */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1">
        <Sparkles className="h-2.5 w-2.5 text-primary" />
        <span className="text-[9px] font-semibold uppercase tracking-widest text-primary">
          Agent Architecture
        </span>
      </div>

      {/* Main panels */}
      <div className="absolute inset-x-4 top-10 bottom-9 flex items-stretch gap-2">
        {/* ─── Left panel: Coding Agent ─── */}
        <div className="flex flex-1 flex-col rounded-xl border border-cyan-400/20 bg-background/40 p-2.5">
          <div className="mb-2 flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(0,184,255,0.8)]" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-cyan-400">
              Coding Agent
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-around gap-1">
            {leftTools.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                className="flex items-center gap-1.5 rounded-md bg-muted/30 px-1.5 py-1"
                animate={{ opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 2.4, delay: i * 0.5, repeat: Infinity }}
              >
                <Icon className="h-2.5 w-2.5 shrink-0 text-cyan-400/80" />
                <span className="text-[9px] text-muted-foreground/80">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Center: Animated bridge ─── */}
        <div className="flex w-10 shrink-0 flex-col items-center justify-center gap-2">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-primary/30 bg-primary/10"
          >
            <Zap className="h-3 w-3 text-primary" />
          </motion.div>

          {/* Flowing arrows */}
          <div className="flex flex-col items-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-[2px] w-7 rounded-full"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,184,255,0.5), rgba(0,255,163,0.7))",
                }}
                animate={{ scaleX: [0.4, 1, 0.4], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.6, delay: i * 0.28, repeat: Infinity }}
              />
            ))}
          </div>

          <span className="mt-0.5 text-center text-[8px] leading-tight text-muted-foreground/45">
            same
            <br />
            loop
          </span>
        </div>

        {/* ─── Right panel: Memento Agent ─── */}
        <div className="flex flex-1 flex-col rounded-xl border border-primary/20 bg-background/40 p-2.5">
          <div className="mb-2 flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(0,255,163,0.8)]" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-primary">
              Memento
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-around gap-1">
            {rightTools.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                className="flex items-center gap-1.5 rounded-md bg-muted/30 px-1.5 py-1"
                animate={{ opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 2.4, delay: i * 0.5 + 0.25, repeat: Infinity }}
              >
                <Icon className="h-2.5 w-2.5 shrink-0 text-primary/80" />
                <span className="text-[9px] text-muted-foreground/80">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom tagline */}
      <div className="absolute bottom-2.5 left-0 right-0 text-center">
        <span className="text-[9px] text-muted-foreground/45">Different memory. </span>
        <span className="text-[9px] font-semibold text-primary/65">Same architecture.</span>
      </div>
    </div>
  );
}
