'use client';

import React, { useState } from 'react';
import { SAMPLE_REPOSITORIES } from '@repomind/github';
import {
  Scale,
  Sparkles,
  CheckCircle2,
  GitBranch,
  Star,
  Clock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function ComparePage() {
  const [repoA, setRepoA] = useState(SAMPLE_REPOSITORIES[0]); // facebook/react
  const [repoB, setRepoB] = useState(SAMPLE_REPOSITORIES[3]); // open-telemetry/opentelemetry-python

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#0C101A] border border-cyan-500/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#00F0FF] mb-1">
            <Scale className="w-4 h-4" />
            <span>COMPARATIVE TELEMETRY // BENCHMARKING</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Repository Comparison
          </h1>
          <p className="text-xs text-gray-400">
            Compare repository velocity, health scores, and beginner friendliness side by side.
          </p>
        </div>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-[#0C101A] border border-cyan-500/20 space-y-2">
          <label className="font-mono text-xs text-gray-400">SELECT REPOSITORY ALPHA:</label>
          <select
            value={repoA.name}
            onChange={(e) => {
              const f = SAMPLE_REPOSITORIES.find((r) => r.name === e.target.value);
              if (f) setRepoA(f);
            }}
            className="w-full p-2.5 rounded-lg bg-[#141A28] border border-cyan-500/20 text-white font-mono text-xs focus:outline-none"
          >
            {SAMPLE_REPOSITORIES.map((r) => (
              <option key={r.name} value={r.name}>{r.name}</option>
            ))}
          </select>
        </div>

        <div className="p-4 rounded-xl bg-[#0C101A] border border-cyan-500/20 space-y-2">
          <label className="font-mono text-xs text-gray-400">SELECT REPOSITORY BETA:</label>
          <select
            value={repoB.name}
            onChange={(e) => {
              const f = SAMPLE_REPOSITORIES.find((r) => r.name === e.target.value);
              if (f) setRepoB(f);
            }}
            className="w-full p-2.5 rounded-lg bg-[#141A28] border border-cyan-500/20 text-white font-mono text-xs focus:outline-none"
          >
            {SAMPLE_REPOSITORIES.map((r) => (
              <option key={r.name} value={r.name}>{r.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparative Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[repoA, repoB].map((repo, idx) => (
          <div
            key={repo.name}
            className="p-6 rounded-2xl bg-[#0C101A] border border-cyan-500/25 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-cyan-500/15">
              <span className="font-mono text-xs text-cyan-400">TARGET 0{idx + 1}</span>
              <span className="px-2 py-0.5 rounded bg-[#1b1f2a] text-[#00FFA3] font-mono text-xs">
                HEALTH: {repo.healthScore}/100
              </span>
            </div>

            <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white">
              {repo.name}
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              {repo.description}
            </p>

            <div className="grid grid-cols-2 gap-2 font-mono text-xs pt-2">
              <div className="p-2.5 rounded-lg bg-[#141A28] space-y-1">
                <span className="text-[10px] text-gray-500 block">STARS</span>
                <span className="text-white font-bold">{repo.stars.toLocaleString()}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#141A28] space-y-1">
                <span className="text-[10px] text-gray-500 block">FORKS</span>
                <span className="text-white font-bold">{repo.forks.toLocaleString()}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#141A28] space-y-1">
                <span className="text-[10px] text-gray-500 block">OPEN ISSUES</span>
                <span className="text-cyan-300 font-bold">{repo.openIssues}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#141A28] space-y-1">
                <span className="text-[10px] text-gray-500 block">LANGUAGE</span>
                <span className="text-[#00F0FF] font-bold">{repo.language}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#080E1C] border border-cyan-500/10 text-xs text-gray-300 font-sans flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00FFA3] shrink-0" />
              <span>Beginner Friendly: {repo.beginnerFriendly ? 'Yes (Active Mentorship)' : 'Moderate (Complex Tooling)'}</span>
            </div>
          </div>
        ))}
      </div>

      {/* AI Comparative Verdict */}
      <div className="p-6 rounded-2xl bg-[#0C101A] border border-purple-500/30 shadow-xl space-y-2">
        <div className="flex items-center gap-2 font-mono text-xs text-[#A855F7] font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>NVIDIA NEMOTRON COMPARATIVE VERDICT</span>
        </div>
        <p className="text-sm text-gray-300 font-sans leading-relaxed">
          For your first contribution, <strong className="text-[#00F0FF]">{repoB.name}</strong> offers the higher merge velocity due to smaller module blast radius and unblocked issue triage latency. <strong className="text-[#A855F7]">{repoA.name}</strong> provides higher prestige XP but requires rigorous multi-tier maintainer consensus.
        </p>
      </div>
    </div>
  );
}
