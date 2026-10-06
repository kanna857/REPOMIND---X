'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  GitPullRequest,
  Sparkles,
  Compass,
  ArrowRight,
} from 'lucide-react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'New Good First Issue Radar Lock',
      message: 'Unassigned issue #184 matching your Python skills appeared in open-telemetry/opentelemetry-python.',
      time: '12m ago',
      type: 'radar',
      read: false,
      href: '/issues/1',
    },
    {
      id: '2',
      title: 'Maintainer Merged Your Contribution',
      message: 'Your PR #29510 in facebook/react was approved and merged cleanly into main!',
      time: '2h ago',
      type: 'merge',
      read: false,
      href: '/portfolio',
    },
    {
      id: '3',
      title: 'Potential Claim Collision Alert',
      message: 'Contributor @sam_contributor commented intent to claim on vercel/next.js #62044.',
      time: '1d ago',
      type: 'warning',
      read: true,
      href: '/issues/3',
    },
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#0C101A] border border-cyan-500/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#00F0FF] mb-1">
            <Bell className="w-4 h-4" />
            <span>TELEMETRY STREAM // REALTIME ALERTS</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Telemetry Notifications
          </h1>
          <p className="text-xs text-gray-400">
            Realtime signal notifications on issue triage, maintainer merges, and radar watchlist updates.
          </p>
        </div>

        <button
          onClick={markAllAsRead}
          className="px-4 py-2 rounded-xl bg-[#141A28] border border-cyan-500/20 text-gray-300 hover:text-white font-mono text-xs transition-colors"
        >
          Mark All Read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 block ${
              item.read
                ? 'bg-[#0C101A]/60 border-cyan-500/10 hover:bg-[#141A28]'
                : 'bg-[#141A28] border-cyan-500/30 shadow-md hover:border-cyan-500/60'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-xl bg-[#1b1f2a] text-[#00F0FF] mt-0.5">
                {item.type === 'merge' ? (
                  <CheckCircle2 className="w-4 h-4 text-[#00FFA3]" />
                ) : item.type === 'warning' ? (
                  <AlertTriangle className="w-4 h-4 text-[#FFB800]" />
                ) : (
                  <Compass className="w-4 h-4 text-[#00F0FF]" />
                )}
              </div>
              <div className="space-y-1">
                <div className="font-['Space_Grotesk'] text-sm font-bold text-white flex items-center gap-2">
                  <span>{item.title}</span>
                  {!item.read && <span className="w-2 h-2 rounded-full bg-[#00F0FF]"></span>}
                </div>
                <p className="text-xs text-gray-400 font-sans leading-relaxed">
                  {item.message}
                </p>
              </div>
            </div>

            <div className="font-mono text-[10px] text-gray-500 shrink-0">
              {item.time}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
