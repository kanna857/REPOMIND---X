'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ISSUES_DATA, IssueItem } from '../../lib/data';
import {
  Search,
  Sparkles,
  Shuffle,
  Filter,
  CheckCircle2,
  Clock,
  Award,
  AlertTriangle,
  Compass,
  ArrowRight,
  ShieldCheck,
  Star,
  GitBranch,
} from 'lucide-react';

export default function DiscoverPage() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [semanticMatch, setSemanticMatch] = useState(true);
  const [unclaimedOnly, setUnclaimedOnly] = useState(false);
  const [beginnerFriendlyOnly, setBeginnerFriendlyOnly] = useState(false);

  const languages = ['All', 'Python', 'TypeScript', 'JavaScript', 'Rust'];
  const difficulties = ['All', 'Beginner', 'Easy', 'Intermediate'];

  const filteredIssues = ISSUES_DATA.filter((issue) => {
    if (selectedLanguage !== 'All' && !issue.language.toLowerCase().includes(selectedLanguage.toLowerCase())) {
      return false;
    }
    if (selectedDifficulty !== 'All' && issue.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
      return false;
    }
    if (unclaimedOnly && issue.claimStatus !== 'Available') {
      return false;
    }
    if (beginnerFriendlyOnly && !['Beginner', 'Easy'].includes(issue.difficulty)) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        issue.title.toLowerCase().includes(q) ||
        issue.repository.toLowerCase().includes(q) ||
        issue.labels.some((l) => l.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const handleSurpriseMe = () => {
    const available = ISSUES_DATA.filter((i) => i.claimStatus === 'Available');
    const random = available[Math.floor(Math.random() * available.length)];
    if (random) {
      router.push(`/issues/${random.id}`);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Laboratory Command Horizon Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0C101A] border border-cyan-500/20 shadow-2xl relative overflow-hidden space-y-6">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#00F0FF]/10 blur-[100px] pointer-events-none"></div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] shadow-[0_0_12px_#00f0ff] animate-ping"></span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00F0FF] font-semibold">
              LABORATORY SECTOR // MATRIX 04
            </span>
            <span className="text-gray-600 font-mono">/</span>
            <span className="font-mono text-xs text-gray-400">SYNAPTIC DISCOVERY CORE</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-gray-400">
            <span className="flex items-center gap-1.5 text-green-300">
              <span className="w-2 h-2 rounded-full bg-[#00FFA3]"></span>
              Scanned: 14,892 repos
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#171b26] text-[#00FFA3] border border-green-500/30">
              RADAR LOCK: LIVE
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-2">
            <h1 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white tracking-tight flex flex-wrap items-center gap-3">
              DISCOVERY LABORATORY
              <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-[#171b26] text-[#00F0FF] font-normal border border-cyan-500/25">
                AI RECON MATRIX
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 max-w-2xl leading-relaxed">
              Deep telemetry ingestion across GitHub open-source clusters. Neural semantic filtering identifies unblocked, claim-verified, high-yield issues tuned to your developer fingerprint.
            </p>
          </div>

          {/* Dev Match Dial Badge */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#141A28] border border-cyan-500/20 shrink-0">
            <div className="text-center font-mono">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block">DEV RECEPTOR</span>
              <span className="font-['Space_Grotesk'] text-2xl font-bold text-[#00FFA3]">96.4%</span>
            </div>
            <div className="h-8 w-[1px] bg-gray-700"></div>
            <div className="text-[11px] text-[#00F0FF] font-mono leading-tight">
              Calibrated for<br />Python & TypeScript
            </div>
          </div>
        </div>

        {/* Futuristic Search & Action Bar */}
        <div className="p-2 rounded-xl bg-[#141A28] border border-cyan-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
            <div className="flex items-center gap-2.5 px-3 py-2 flex-1">
              <Search className="w-5 h-5 text-[#00F0FF] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search repositories, issues, stack vectors, or paste issue URL (e.g. org/repo#123)..."
                className="w-full bg-transparent font-mono text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="font-mono text-xs text-gray-400 hover:text-white px-2 py-0.5 rounded bg-[#1b1f2a]"
                >
                  CLEAR
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Semantic Match NLP Switch */}
              <button
                onClick={() => setSemanticMatch(!semanticMatch)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-mono text-xs transition-colors ${
                  semanticMatch
                    ? 'bg-[#1b1f2a] text-[#00F0FF] border border-cyan-500/30'
                    : 'bg-[#1b1f2a]/50 text-gray-400 border border-transparent'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#A855F7]" />
                <span className="hidden sm:inline">SEMANTIC</span>
                <span className={`w-2 h-2 rounded-full ${semanticMatch ? 'bg-[#00f89e]' : 'bg-gray-600'}`}></span>
              </button>

              {/* Surprise Me CTA */}
              <button
                onClick={handleSurpriseMe}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#A855F7] hover:bg-[#8A2BE2] text-white font-['Space_Grotesk'] text-xs font-bold tracking-wider shadow-[0_0_16px_rgba(168,85,247,0.35)] transition-all"
              >
                <Shuffle className="w-4 h-4" />
                <span>SURPRISE ME</span>
              </button>
            </div>
          </div>

          {/* Quick Neural Weight Checkboxes */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2 mt-1 rounded-lg bg-[#080E1C] font-mono text-xs text-gray-400">
            <span className="text-gray-500 text-[10px] uppercase">Neural Weights:</span>
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
              <input
                type="checkbox"
                checked={beginnerFriendlyOnly}
                onChange={(e) => setBeginnerFriendlyOnly(e.target.checked)}
                className="rounded accent-[#00F0FF]"
              />
              <span>Beginner Friendly (First PR)</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
              <input
                type="checkbox"
                checked={unclaimedOnly}
                onChange={(e) => setUnclaimedOnly(e.target.checked)}
                className="rounded accent-[#00F0FF]"
              />
              <span>Strict Unclaimed Filter</span>
            </label>
            <div className="flex items-center gap-1 text-[#00FFA3]">
              <Clock className="w-3.5 h-3.5" />
              <span>Fast Response (&lt; 12h)</span>
            </div>
          </div>
        </div>

        {/* Filters bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-cyan-500/15">
          {/* Language filter pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-mono text-xs text-gray-500 mr-1">STACK:</span>
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-3 py-1 rounded-lg font-mono text-xs transition-colors ${
                  selectedLanguage === lang
                    ? 'bg-[#00F0FF] text-[#00363a] font-bold shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                    : 'bg-[#141A28] text-gray-400 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Difficulty filter pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-mono text-xs text-gray-500 mr-1">LEVEL:</span>
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1 rounded-lg font-mono text-xs transition-colors ${
                  selectedDifficulty === diff
                    ? 'bg-[#A855F7] text-white font-bold shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                    : 'bg-[#141A28] text-gray-400 hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Issues Grid List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between font-mono text-xs text-gray-400 px-2">
          <span>MATCHED RECON TARGETS: {filteredIssues.length} ISSUES</span>
          <span>SORTED BY AI RECEPTOR SCORE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredIssues.map((issue) => (
            <div
              key={issue.id}
              className="p-5 rounded-2xl bg-[#0C101A] border border-cyan-500/20 hover:border-cyan-500/50 hover:bg-[#141A28] transition-all flex flex-col justify-between group shadow-lg"
            >
              <div className="space-y-3">
                {/* Card Header: Repo + Match Score */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-[#00F0FF]" />
                    <span className="font-mono text-xs text-[#00F0FF] font-semibold">{issue.repository}</span>
                    <span className="text-gray-600 font-mono text-xs">#{issue.number}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2 py-0.5 rounded bg-[#171b26] border border-green-500/30 text-[#00FFA3] font-mono text-[11px] font-bold">
                      {issue.matchScore}% MATCH
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-['Space_Grotesk'] text-base font-bold text-white group-hover:text-[#00F0FF] transition-colors leading-snug">
                  {issue.title}
                </h3>

                {/* Body snippet */}
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {issue.body}
                </p>

                {/* Labels */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {issue.labels.map((l) => (
                    <span
                      key={l}
                      className="px-2 py-0.5 rounded bg-[#171b26] text-gray-300 font-mono text-[10px] border border-cyan-500/10"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Metadata + Actions */}
              <div className="pt-4 mt-4 border-t border-cyan-500/15 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 font-mono text-[11px] text-gray-400">
                  <span className="text-[#00f89e] font-semibold">{issue.difficulty}</span>
                  <span>•</span>
                  <span>{issue.estimatedHours}</span>
                  <span>•</span>
                  <span className={issue.claimStatus === 'Available' ? 'text-[#00FFA3]' : 'text-[#FFB800]'}>
                    {issue.claimStatus}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/issues/${issue.id}`}
                    className="px-3.5 py-1.5 rounded-lg bg-[#00F0FF]/15 hover:bg-[#00F0FF] text-[#00F0FF] hover:text-[#00363a] font-['Space_Grotesk'] text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    <span>RECON ISSUE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
