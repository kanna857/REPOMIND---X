'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { OpenSourceGalaxy } from '../../components/galaxy/OpenSourceGalaxy';
import {
  Rocket,
  Flame,
  GitMerge,
  GitPullRequest,
  CheckCircle2,
  Award,
  Cpu,
  Terminal,
  Compass,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  Layers,
  ChevronRight,
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();

  const user = {
    username: 'octo-cadet',
    name: 'Alex Rivera',
    streak: 14,
    prsOpened: 5,
    prsMerged: 42,
    issuesSolved: 31,
    contributionScore: 894,
    learningLevel: 'Level 4 // Astro-Architect',
  };

  const recommendedMission = {
    id: '1',
    repo: 'open-telemetry/opentelemetry-python',
    issue: 'Fix authentication timeout in token refresh worker',
    difficulty: 'Easy',
    estimatedTime: '2–3 hours',
    matchScore: 96,
    skills: ['Python', 'Asyncio', 'Debugging', 'Unit Testing'],
    risk: 'Zero Claim Risk',
    astComplexity: 'Low Blast Radius',
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Welcome & Mission Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0C101A] border border-cyan-500/20 shadow-xl relative overflow-hidden">
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00f89e] animate-ping"></span>
            <span className="font-mono text-xs text-[#00f89e] uppercase tracking-wider font-semibold">
              MISSION CONTROL // AUTONOMOUS RECON READY
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Good morning, <span className="text-[#00F0FF]">{user.username}</span>
          </h1>
          <p className="text-xs text-gray-400">
            NVIDIA Nemotron 70B calibrated your developer receptor. High-yield issues mapped below.
          </p>
        </div>

        {/* User Quick Badges */}
        <div className="flex flex-wrap items-center gap-3 z-10">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#141A28] border border-cyan-500/25 font-mono text-xs">
            <Flame className="w-4 h-4 text-[#FFB800]" />
            <span className="text-gray-300">Streak:</span>
            <span className="text-[#FFB800] font-bold">{user.streak} Days</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#141A28] border border-cyan-500/25 font-mono text-xs">
            <Award className="w-4 h-4 text-[#A855F7]" />
            <span className="text-[#A855F7] font-bold">{user.learningLevel}</span>
          </div>
        </div>
      </div>

      {/* KPI Telemetry Matrix Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-xl bg-[#0C101A] border border-cyan-500/15 flex flex-col gap-1">
          <span className="font-mono text-[10px] text-gray-400 uppercase">PRs Merged</span>
          <span className="font-['Space_Grotesk'] text-2xl text-[#00FFA3] font-bold">{user.prsMerged}</span>
          <span className="text-[10px] text-gray-500">Verified CI</span>
        </div>
        <div className="p-3.5 rounded-xl bg-[#0C101A] border border-cyan-500/15 flex flex-col gap-1">
          <span className="font-mono text-[10px] text-gray-400 uppercase">PRs In Flight</span>
          <span className="font-['Space_Grotesk'] text-2xl text-[#00F0FF] font-bold">{user.prsOpened}</span>
          <span className="text-[10px] text-gray-500">Pending Maintainer</span>
        </div>
        <div className="p-3.5 rounded-xl bg-[#0C101A] border border-cyan-500/15 flex flex-col gap-1">
          <span className="font-mono text-[10px] text-gray-400 uppercase">Issues Solved</span>
          <span className="font-['Space_Grotesk'] text-2xl text-[#A855F7] font-bold">{user.issuesSolved}</span>
          <span className="text-[10px] text-gray-500">Across 18 Repos</span>
        </div>
        <div className="p-3.5 rounded-xl bg-[#0C101A] border border-cyan-500/15 flex flex-col gap-1">
          <span className="font-mono text-[10px] text-gray-400 uppercase">Score XP</span>
          <span className="font-['Space_Grotesk'] text-2xl text-white font-bold">{user.contributionScore}</span>
          <span className="text-[10px] text-[#00FFA3] font-mono">+45 This Week</span>
        </div>
        <div className="p-3.5 rounded-xl bg-[#0C101A] border border-cyan-500/15 flex flex-col gap-1">
          <span className="font-mono text-[10px] text-gray-400 uppercase">First-PR Rate</span>
          <span className="font-['Space_Grotesk'] text-2xl text-[#00FFA3] font-bold">98.4%</span>
          <span className="text-[10px] text-gray-500">Merge Success</span>
        </div>
        <div className="p-3.5 rounded-xl bg-[#0C101A] border border-cyan-500/15 flex flex-col gap-1">
          <span className="font-mono text-[10px] text-gray-400 uppercase">Triage Latency</span>
          <span className="font-['Space_Grotesk'] text-2xl text-[#00F0FF] font-bold">&lt; 3.2s</span>
          <span className="text-[10px] text-gray-500">AST Parsing</span>
        </div>
      </div>

      {/* Bento Layout: Main 3D Galaxy + Recommended Mission Side Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Recommended Mission Panel (4 Cols) */}
        <div className="xl:col-span-4 flex flex-col gap-4">
          <div className="p-5 rounded-2xl bg-[#0C101A] border border-cyan-500/25 shadow-xl space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between pb-2 border-b border-cyan-500/15">
              <div className="flex items-center gap-2">
                <span className="w-2 h-4 bg-[#00F0FF] rounded-sm"></span>
                <span className="font-mono text-xs text-[#00F0FF] uppercase tracking-wider font-semibold">
                  Recommended Mission
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#1b1f2a] text-[#00f89e] font-mono text-[10px] border border-green-500/30">
                96% AI MATCH
              </span>
            </div>

            <div className="space-y-2">
              <div className="font-mono text-xs text-gray-400 flex items-center gap-1.5">
                <span className="text-[#00F0FF]">{recommendedMission.repo}</span>
                <span>•</span>
                <span>ISSUE #184</span>
              </div>
              <h3 className="font-['Space_Grotesk'] text-base font-bold text-white hover:text-[#00F0FF] transition-colors">
                {recommendedMission.issue}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Upstream identity broker returns HTTP 429 during token refresh, causing deadlocks in asyncio event loop.
              </p>
            </div>

            {/* AI Analysis Badges */}
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              <div className="p-2 rounded-lg bg-[#141A28] border border-cyan-500/10 space-y-0.5">
                <span className="text-gray-500 text-[10px]">DIFFICULTY</span>
                <div className="text-[#00f89e] font-semibold">{recommendedMission.difficulty}</div>
              </div>
              <div className="p-2 rounded-lg bg-[#141A28] border border-cyan-500/10 space-y-0.5">
                <span className="text-gray-500 text-[10px]">TIME ESTIMATE</span>
                <div className="text-[#00F0FF] font-semibold">{recommendedMission.estimatedTime}</div>
              </div>
              <div className="p-2 rounded-lg bg-[#141A28] border border-cyan-500/10 space-y-0.5">
                <span className="text-gray-500 text-[10px]">CLAIM RISK</span>
                <div className="text-[#00FFA3] font-semibold">{recommendedMission.risk}</div>
              </div>
              <div className="p-2 rounded-lg bg-[#141A28] border border-cyan-500/10 space-y-0.5">
                <span className="text-gray-500 text-[10px]">AST COMPLEXITY</span>
                <div className="text-[#ddb7ff] font-semibold">{recommendedMission.astComplexity}</div>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider block">Recommended Skills:</span>
              <div className="flex flex-wrap gap-1.5">
                {recommendedMission.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded-md bg-[#171b26] border border-cyan-500/20 font-mono text-[11px] text-cyan-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => router.push(`/issues/${recommendedMission.id}`)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#00dbe9] text-[#00363a] font-['Space_Grotesk'] text-sm font-bold tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(0,240,255,0.35)] flex items-center justify-center gap-2 transition-all"
            >
              <Rocket className="w-4 h-4" />
              <span>START MISSION RECON</span>
            </button>
          </div>

          {/* Quick Subroutines */}
          <div className="p-4 rounded-xl bg-[#0C101A] border border-cyan-500/15 space-y-2">
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-semibold block">
              Quick Mission Subroutines
            </span>
            <Link
              href="/discover"
              className="flex items-center justify-between p-2.5 rounded-lg bg-[#141A28] hover:bg-cyan-500/10 text-xs text-gray-300 hover:text-white transition-colors"
            >
              <span className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#00F0FF]" /> Explore 80+ Good First Issues
              </span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </Link>
            <Link
              href="/agent"
              className="flex items-center justify-between p-2.5 rounded-lg bg-[#141A28] hover:bg-cyan-500/10 text-xs text-gray-300 hover:text-white transition-colors"
            >
              <span className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#A855F7]" /> Launch Tri-Agent Swarm
              </span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </Link>
          </div>
        </div>

        {/* 3D Galaxy Centerpiece (8 Cols) */}
        <div className="xl:col-span-8 flex flex-col gap-3">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-200">
              <Sparkles className="w-4 h-4 text-[#00F0FF]" />
              <span className="font-bold">OPEN SOURCE GALAXY // TELEMETRY VIEWPORT</span>
            </div>
            <span className="font-mono text-[11px] text-gray-500">LIVE ORBITAL RADAR</span>
          </div>

          <OpenSourceGalaxy />
        </div>
      </div>
    </div>
  );
}
