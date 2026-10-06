'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Terminal, Search, Bot, Compass, Award, GitMerge, Settings, BookOpen, Sparkles, X } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const commands = [
    { id: '1', title: 'Discover Issues & Good First PRs', path: '/discover', icon: Compass, shortcut: 'DISCOVER' },
    { id: '2', title: 'Dispatch Finder & Planner Swarm', path: '/agent', icon: Bot, shortcut: 'AGENT://DISPATCH' },
    { id: '3', title: 'Open PR Reviewer & Readiness Matrix', path: '/review', icon: GitMerge, shortcut: 'PR://REVIEW' },
    { id: '4', title: 'Generate Automated PR Description', path: '/pr-generator', icon: Sparkles, shortcut: 'PR://GEN' },
    { id: '5', title: 'Interactive Terminal & Test Sandbox', path: '/terminal', icon: Terminal, shortcut: 'TERM://RUN' },
    { id: '6', title: 'Open Developer Passport & Portfolio', path: '/portfolio', icon: Award, shortcut: 'DEV://PASSPORT' },
    { id: '7', title: 'Adaptive Learning Path & Skill Tree', path: '/learning', icon: BookOpen, shortcut: 'LEARN://TREE' },
    { id: '8', title: 'Configure Nebius AI & NVIDIA Nemotron', path: '/settings', icon: Settings, shortcut: 'SYS://CONFIG' },
  ];

  const filtered = commands.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.shortcut.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#05070D]/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#0C101A] border border-cyan-500/30 rounded-2xl shadow-[0_16px_60px_rgba(0,240,255,0.15)] overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-cyan-500/20 bg-[#141A28]/50">
          <Terminal className="w-5 h-5 text-[#00F0FF]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, query issues, or execute agent subroutine..."
            className="w-full bg-transparent font-mono text-sm text-[#00F0FF] placeholder-gray-500 focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command list */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-1">
          <div className="font-mono text-[10px] text-gray-500 px-3 py-1 uppercase tracking-widest">
            Available Subroutines
          </div>
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-400 font-mono">
              No subroutines matching "{query}"
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    router.push(item.path);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#141A28] border border-transparent hover:border-cyan-500/20 cursor-pointer text-sm text-gray-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#1b1f2a] group-hover:bg-[#00f0ff]/10 text-gray-400 group-hover:text-[#00F0FF] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{item.title}</span>
                  </div>
                  <span className="font-mono text-[11px] text-gray-500 group-hover:text-[#00F0FF] transition-colors">
                    {item.shortcut}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-2.5 bg-[#080E1C] border-t border-cyan-500/15 flex items-center justify-between font-mono text-[11px] text-gray-500">
          <span>Navigate with arrows • Press Enter to execute</span>
          <span className="text-[#00F0FF]">NVIDIA Nemotron 70B Active</span>
        </div>
      </div>
    </div>
  );
}
