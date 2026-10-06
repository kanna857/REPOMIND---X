'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Github, Shield, Sparkles, CheckCircle2, ArrowRight, Key, Cpu } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 600);
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  };

  return (
    <div className="max-w-md mx-auto my-12 p-8 rounded-2xl bg-[#0C101A] border border-cyan-500/25 shadow-[0_16px_48px_rgba(0,0,0,0.8)] relative overflow-hidden space-y-6">
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#00F0FF]/15 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-[#141A28] border border-cyan-500/30 text-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.25)]">
          <Github className="w-8 h-8" />
        </div>
        <h1 className="font-['Space_Grotesk'] text-2xl font-bold text-white tracking-tight">
          AUTHENTICATE COCKPIT
        </h1>
        <p className="text-xs text-gray-400">
          Connect your GitHub profile to unlock tailored issue matching and PR assistance.
        </p>
      </div>

      {/* Primary 1-Click Demo Login */}
      <div className="space-y-3">
        <button
          onClick={handleDemoLogin}
          disabled={loading}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#00dbe9] text-[#00363a] font-['Space_Grotesk'] text-sm font-bold tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(0,240,255,0.35)] flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center gap-2 font-mono text-xs">
              <span className="w-3 h-3 rounded-full border-2 border-[#00363a] border-t-transparent animate-spin"></span>
              INITIALIZING SYNAPSE...
            </span>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>CONTINUE WITH DEMO PROFILE (@octo-cadet)</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-2 text-center text-gray-600 font-mono text-[10px] uppercase my-2">
          <div className="h-[1px] flex-1 bg-gray-800"></div>
          <span>OR PROVIDE PERSONAL ACCESS TOKEN</span>
          <div className="h-[1px] flex-1 bg-gray-800"></div>
        </div>

        {/* GitHub Token / OAuth Form */}
        <form onSubmit={handleTokenSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="font-mono text-[11px] text-gray-400 flex items-center gap-1.5">
              <Key className="w-3 h-3 text-[#00F0FF]" />
              GITHUB_TOKEN (Optional)
            </label>
            <input
              type="password"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#080E1C] border border-cyan-500/20 text-white font-mono text-xs placeholder-gray-600 focus:outline-none focus:border-[#00F0FF]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-[#141A28] hover:bg-[#1b1f2a] border border-cyan-500/20 text-white font-mono text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-[#00FFA3]" />
            <span>Connect Custom Token</span>
          </button>
        </form>
      </div>

      {/* Security notice */}
      <div className="p-3 rounded-xl bg-[#080E1C] border border-cyan-500/10 flex items-start gap-2.5 font-mono text-[11px] text-gray-400">
        <CheckCircle2 className="w-4 h-4 text-[#00f89e] shrink-0 mt-0.5" />
        <div>
          <span className="text-gray-300 font-semibold">Zero Server Exposure:</span> OAuth secrets and tokens remain encrypted on the server environment. Rate limits automatically handled.
        </div>
      </div>
    </div>
  );
}
