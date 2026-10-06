'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal, Bell, Sparkles, Activity, ShieldCheck, Compass, GitPullRequest, Award, Cpu } from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const pathname = usePathname();

  const navLinks = [
    { label: '3D Galaxy', href: '/' },
    { label: 'Command Core', href: '/dashboard' },
    { label: 'Discover Issues', href: '/discover' },
    { label: 'AI Multi-Agent', href: '/agent' },
    { label: 'Mission Plan', href: '/plan/1' },
    { label: 'Code Context', href: '/code-context/1' },
    { label: 'Terminal', href: '/terminal' },
    { label: 'PR Review', href: '/review' },
    { label: 'PR Generator', href: '/pr-generator' },
    { label: 'Dev Passport', href: '/portfolio' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e18]/85 backdrop-blur-xl border-b border-cyan-500/15 shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
      <div className="h-16 w-full px-4 lg:px-6 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00F0FF] via-[#00dbe9] to-[#A855F7] p-0.5 shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.7)] transition-all">
              <div className="w-full h-full bg-[#05070D] rounded-[6px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#00F0FF]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-['Space_Grotesk'] text-lg tracking-wider text-cyan-200 font-bold group-hover:text-[#00F0FF] transition-colors">
                REPOMIND <span className="text-[#00F0FF]">// X</span>
              </span>
              <span className="font-mono text-[10px] text-gray-400 tracking-widest -mt-1">
                v4.8.2 COCKPIT
              </span>
            </div>
          </Link>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1b1f2a] border border-cyan-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f89e] animate-pulse"></span>
            <span className="font-mono text-[10px] text-[#00f89e] uppercase font-semibold">SYS: ONLINE</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden 2xl:flex items-center gap-1 p-1 rounded-full bg-[#171b26]/80 border border-cyan-500/15 shadow-inner">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1 rounded-full text-xs transition-all ${
                  isActive
                    ? 'bg-[#00f0ff] text-[#00363a] font-semibold shadow-[0_0_14px_rgba(0,240,255,0.35)]'
                    : 'text-gray-300 hover:text-white hover:bg-[#262a35]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & Telemetry */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Quick Command Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#171b26] border border-cyan-500/20 hover:border-[#00F0FF]/60 text-gray-300 hover:text-[#00F0FF] transition-all shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="font-mono text-xs hidden md:inline text-gray-400">Prompt / Recon</span>
            <span className="px-1.5 py-0.5 rounded bg-[#262a35] border border-cyan-500/30 font-mono text-[10px] text-[#00F0FF]">
              ⌘K
            </span>
          </button>

          {/* Telemetry Chips */}
          <div className="hidden xl:flex items-center gap-3 px-3 py-1 rounded-lg bg-[#171b26] border border-cyan-500/15 font-mono text-[11px]">
            <div className="flex items-center gap-1 text-gray-400">
              LATENCY: <span className="text-[#00f89e] font-bold">12MS</span>
            </div>
            <div className="h-3 w-[1px] bg-gray-700"></div>
            <div className="flex items-center gap-1 text-gray-400">
              TARGET: <span className="text-[#00F0FF] font-bold">4 PRS</span>
            </div>
          </div>

          {/* Notification Alert Bell */}
          <Link
            href="/notifications"
            className="relative p-2 rounded-lg text-gray-300 hover:text-white hover:bg-[#262a35] transition-colors"
            title="Telemetry Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#f0dbff] ring-2 ring-[#0a0e18] animate-pulse"></span>
          </Link>

          {/* User Profile Emblem */}
          <Link
            href="/portfolio"
            className="relative p-0.5 rounded-full bg-gradient-to-r from-[#00f0ff] via-[#00dbe9] to-[#6f00be] shadow-[0_0_12px_rgba(0,240,255,0.3)] hover:scale-105 transition-transform"
          >
            <div className="w-7 h-7 rounded-full bg-[#0a0e18] flex items-center justify-center font-mono text-xs font-bold text-[#00F0FF]">
              RM
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
