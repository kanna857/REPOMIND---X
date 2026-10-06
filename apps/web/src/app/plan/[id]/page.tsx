'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ISSUES_DATA } from '../../../lib/data';
import {
  Rocket,
  CheckSquare,
  Square,
  Copy,
  Check,
  Terminal,
  Layers,
  ArrowRight,
  GitBranch,
  Clock,
  Sparkles,
  GitCommit,
  ShieldCheck,
} from 'lucide-react';

export default function MissionPlanPage() {
  const params = useParams();
  const issueId = (params?.id as string) || '1';
  const issue = ISSUES_DATA.find((i) => i.id === issueId) || ISSUES_DATA[0];

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2]);

  const mission = {
    number: `MISSION #${issue.number}`,
    objective: `Resolve "${issue.title}" with zero deadlock and robust retry backoff.`,
    branchSuggestion: `fix/token-timeout-backoff`,
    commitMessage: `fix(worker): implement exponential backoff on HTTP 429`,
    steps: [
      { id: 1, title: 'Fork & clone upstream repository', cmd: `git clone https://github.com/${issue.repository}.git` },
      { id: 2, title: 'Create isolated feature branch', cmd: `git checkout -b fix/token-timeout-backoff` },
      { id: 3, title: 'Install development dependencies', cmd: `npm install # or pip install -r requirements-dev.txt` },
      { id: 4, title: 'Inspect failing test & reproduce', cmd: `npm test -- -t "token refresh worker"` },
      { id: 5, title: 'Apply exponential backoff logic', desc: 'Add jittered retry loop handling HTTP 429 Retry-After headers in worker.py' },
      { id: 6, title: 'Execute test suite for regression checks', cmd: `npm test` },
      { id: 7, title: 'Verify linting and code style rules', cmd: `npm run lint` },
      { id: 8, title: 'Commit with semantic convention', cmd: `git commit -m "fix(worker): implement exponential backoff on HTTP 429"` },
      { id: 9, title: 'Push branch and launch PR Reviewer', cmd: `git push origin fix/token-timeout-backoff` },
    ],
  };

  const toggleStep = (id: number) => {
    setCompletedSteps((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const progressPct = Math.round((completedSteps.length / mission.steps.length) * 100);

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-[#0C101A] border border-cyan-500/25 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping"></span>
            <span className="text-[#00F0FF] font-bold uppercase tracking-widest">{mission.number}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-300">{issue.repository}</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-gray-400">Progress:</span>
            <span className="text-[#00FFA3] font-bold">{progressPct}% Complete</span>
          </div>
        </div>

        <div>
          <h1 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Contribution Mission Plan
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            {mission.objective}
          </p>
        </div>

        {/* Progress bar */}
        <div className="h-2 rounded-full bg-[#1b1f2a] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00F0FF] to-[#00FFA3] transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          ></div>
        </div>
      </div>

      {/* Grid: Steps Checklist (7 Cols) + Git Branch & Commands Box (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Steps Checklist */}
        <div className="lg:col-span-7 space-y-3">
          <div className="p-5 rounded-2xl bg-[#0C101A] border border-cyan-500/20 shadow-lg space-y-3">
            <span className="font-mono text-xs text-gray-300 uppercase tracking-wider font-semibold block">
              Mission Checklist // Step-by-Step
            </span>

            <div className="space-y-2">
              {mission.steps.map((step) => {
                const isDone = completedSteps.includes(step.id);
                return (
                  <div
                    key={step.id}
                    onClick={() => toggleStep(step.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                      isDone
                        ? 'bg-[#141A28]/50 border-green-500/20 text-gray-400'
                        : 'bg-[#141A28] border-cyan-500/20 text-white hover:border-cyan-500/50'
                    }`}
                  >
                    <button className="mt-0.5 text-cyan-400">
                      {isDone ? (
                        <CheckSquare className="w-4 h-4 text-[#00FFA3]" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-500" />
                      )}
                    </button>

                    <div className="flex-1 space-y-1">
                      <div className="text-xs font-medium flex items-center justify-between">
                        <span className={isDone ? 'line-through text-gray-500' : 'text-white'}>
                          {step.id}. {step.title}
                        </span>
                      </div>

                      {step.cmd && (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(step.cmd, step.id);
                          }}
                          className="font-mono text-[11px] bg-[#080E1C] p-2 rounded-lg border border-cyan-500/10 flex items-center justify-between text-[#00F0FF] group"
                        >
                          <span className="truncate">{step.cmd}</span>
                          <span className="text-gray-500 group-hover:text-white shrink-0 ml-2">
                            {copiedIndex === step.id ? <Check className="w-3.5 h-3.5 text-[#00FFA3]" /> : <Copy className="w-3.5 h-3.5" />}
                          </span>
                        </div>
                      )}

                      {step.desc && (
                        <div className="text-[11px] text-gray-400">
                          {step.desc}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Git Branch & Terminal Sandbox Shortcuts */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-[#0C101A] border border-cyan-500/20 shadow-lg space-y-4 font-mono text-xs">
            <span className="text-gray-300 uppercase tracking-wider font-semibold block">
              Git Protocol Recommendations
            </span>

            <div className="space-y-1">
              <span className="text-gray-500 text-[10px]">BRANCH TARGET:</span>
              <div className="p-2.5 rounded-xl bg-[#141A28] border border-cyan-500/20 text-[#00F0FF] flex items-center justify-between">
                <span>{mission.branchSuggestion}</span>
                <button
                  onClick={() => copyToClipboard(mission.branchSuggestion, 99)}
                  className="text-gray-400 hover:text-white"
                >
                  {copiedIndex === 99 ? <Check className="w-3.5 h-3.5 text-[#00FFA3]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-gray-500 text-[10px]">CONVENTIONAL COMMIT:</span>
              <div className="p-2.5 rounded-xl bg-[#141A28] border border-cyan-500/20 text-[#00FFA3] flex items-center justify-between">
                <span className="break-all">{mission.commitMessage}</span>
                <button
                  onClick={() => copyToClipboard(mission.commitMessage, 100)}
                  className="text-gray-400 hover:text-white ml-2"
                >
                  {copiedIndex === 100 ? <Check className="w-3.5 h-3.5 text-[#00FFA3]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Nav to Code Context & Terminal */}
          <div className="space-y-2">
            <Link
              href={`/code-context/${issue.id}`}
              className="w-full p-3.5 rounded-xl bg-[#141A28] hover:bg-[#1b1f2a] border border-cyan-500/20 text-white font-mono text-xs flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#A855F7]" />
                <span>Open in Visual Code Context Reader</span>
              </span>
              <ArrowRight className="w-4 h-4 text-gray-500" />
            </Link>

            <Link
              href="/terminal"
              className="w-full p-3.5 rounded-xl bg-[#141A28] hover:bg-[#1b1f2a] border border-cyan-500/20 text-white font-mono text-xs flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#00F0FF]" />
                <span>Open in Sandbox Terminal</span>
              </span>
              <ArrowRight className="w-4 h-4 text-gray-500" />
            </Link>

            <Link
              href="/review"
              className="w-full p-3.5 rounded-xl bg-[#00F0FF] text-[#00363a] font-['Space_Grotesk'] text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(0,240,255,0.4)] hover:brightness-110 transition-all"
            >
              <span>ADVANCE TO PR REVIEWER</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
