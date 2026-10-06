'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Terminal,
  Bot,
  GitMerge,
  Network,
  Bookmark,
  TrendingUp,
  Scale,
  Users,
  Compass,
  Settings,
  ShieldCheck,
  Activity,
  Layers,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();

  const mainNav = [
    { label: 'Live Stream', href: '/dashboard', icon: Terminal, badge: 'LIVE', badgeColor: 'text-[#00F0FF]' },
    { label: 'Agent Fleet', href: '/agent', icon: Bot, badge: '14 ACT', badgeColor: 'text-[#00f89e]' },
    { label: 'Triage Matrix', href: '/review', icon: GitMerge, badge: 'READY', badgeColor: 'text-[#ddb7ff]' },
    { label: '3D Galaxy Graph', href: '/', icon: Network, badge: 'NODE V4', badgeColor: 'text-[#00dbe9]' },
    { label: 'Issue Recon', href: '/discover', icon: Compass },
    { label: 'Terminal Sandbox', href: '/terminal', icon: Layers },
    { label: 'Learning Path', href: '/learning', icon: BookOpen },
    { label: 'Watchlist', href: '/watchlist', icon: Bookmark },
    { label: 'Trending Vectors', href: '/trending', icon: TrendingUp },
    { label: 'Repo Compare', href: '/compare', icon: Scale },
    { label: 'Community Hub', href: '/community', icon: Users },
    { label: 'Cockpit Config', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-[#0a0e18]/95 backdrop-blur-2xl border-r border-cyan-500/15 z-40 flex flex-col justify-between p-3.5 hidden lg:flex">
      <div className="space-y-4 overflow-y-auto pr-1">
        {/* Active Synapse Metric */}
        <div className="p-3 rounded-xl bg-[#171b26]/70 border border-cyan-500/20 shadow-inner">
          <div className="flex items-center justify-between font-mono text-[10px] text-gray-400 mb-1.5">
            <span className="tracking-wider">ACTIVE SYNAPSE</span>
            <span className="text-[#00f89e] font-semibold">AGENT CLUSTER #9</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 flex-1 rounded bg-[#313540] overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-[#00F0FF] to-[#A855F7] animate-pulse"></div>
            </div>
            <span className="font-mono text-xs text-[#00F0FF] font-bold">75% LOAD</span>
          </div>
        </div>

        {/* Navigation list */}
        <div className="space-y-1">
          <span className="px-2 font-mono text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
            Telemetry Rails
          </span>
          <nav className="space-y-0.5 mt-1">
            {mainNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg font-mono text-xs transition-all ${
                    isActive
                      ? 'bg-[#1b1f2a] text-[#00F0FF] font-semibold border-l-2 border-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.15)]'
                      : 'text-gray-400 hover:text-gray-100 hover:bg-[#171b26]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#00F0FF]' : 'text-gray-500'}`} />
                    <span>{item.label}</span>
                  </span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded bg-[#0a0e18] border border-cyan-500/20 ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Node Kernel Status Footer */}
      <div className="p-3 rounded-xl bg-[#171b26]/70 border border-cyan-500/15 space-y-1">
        <div className="flex items-center justify-between font-mono text-[11px] text-gray-300">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00f89e] animate-ping"></span>
            NODE KERNEL
          </span>
          <span className="text-[#00F0FF] font-bold">STABLE</span>
        </div>
        <div className="text-[11px] text-gray-500">
          NVIDIA Nemotron 70B • Latency: 12ms
        </div>
      </div>
    </aside>
  );
}
