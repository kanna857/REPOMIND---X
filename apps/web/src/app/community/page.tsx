'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  Award,
  Trophy,
  Flame,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export default function CommunityPage() {
  const leaderboards = [
    { rank: 1, user: 'octo-cadet', prs: 42, score: 894, badge: 'Astro-Architect' },
    { rank: 2, user: 'quantum_coder', prs: 38, score: 812, badge: 'Core Navigator' },
    { rank: 3, user: 'cyber_sage', prs: 31, score: 745, badge: 'AST Master' },
    { rank: 4, user: 'dev_artisan', prs: 24, score: 620, badge: 'Code Pioneer' },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#0C101A] border border-cyan-500/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#00FFA3] mb-1">
            <Users className="w-4 h-4" />
            <span>COMMUNITY SQUAD // GLOBAL OPEN-SOURCE MATRIX</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Community Hub & Leaderboard
          </h1>
          <p className="text-xs text-gray-400">
            Collaborate, climb contribution tiers, and participate in weekly open-source hackathon sprints.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/leaderboard"
            className="px-4 py-2 rounded-xl bg-[#141A28] border border-cyan-500/20 text-white font-mono text-xs hover:bg-[#1b1f2a] transition-colors"
          >
            <span>Full Leaderboard</span>
          </Link>
        </div>
      </div>

      {/* Grid: Active Sprint (6 Cols) + Leaderboard (6 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Active Sprint Challenge */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-[#0C101A] border border-cyan-500/25 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-cyan-500/15">
              <span className="font-mono text-xs text-[#FFB800] uppercase tracking-wider font-semibold">
                ACTIVE SPRINT // WEEK 14
              </span>
              <span className="px-2 py-0.5 rounded bg-[#1b1f2a] text-[#00FFA3] font-mono text-xs">
                ENDS IN 4 DAYS
              </span>
            </div>

            <div>
              <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white">
                Python Concurrency & Async Sprint
              </h2>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                Contribute at least 2 pull requests addressing race conditions, timeout handling, or asyncio workers in approved repositories.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#141A28] border border-cyan-500/15 flex items-center justify-between font-mono text-xs">
              <div>
                <span className="text-gray-500 block">REWARD:</span>
                <span className="text-[#00FFA3] font-bold text-sm">+500 XP & "Async Hunter" Badge</span>
              </div>
              <div className="text-right">
                <span className="text-gray-500 block">PARTICIPANTS:</span>
                <span className="text-white font-bold text-sm">342 Developers</span>
              </div>
            </div>

            <Link
              href="/discover"
              className="w-full py-3 rounded-xl bg-[#00F0FF] text-[#00363a] font-['Space_Grotesk'] text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(0,240,255,0.35)] hover:brightness-110 transition-all"
            >
              <span>DISPATCH ISSUES FOR THIS SPRINT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Global Leaderboard */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-[#0C101A] border border-cyan-500/25 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-cyan-500/15">
              <span className="font-mono text-xs text-gray-400 uppercase tracking-wider font-semibold">
                Global Contributor Ranks
              </span>
              <span className="font-mono text-xs text-[#00FFA3]">MONTHLY RESET</span>
            </div>

            <div className="space-y-2">
              {leaderboards.map((lb) => (
                <div
                  key={lb.user}
                  className="p-3 rounded-xl bg-[#141A28] border border-cyan-500/15 flex items-center justify-between font-mono text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[#00F0FF] font-bold w-4">{lb.rank}.</span>
                    <div>
                      <div className="text-white font-semibold">@{lb.user}</div>
                      <div className="text-[10px] text-gray-400">{lb.badge}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[#00FFA3] font-bold block">{lb.score} XP</span>
                    <span className="text-[10px] text-gray-500">{lb.prs} PRs Merged</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
