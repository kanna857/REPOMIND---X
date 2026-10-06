'use client';

import React from 'react';
import Link from 'next/link';
import { OpenSourceGalaxy } from '../components/galaxy/OpenSourceGalaxy';
import {
  Rocket,
  PlayCircle,
  Terminal,
  Bot,
  Compass,
  GitMerge,
  Sparkles,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  FileCode,
  Layers,
} from 'lucide-react';

export default function LandingPage() {
  const steps = [
    { num: '01', title: 'Discover', desc: 'Semantic search matches unblocked, beginner-friendly GitHub issues to your exact skill profile.' },
    { num: '02', title: 'Understand', desc: 'AI explains the problem simply in plain English, Hindi, or Telugu, identifying affected files.' },
    { num: '03', title: 'Claim Check', desc: 'Detects active comments and maintainer assignees to protect you from claim conflicts.' },
    { num: '04', title: 'Plan', desc: 'Autonomous Planner Agent synthesizes a step-by-step checklist and git branch commands.' },
    { num: '05', title: 'Code & Context', desc: 'Interactive AST dependency graph walks you through components, hooks, services, and tests.' },
    { num: '06', title: 'Test Sandbox', desc: 'Futuristic terminal executes commands and debugs error traces with instant root-cause analysis.' },
    { num: '07', title: 'Review Diff', desc: 'Reviewer Agent inspects git diffs against CONTRIBUTING.md, calculating a PR Readiness Score.' },
    { num: '08', title: 'PR & Portfolio', desc: 'Auto-generates clean PR markdown and logs the achievement onto your futuristic Developer Passport.' },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Atmosphere Ambient Glows */}
      <div className="relative">
        <div className="absolute -top-24 left-1/4 w-[600px] h-[600px] bg-[#00F0FF]/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#6f00be]/15 rounded-full blur-[150px] pointer-events-none"></div>

        {/* Live Telemetry Overline Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b1f2a] text-[#00f89e] font-mono text-xs border border-cyan-500/20">
              <span className="w-2 h-2 rounded-full bg-[#00f89e] animate-ping"></span>
              SYNAPSE CORE v4.8
            </span>
            <span className="font-mono text-xs text-gray-400 uppercase tracking-wider hidden sm:inline">
              SECTOR: ASTRO-OSS // RUNTIME READY
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs text-gray-400">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <Cpu className="w-3.5 h-3.5 text-[#00F0FF]" /> 8,421 ACTIVE SYNAPSES
            </span>
            <span className="flex items-center gap-1.5 text-purple-300">
              <Sparkles className="w-3.5 h-3.5 text-[#A855F7]" /> NVIDIA NEMOTRON 70B
            </span>
          </div>
        </div>

        {/* Hero Section Grid: Asymmetric Cockpit View */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Left Column: Hero Narrative & Dispatch Hub (5 Cols) */}
          <div className="xl:col-span-5 flex flex-col gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171b26] text-[#00F0FF] font-mono text-xs border border-cyan-500/30">
                <Terminal className="w-3.5 h-3.5" />
                <span>AUTONOMOUS OPEN SOURCE FLIGHT DECK</span>
              </div>

              <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl font-bold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-200 to-[#A855F7] leading-tight">
                Your AI Copilot For Open Source
              </h1>

              <p className="font-sans text-gray-300 text-base sm:text-lg leading-relaxed">
                Discover the right issue. Understand the code with spatial memory. Build with confidence. Ship your first contribution alongside autonomous multi-agent swarms.
              </p>
            </div>

            {/* Action Cockpit CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                href="/discover"
                className="group relative px-6 py-3.5 rounded-xl bg-[#00F0FF] text-[#00363a] font-['Space_Grotesk'] text-base font-bold tracking-wider flex items-center gap-2 shadow-[0_0_24px_rgba(0,240,255,0.4)] hover:shadow-[0_0_36px_rgba(0,240,255,0.7)] hover:scale-[1.02] transition-all"
              >
                <Rocket className="w-5 h-5 transition-transform group-hover:rotate-45" />
                <span>START CONTRIBUTING</span>
              </Link>

              <Link
                href="/dashboard"
                className="relative px-5 py-3.5 rounded-xl bg-[#171b26] hover:bg-[#262a35] text-cyan-200 font-mono text-sm flex items-center gap-2 border border-cyan-500/25 transition-all"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A855F7] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A855F7]"></span>
                </span>
                <span>EXPLORE DEMO COCKPIT</span>
                <PlayCircle className="w-4 h-4 text-[#A855F7]" />
              </Link>
            </div>

            {/* Metric Pulse Cards */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#0C101A] border border-cyan-500/15 flex flex-col gap-1 shadow-sm">
                <span className="font-mono text-[10px] text-gray-400 uppercase">Issues Analyzed</span>
                <span className="font-['Space_Grotesk'] text-2xl text-[#00FFA3] font-bold">12K+</span>
                <span className="text-[11px] text-gray-400">AST Parsed</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0C101A] border border-cyan-500/15 flex flex-col gap-1 shadow-sm">
                <span className="font-mono text-[10px] text-gray-400 uppercase">Plans Built</span>
                <span className="font-['Space_Grotesk'] text-2xl text-[#00F0FF] font-bold">4.8K+</span>
                <span className="text-[11px] text-gray-400">Step-by-step</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0C101A] border border-cyan-500/15 flex flex-col gap-1 shadow-sm">
                <span className="font-mono text-[10px] text-gray-400 uppercase">PRs Assisted</span>
                <span className="font-['Space_Grotesk'] text-2xl text-[#A855F7] font-bold">1.2K+</span>
                <span className="text-[11px] text-gray-400">Merged cleanly</span>
              </div>
            </div>

            {/* Terminal Dispatch Stream Preview */}
            <div className="p-4 rounded-xl bg-[#080E1C] border border-cyan-500/20 shadow-xl flex flex-col gap-2">
              <div className="flex items-center justify-between font-mono text-[11px] pb-2 border-b border-cyan-500/15">
                <span className="flex items-center gap-1.5 text-[#00F0FF]">
                  <Terminal className="w-3.5 h-3.5" /> LIVE DISPATCH STREAM
                </span>
                <span className="text-[#00FFA3] font-semibold">STREAMING</span>
              </div>
              <div className="font-mono text-xs space-y-1.5 text-gray-400">
                <div className="text-gray-300 flex items-center gap-2">
                  <span className="text-[#A855F7]">&gt;</span> query --stack "python" --difficulty "good-first"
                </div>
                <div className="text-[#00F0FF] flex items-center gap-2">
                  <span className="text-gray-600">↳</span> Found 18 unassigned nodes in open-telemetry/opentelemetry-python
                </div>
                <div className="text-[#00FFA3] flex items-center gap-2">
                  <span className="text-gray-600">↳</span> Claim Risk: ZERO • Verification AST score: 96.4%
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Signature 3D Open Source Galaxy (7 Cols) */}
          <div className="xl:col-span-7 flex flex-col gap-3">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-200">
                <Sparkles className="w-4 h-4 text-[#00F0FF]" />
                <span className="font-bold">SIGNATURE VISUAL // OPEN SOURCE GALAXY</span>
              </div>
              <span className="font-mono text-[11px] text-gray-500">INTERACTIVE 3D MAPPING</span>
            </div>

            {/* 3D Galaxy Canvas Component */}
            <OpenSourceGalaxy />
          </div>
        </div>
      </div>

      {/* 8-Step Pipeline Section: How It Works */}
      <section className="space-y-8 pt-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171b26] text-[#00FFA3] font-mono text-xs border border-green-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>END-TO-END CONTRIBUTION LIFECYCLE</span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl font-bold text-white uppercase tracking-tight">
            How RepoMind-X Works
          </h2>
          <p className="text-sm text-gray-400">
            We turn intimidating GitHub searches into an AI-guided mission with continuous guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s) => (
            <div
              key={s.num}
              className="p-5 rounded-xl bg-[#0C101A] border border-cyan-500/15 hover:border-cyan-500/40 hover:bg-[#141A28] transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 px-3 py-1 bg-cyan-500/10 rounded-bl-lg font-mono text-xs text-[#00F0FF] font-bold">
                {s.num}
              </div>
              <h3 className="font-['Space_Grotesk'] text-lg font-semibold text-white group-hover:text-[#00F0FF] transition-colors mt-2">
                {s.title}
              </h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Autonomous Multi-Agent Swarm Feature Matrix */}
      <section className="p-8 rounded-2xl bg-[#0C101A] border border-cyan-500/20 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#A855F7]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#A855F7] uppercase tracking-widest font-semibold">
              TRI-AGENT ARCHITECTURE
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl font-bold text-white">
              Autonomous Agent Fleet
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Powered by NVIDIA Nemotron via Nebius Token Factory, three specialized agents orchestrate every phase of your contribution.
            </p>
            <Link
              href="/agent"
              className="inline-flex items-center gap-2 text-sm font-mono text-[#00F0FF] hover:underline pt-2"
            >
              Watch live agent swarm <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Finder Agent */}
            <div className="p-4 rounded-xl bg-[#141A28] border border-cyan-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <Compass className="w-5 h-5 text-[#00F0FF]" />
                <span className="font-mono text-[10px] text-[#00f89e]">FINDER AGENT</span>
              </div>
              <h4 className="font-['Space_Grotesk'] text-sm font-bold text-white">Discovers Opportunities</h4>
              <p className="text-xs text-gray-400">
                Scans issues, calculates compatibility scores, detects stale threads, and eliminates claim collisions.
              </p>
            </div>

            {/* Planner Agent */}
            <div className="p-4 rounded-xl bg-[#141A28] border border-cyan-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <Layers className="w-5 h-5 text-[#A855F7]" />
                <span className="font-mono text-[10px] text-[#A855F7]">PLANNER AGENT</span>
              </div>
              <h4 className="font-['Space_Grotesk'] text-sm font-bold text-white">Architects Solutions</h4>
              <p className="text-xs text-gray-400">
                Maps affected files, synthesizes test recipes, and generates conventional commit commands.
              </p>
            </div>

            {/* Reviewer Agent */}
            <div className="p-4 rounded-xl bg-[#141A28] border border-cyan-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <GitMerge className="w-5 h-5 text-[#00FFA3]" />
                <span className="font-mono text-[10px] text-[#00FFA3]">REVIEWER AGENT</span>
              </div>
              <h4 className="font-['Space_Grotesk'] text-sm font-bold text-white">Validates Merges</h4>
              <p className="text-xs text-gray-400">
                Evaluates code diffs, verifies regression boundaries, and scores PR readiness for effortless approvals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="text-center p-12 rounded-2xl bg-gradient-to-b from-[#141A28] to-[#080E1C] border border-cyan-500/30 shadow-[0_0_50px_rgba(0,240,255,0.15)] space-y-6">
        <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
          Ready to Ship Your Next Open-Source PR?
        </h2>
        <p className="text-gray-300 max-w-xl mx-auto text-sm sm:text-base">
          Join thousands of developers turning open source from a daunting maze into an AI-guided engineering mission.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/discover"
            className="px-8 py-3.5 rounded-xl bg-[#00F0FF] text-[#00363a] font-['Space_Grotesk'] text-base font-bold tracking-wider hover:brightness-110 shadow-[0_0_24px_rgba(0,240,255,0.4)] transition-all"
          >
            LAUNCH MISSION DISPATCH
          </Link>
          <Link
            href="/login"
            className="px-6 py-3.5 rounded-xl bg-[#171b26] hover:bg-[#262a35] text-white font-mono text-sm border border-cyan-500/20 transition-all"
          >
            CONNECT GITHUB
          </Link>
        </div>
      </section>
    </div>
  );
}
