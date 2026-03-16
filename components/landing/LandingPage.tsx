"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ChevronDown,
  EyeOff,
  HardDrive,
  Lock,
  MessageCircle,
  Shield,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import {
  faqs,
  featureCards,
  highlights,
  howItWorksSteps,
  problemItems,
  useCases,
} from "@/components/landing/content";
import {
  fadeInUp,
  scaleIn,
  slideInLeft,
  slideInRight,
  staggerContainer,
} from "@/components/landing/motion";
import { UseCaseCard } from "@/components/landing/UseCaseCard";
import {
  AskVisual,
  CaptureVisual,
  MaskVisual,
} from "@/components/landing/visuals";

function WindowsLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M2 3.9 10.5 2.7v8.1H2V3.9Zm9.8-1.3L22 1v9.8h-10.2V2.6ZM2 12.2h8.5v8.1L2 19.1v-6.9Zm9.8 0H22V23l-10.2-1.4v-9.4Z" />
    </svg>
  );
}

export function WaveDotGrid() {
  const [grid, setGrid] = useState({ rows: 0, cols: 0 });

  useEffect(() => {
    const updateGrid = () => {
      // 40px spacing creates a dense, premium-looking grid
      const spacing = 40;
      setGrid({
        cols: Math.ceil(window.innerWidth / spacing) + 1,
        rows: Math.ceil(window.innerHeight / spacing) + 1,
      });
    };

    updateGrid();
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, []);

  if (grid.rows === 0) return null;

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>
            {`
              @keyframes wave-pulse {
                0%, 100% {
                  transform: translateY(0) scale(1);
                  opacity: 0.1;
                }
                50% {
                  transform: translateY(-6px) scale(1.8);
                  opacity: 0.5;
                }
              }
              .wave-dot {
                animation: wave-pulse 4s ease-in-out infinite;
                transform-origin: center;
              }
            `}
          </style>
        </defs>

        {Array.from({ length: grid.rows }).map((_, row) =>
          Array.from({ length: grid.cols }).map((_, col) => {
            // This math creates a diagonal wave across the screen
            const delay = row * 0.1 + col * 0.08;

            return (
              <circle
                key={`${row}-${col}`}
                cx={col * 40}
                cy={row * 40}
                r={1.5}
                // Uses your Tailwind foreground color so it adapts to dark/light mode
                className="wave-dot fill-foreground/50"
                style={{ animationDelay: `-${delay}s` }} // Negative delay so it starts mid-animation on load
              />
            );
          }),
        )}
      </svg>
    </div>
  );
}
export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="relative min-h-screen overflow-x-hidden text-foreground">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="aurora-bg absolute inset-0" />
        <div className="aurora-glow absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_42%)]" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "fixed border-b border-white/10 bg-background/20 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl"
            : "absolute border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:h-16 sm:px-6 sm:py-0">
          <div className="flex items-center gap-2.5">
            <div className="relative h-7 w-7">
              <Image
                src="/logo.svg"
                alt="Memento"
                fill
                sizes="w-8 h-8"
                className="object-contain w-8 h-8 dark:invert"
              />
            </div>
            <span className="text-lg font-medium tracking-tight sm:text-xl">
              memento
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="sm"
                className="cursor-pointer rounded-full px-3 text-xs sm:px-5 sm:text-sm"
              >
                <WindowsLogo className="h-4 w-4" />
                Download now
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <main>
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative mx-auto flex min-h-[88vh] w-full max-w-7xl flex-col items-center justify-center overflow-hidden px-4 py-16 text-center sm:min-h-[95vh] sm:px-6 sm:py-20"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="dot-grid absolute inset-x-0 top-0 h-[70%] opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
            <motion.div
              className="absolute left-1/2 top-1/4 h-52 w-52 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl sm:h-72 sm:w-72"
              animate={{ opacity: [0.3, 0.55, 0.3], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="relative z-10 w-full"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mx-auto max-w-4xl text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Where memories
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-2 block gradient-text pb-2"
              >
                become knowledge
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-xl"
            >
              Memento remembers what you see, keeps your chats and full memory
              history local, and uses AI to answer your queries. When needed,
              only the relevant context is sent to cloud LLMs for better
              answers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex w-full flex-col gap-4 sm:mt-12 sm:w-auto sm:flex-row sm:justify-center"
            >
              <div className="flex flex-col gap-2 sm:min-w-[250px]">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    className="w-full cursor-pointer rounded-full px-6 py-6 text-sm sm:px-10 sm:text-base"
                  >
                    <WindowsLogo className="h-5 w-5" />
                    Download now
                  </Button>
                </motion.div>
                <p className="text-center text-sm text-muted-foreground">
                  Get 3 free premium queries
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mx-auto mt-14 grid max-w-3xl gap-4 sm:mt-20 sm:gap-6 sm:grid-cols-3"
            >
              {highlights.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="group rounded-2xl border border-border/60 bg-card/50 p-4 text-left backdrop-blur-sm sm:p-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50 transition-colors group-hover:bg-muted">
                        <Icon className="h-5 w-5 text-foreground" />
                      </div>

                      <div>
                        <div className="font-semibold text-foreground">
                          {item.label}
                        </div>

                        <div className="text-xs text-muted-foreground">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute bottom-6 hidden sm:block"
          >
            <motion.a
              href="#problem"
              className="flex flex-col items-center gap-2 text-muted-foreground/60 transition-colors hover:text-muted-foreground"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-xs">Scroll to explore</span>
              <ChevronDown className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </section>

        {/* Problem Section */}
        <section
          id="problem"
          className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-32"
        >
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.p
              variants={fadeInUp}
              className="text-sm font-medium text-primary"
            >
              Sound familiar?
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl"
            >
              Your brain wasn&apos;t built to remember everything
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Every day, you see hundreds of things on your screen. Important
              things. Useful things. And then they&apos;re gone.
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mt-12 grid gap-4 sm:mt-20 sm:gap-6 md:grid-cols-3"
          >
            {problemItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/50 p-6 sm:p-8"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.4 }}
                  />
                  <div className="relative z-10">
                    <div className="inline-flex rounded-2xl bg-muted/50 p-4">
                      <Icon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
                    <p className="mt-3 text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-32"
        >
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.p
              variants={fadeInUp}
              className="text-sm font-medium text-primary"
            >
              How it works
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl"
            >
              Simple. Private. AI-powered.
            </motion.h2>
          </motion.div>

          <div className="mt-12 space-y-16 sm:mt-20 sm:space-y-24">
            {howItWorksSteps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={step.title}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={staggerContainer}
                  className={`grid items-center gap-8 sm:gap-12 md:grid-cols-2 ${isEven ? "" : "md:grid-flow-dense"}`}
                >
                  <motion.div
                    variants={isEven ? slideInLeft : slideInRight}
                    className={isEven ? "" : "md:col-start-2"}
                  >
                    <div className="mb-5 flex items-center gap-3 sm:mb-6 sm:gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-transparent">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/50 text-sm font-semibold text-muted-foreground">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold sm:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                      {step.description}
                    </p>
                  </motion.div>

                  <motion.div
                    variants={isEven ? slideInRight : slideInLeft}
                    className={`rounded-3xl border border-border/60 bg-card/30 p-2 ${isEven ? "" : "md:col-start-1"}`}
                  >
                    {step.visual === "capture" && <CaptureVisual />}
                    {step.visual === "mask" && <MaskVisual />}
                    {step.visual === "ask" && <AskVisual />}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-32"
        >
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.p
              variants={fadeInUp}
              className="text-sm font-medium text-primary"
            >
              Features
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl"
            >
              Local-first memory search with AI answers
            </motion.h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mt-12 grid gap-4 sm:mt-20 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {featureCards.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/50 p-6 sm:p-8"
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100`}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="inline-flex rounded-2xl bg-muted/50 p-4"
                    >
                      <Icon className="h-6 w-6 text-muted-foreground" />
                    </motion.div>
                    <h3 className="mt-6 text-xl font-semibold">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Use Cases Section */}
        <section
          id="use-cases"
          className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-32"
        >
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.p
              variants={fadeInUp}
              className="text-sm font-medium text-primary"
            >
              Real examples
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl"
            >
              Ask anything, find everything
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              From recipes to meeting notes, from memes to research — if you saw
              it, Memento remembers it.
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mt-12 grid gap-4 sm:mt-16 sm:gap-6 sm:grid-cols-2"
          >
            {useCases.map((item, index) => (
              <UseCaseCard key={item.title} item={item} index={index} />
            ))}
          </motion.div>
        </section>

        {/* Privacy Section */}
        <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-32">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-foreground/5 sm:rounded-[2.5rem]"
          >
            <div className="absolute inset-0 aurora-glow opacity-20" />
            <div className="relative z-10 p-6 text-center sm:p-12 md:p-20">
              <motion.div
                variants={scaleIn}
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 sm:mb-8 sm:h-20 sm:w-20"
              >
                <Shield className="h-8 w-8 text-primary sm:h-10 sm:w-10" />
              </motion.div>

              <motion.h2
                variants={fadeInUp}
                className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl"
              >
                Local data. Better AI answers. Full control.
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
              >
                Memento keeps your memory timeline, personal data, and chat
                history on your computer. When you ask a question, it can send
                only the most relevant snippets to cloud AI models so answers
                are more useful without sharing everything.
              </motion.p>

              <motion.div
                variants={staggerContainer}
                className="mt-10 grid gap-6 sm:mt-16 sm:gap-8 md:grid-cols-3"
              >
                {[
                  {
                    icon: HardDrive,
                    title: "Chats stay local",
                    desc: "Your conversations and full memory archive remain on-device",
                  },
                  {
                    icon: Lock,
                    title: "Relevant context only",
                    desc: "Only the useful snippets go to cloud AI when needed",
                  },
                  {
                    icon: EyeOff,
                    title: "You Decide",
                    desc: "Mask any app or website",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      variants={fadeInUp}
                      className="text-center"
                    >
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted/50">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 sm:py-32"
        >
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.p
              variants={fadeInUp}
              className="text-sm font-medium text-primary"
            >
              FAQ
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl"
            >
              Common questions
            </motion.h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mt-12 space-y-4 sm:mt-16"
          >
            {faqs.map((item) => (
              <motion.div
                key={item.q}
                variants={fadeInUp}
                whileHover={{ scale: 1.01 }}
                className="group overflow-hidden rounded-2xl border border-border/60 bg-card/50"
              >
                <div className="p-5 sm:p-6">
                  <h3 className="flex items-start gap-3 text-base font-semibold sm:text-lg">
                    <MessageCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    {item.q}
                  </h3>
                  <p className="mt-3 pl-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.a}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto w-full max-w-7xl px-4 pb-20 pt-4 sm:px-6 sm:pb-32 sm:pt-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-gradient-to-br from-primary/10 via-background to-foreground/5 p-6 text-center sm:rounded-[2.5rem] sm:p-12 md:p-20"
          >
            <div className="aurora-bg pointer-events-none absolute inset-0 opacity-40" />
            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold tracking-tight sm:text-6xl"
              >
                Ready to remember
                <span className="block mt-2 gradient-text">everything?</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg"
              >
                Download now to get 3 free premium queries, or log in to unlock
                5 premium queries with AI-powered answers.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:mt-10 sm:items-center sm:flex-row"
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    className="w-full cursor-pointer rounded-full px-8 py-6 text-sm font-semibold sm:px-12 sm:py-7 sm:text-base"
                  >
                    <WindowsLogo className="h-5 w-5" />
                    Download now
                  </Button>
                </motion.div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-sm leading-relaxed text-muted-foreground/70"
              >
                Download now: 3 free premium queries
                • Windows 10/11
              </motion.p>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-background/80">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="relative h-7 w-7">
                <Image
                  src="/logo.svg"
                  alt="Memento"
                  fill
                  className="object-contain dark:invert"
                />
              </div>
              <span className="text-base font-semibold tracking-tight">
                Memento
              </span>
            </div>

            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Memento. Your memory stays yours.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground sm:gap-4">
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-muted-foreground" />
                100% Local
              </span>
              <span>•</span>
              <span>Windows 10/11</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
