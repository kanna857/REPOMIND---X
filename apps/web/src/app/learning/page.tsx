'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  ArrowRight,
  GitBranch,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export default function LearningPage() {
  const learningModules = [
    { id: 1, title: 'Git & Branching Fundamentals', status: 'Completed', progress: 100, xp: '+100 XP' },
    { id: 2, title: 'Triage & Claim Verification', status: 'Completed', progress: 100, xp: '+120 XP' },
    { id: 3, title: 'Unit Testing & Mocking Async APIs', status: 'In Progress', progress: 80, xp: '+150 XP' },
    { id: 4, title: 'Resolving Git Upstream Conflicts', status: 'In Progress', progress: 60, xp: '+180 XP' },
    { id: 5, title: 'Navigating Monorepos & Large ASTs', status: 'In Progress', progress: 40, xp: '+200 XP' },
    { id: 6, title: 'Event Loops & Concurrency Defenses', status: 'Up Next', progress: 20, xp: '+250 XP' },
    { id: 7, title: 'Maintainer Etiquette & PR Reviews', status: 'Locked', progress: 0, xp: '+300 XP' },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#0C101A] border border-cyan-500/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#00F0FF] mb-1">
            <BookOpen className="w-4 h-4" />
            <span>ADAPTIVE SKILL PROGRESSION // GAME TREE</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Learning Path & Skill Tree
          </h1>
          <p className="text-xs text-gray-400">
            Systematic progression from your first pull request to open-source core maintainer.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-[#141A28] border border-cyan-500/20 font-mono text-xs text-white">
            Total Mastery: <span className="text-[#00FFA3] font-bold">64%</span>
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {learningModules.map((m) => (
          <div
            key={m.id}
            className="p-5 rounded-2xl bg-[#0C101A] border border-cyan-500/15 hover:border-cyan-500/40 hover:bg-[#141A28] transition-all space-y-3"
          >
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-gray-500">MODULE 0{m.id}</span>
              <span className="text-[#00FFA3] font-semibold">{m.xp}</span>
            </div>

            <div>
              <h3 className="font-['Space_Grotesk'] text-base font-bold text-white">
                {m.title}
              </h3>
              <div className="flex items-center justify-between font-mono text-[11px] text-gray-400 mt-2">
                <span>Status: {m.status}</span>
                <span>{m.progress}%</span>
              </div>
            </div>

            <div className="h-1.5 rounded-full bg-[#1b1f2a] overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  m.progress === 100
                    ? 'bg-[#00FFA3]'
                    : m.progress > 0
                    ? 'bg-gradient-to-r from-[#00F0FF] to-[#A855F7]'
                    : 'bg-gray-700'
                }`}
                style={{ width: `${m.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
