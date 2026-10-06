'use client';

import React, { useState } from 'react';
import { DEMO_PORTFOLIO } from '@repomind/database';
import { requestAI } from '../../lib/ai';
import {
  Award,
  Sparkles,
  Share2,
  Copy,
  Check,
  GitMerge,
  Star,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
} from 'lucide-react';

export default function PortfolioPage() {
  const portfolio = DEMO_PORTFOLIO;
  const [copied, setCopied] = useState(false);
  const [postMode, setPostMode] = useState<'professional' | 'technical' | 'storytelling'>('professional');
  const [generatedPost, setGeneratedPost] = useState(
    `🚀 Just shipped an open-source contribution to open-telemetry/opentelemetry-python!

Issue: "Fix authentication timeout in token refresh worker"

Deep dive:
Diagnosed a race condition in the async worker loop when handling HTTP 429 throttling. Implemented exponential backoff with full jitter to prevent thundering herd problems, added regression tests, and verified CI across environments.

Thanks to the maintainers for the quick review!

#OpenSource #TypeScript #AsyncProgramming #GitHub #SoftwareEngineering #RepoMindX`
  );
  const [loadingPost, setLoadingPost] = useState(false);

  const handleModeChange = async (mode: 'professional' | 'technical' | 'storytelling') => {
    setPostMode(mode);
    setLoadingPost(true);
    try {
      const text = await requestAI('linkedin_post', {
        contribution: {
          repo: 'open-telemetry/opentelemetry-python',
          issueTitle: 'Fix authentication timeout in token refresh worker',
        },
        mode,
      });
      if (text) setGeneratedPost(text);
    } catch (e) {
      // Fallback works
    } finally {
      setLoadingPost(false);
    }
  };

  const handleCopyPost = () => {
    navigator.clipboard.writeText(generatedPost);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Passport Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0C101A] border border-cyan-500/25 shadow-2xl relative overflow-hidden space-y-6">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#A855F7]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00F0FF] via-[#00FFA3] to-[#A855F7] p-0.5 shadow-[0_0_24px_rgba(0,240,255,0.4)]">
              <div className="w-full h-full bg-[#05070D] rounded-[14px] flex items-center justify-center font-['Space_Grotesk'] text-xl font-bold text-[#00F0FF]">
                OC
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#00FFA3]">
                <ShieldCheck className="w-4 h-4" />
                <span>VERIFIED OPEN-SOURCE PASSPORT</span>
              </div>
              <h1 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
                @{portfolio.username}
              </h1>
              <p className="text-xs text-gray-400 font-mono">
                Level 4 Astro-Architect • 894 XP
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPost}
              className="px-4 py-2.5 rounded-xl bg-[#141A28] border border-cyan-500/30 text-white font-mono text-xs flex items-center gap-2 hover:bg-[#1b1f2a] transition-colors"
            >
              <Share2 className="w-4 h-4 text-[#00F0FF]" />
              <span>Share Passport</span>
            </button>
          </div>
        </div>

        {/* Core Passport Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-xl bg-[#141A28] border border-cyan-500/15">
            <span className="font-mono text-[10px] text-gray-400 uppercase">PRs Merged</span>
            <div className="font-['Space_Grotesk'] text-3xl font-bold text-[#00FFA3] mt-1">{portfolio.prsMerged}</div>
            <span className="text-[10px] text-gray-500 font-mono">Verified Commits</span>
          </div>
          <div className="p-4 rounded-xl bg-[#141A28] border border-cyan-500/15">
            <span className="font-mono text-[10px] text-gray-400 uppercase">Issues Solved</span>
            <div className="font-['Space_Grotesk'] text-3xl font-bold text-[#00F0FF] mt-1">{portfolio.issuesSolved}</div>
            <span className="text-[10px] text-gray-500 font-mono">AST Parsed</span>
          </div>
          <div className="p-4 rounded-xl bg-[#141A28] border border-cyan-500/15">
            <span className="font-mono text-[10px] text-gray-400 uppercase">Repositories</span>
            <div className="font-['Space_Grotesk'] text-3xl font-bold text-[#A855F7] mt-1">{portfolio.repositoriesCount}</div>
            <span className="text-[10px] text-gray-500 font-mono">Top Tier Orgs</span>
          </div>
          <div className="p-4 rounded-xl bg-[#141A28] border border-cyan-500/15">
            <span className="font-mono text-[10px] text-gray-400 uppercase">Tech Vectors</span>
            <div className="font-['Space_Grotesk'] text-3xl font-bold text-[#FFB800] mt-1">{portfolio.technologiesCount}</div>
            <span className="text-[10px] text-gray-500 font-mono">Language Stacks</span>
          </div>
        </div>
      </div>

      {/* Grid: Radar Skills & Badges (6 Cols) + LinkedIn Generator (6 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Skills Radar & Badges */}
        <div className="lg:col-span-6 space-y-4">
          {/* Skill Breakdown */}
          <div className="p-5 rounded-2xl bg-[#0C101A] border border-cyan-500/20 shadow-lg space-y-4">
            <span className="font-mono text-xs text-gray-400 uppercase tracking-wider font-semibold block">
              Skill Proficiency Matrix
            </span>

            <div className="space-y-3 font-mono text-xs">
              {portfolio.radarSkills.map((item) => (
                <div key={item.skill}>
                  <div className="flex justify-between text-gray-300 mb-1">
                    <span>{item.skill}</span>
                    <span className="text-[#00FFA3] font-bold">{item.value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#1b1f2a] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#00F0FF] to-[#A855F7] rounded-full"
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges Collection */}
          <div className="p-5 rounded-2xl bg-[#0C101A] border border-cyan-500/20 shadow-lg space-y-3">
            <span className="font-mono text-xs text-gray-400 uppercase tracking-wider font-semibold block">
              Earned Contribution Badges
            </span>

            <div className="grid grid-cols-2 gap-3">
              {portfolio.badges.map((b) => (
                <div
                  key={b.code}
                  className="p-3 rounded-xl bg-[#141A28] border border-cyan-500/15 flex items-center gap-3"
                >
                  <div className="p-2 rounded-lg bg-[#00F0FF]/15 text-[#00F0FF]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-['Space_Grotesk'] text-xs font-bold text-white">{b.title}</div>
                    <div className="font-mono text-[10px] text-gray-500">{b.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI LinkedIn / Social Share Generator */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-[#0C101A] border border-cyan-500/25 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-cyan-500/15">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#A855F7]" />
                <span className="font-['Space_Grotesk'] text-base font-bold text-white">
                  AI Social / LinkedIn Showcase
                </span>
              </div>

              {/* Format Switcher */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-[#141A28] border border-cyan-500/20 font-mono text-xs">
                {(['professional', 'technical', 'storytelling'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => handleModeChange(m)}
                    className={`px-2.5 py-1 rounded-lg capitalize transition-colors ${
                      postMode === m
                        ? 'bg-[#A855F7] text-white font-bold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {loadingPost ? (
              <div className="py-12 text-center font-mono text-xs text-[#A855F7]">
                NVIDIA Nemotron drafting engaging social update...
              </div>
            ) : (
              <div className="rounded-xl bg-[#05070D] border border-cyan-500/20 p-4 font-sans text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">
                {generatedPost}
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <span className="font-mono text-[11px] text-gray-500">Ready to publish on LinkedIn or X</span>
              <button
                onClick={handleCopyPost}
                className="px-5 py-2.5 rounded-xl bg-[#00F0FF] text-[#00363a] font-['Space_Grotesk'] text-xs font-bold flex items-center gap-2 shadow-[0_0_16px_rgba(0,240,255,0.4)] hover:brightness-110 transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY POST'}</span>
              </button>
            </div>
          </div>

          {/* Timeline of Recent Contributions */}
          <div className="p-5 rounded-2xl bg-[#0C101A] border border-cyan-500/20 space-y-3 font-mono text-xs">
            <span className="text-gray-400 uppercase tracking-wider font-semibold block">
              Recent Merged Contributions
            </span>

            <div className="space-y-2">
              {portfolio.recentContributions.map((c) => (
                <div key={c.prNumber} className="p-3 rounded-xl bg-[#141A28] border border-cyan-500/10 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#00F0FF] font-semibold">{c.repo}</span>
                    <span className="text-gray-500">{c.mergedAt}</span>
                  </div>
                  <div className="text-white font-medium">{c.title}</div>
                  <div className="text-[11px] text-gray-400 font-sans">{c.impact}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
