'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  Plus,
  Trash2,
  Bell,
  Star,
  GitBranch,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([
    { id: '1', repo: 'open-telemetry/opentelemetry-python', stars: '1.8k', unassigned: 14, alertType: 'All Good First Issues' },
    { id: '2', repo: 'facebook/react', stars: '228k', unassigned: 42, alertType: 'Beginner & Documentation' },
    { id: '3', repo: 'vercel/next.js', stars: '125k', unassigned: 88, alertType: 'Fast Triage (< 12h)' },
    { id: '4', repo: 'fastapi/fastapi', stars: '76k', unassigned: 9, alertType: 'Pydantic & Routing' },
  ]);

  const removeRepo = (id: string) => {
    setWatchlist((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="p-6 rounded-2xl bg-[#0C101A] border border-cyan-500/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#00F0FF] mb-1">
            <Bookmark className="w-4 h-4" />
            <span>RADAR WATCHLIST // REPO RADAR ALERTS</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Repository Watchlist
          </h1>
          <p className="text-xs text-gray-400">
            Subscribe to instant alerts when unassigned good first issues appear in your favorite repos.
          </p>
        </div>

        <Link
          href="/discover"
          className="px-4 py-2.5 rounded-xl bg-[#00F0FF] text-[#00363a] font-['Space_Grotesk'] text-xs font-bold flex items-center gap-2 shadow-[0_0_16px_rgba(0,240,255,0.4)] hover:brightness-110 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>ADD TARGET REPOSITORY</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {watchlist.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-[#0C101A] border border-cyan-500/15 hover:border-cyan-500/40 hover:bg-[#141A28] transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-[#00F0FF] font-semibold">
                  <GitBranch className="w-4 h-4" />
                  <span>{item.repo}</span>
                </div>
                <button
                  onClick={() => removeRepo(item.id)}
                  className="text-gray-500 hover:text-red-400 transition-colors p-1"
                  title="Remove from Watchlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-xs text-gray-400">
                <div className="p-2 rounded-lg bg-[#141A28]">
                  <span className="text-[10px] text-gray-500 block">UNASSIGNED ISSUES</span>
                  <span className="text-[#00FFA3] font-bold text-base">{item.unassigned}</span>
                </div>
                <div className="p-2 rounded-lg bg-[#141A28]">
                  <span className="text-[10px] text-gray-500 block">GITHUB STARS</span>
                  <span className="text-white font-bold text-base">{item.stars}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-purple-300">
                <Bell className="w-3.5 h-3.5" />
                <span>{item.alertType}</span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-cyan-500/10 flex items-center justify-between">
              <span className="font-mono text-[11px] text-[#00FFA3]">RADAR ACTIVE</span>
              <Link
                href="/discover"
                className="font-mono text-xs text-[#00F0FF] hover:underline flex items-center gap-1"
              >
                Inspect Issues <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
