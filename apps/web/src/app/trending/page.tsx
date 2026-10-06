'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ISSUES_DATA } from '../../lib/data';
import {
  TrendingUp,
  Sparkles,
  ArrowRight,
  GitBranch,
  Star,
  Flame,
} from 'lucide-react';

export default function TrendingPage() {
  const [timeframe, setTimeframe] = useState<'today' | 'week' | 'month'>('today');

  return (
    <div className="space-y-6 pb-16">
      <div className="p-6 rounded-2xl bg-[#0C101A] border border-cyan-500/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#FFB800] mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>GLOBAL VELOCITY RADAR // TRENDING TARGETS</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Trending Open-Source Vectors
          </h1>
          <p className="text-xs text-gray-400">
            Issues receiving the highest maintainer attention, triage velocity, and community interest.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#141A28] border border-cyan-500/20 font-mono text-xs">
          {(['today', 'week', 'month'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                timeframe === t ? 'bg-[#FFB800] text-[#05070D] font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ISSUES_DATA.map((issue, idx) => (
          <div
            key={issue.id}
            className="p-5 rounded-2xl bg-[#0C101A] border border-cyan-500/15 hover:border-cyan-500/40 hover:bg-[#141A28] transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#00F0FF]">{issue.repository}</span>
                <span className="flex items-center gap-1 font-mono text-xs text-[#FFB800]">
                  <Flame className="w-3.5 h-3.5" /> #{idx + 1} Velocity
                </span>
              </div>

              <h3 className="font-['Space_Grotesk'] text-base font-bold text-white hover:text-[#00F0FF] transition-colors">
                {issue.title}
              </h3>

              <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                {issue.body}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-cyan-500/10 flex items-center justify-between">
              <span className="font-mono text-xs text-[#00FFA3]">{issue.difficulty} • {issue.matchScore}% Match</span>
              <Link
                href={`/issues/${issue.id}`}
                className="px-3.5 py-1.5 rounded-lg bg-[#00F0FF] text-[#00363a] font-['Space_Grotesk'] text-xs font-bold flex items-center gap-1 hover:brightness-110 transition-all"
              >
                <span>RECON</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
