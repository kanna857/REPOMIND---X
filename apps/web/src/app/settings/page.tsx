'use client';

import React, { useState } from 'react';
import {
  Settings,
  Sparkles,
  Key,
  ShieldCheck,
  Check,
  Cpu,
  Save,
  Globe,
  Bell,
} from 'lucide-react';

export default function SettingsPage() {
  const [provider, setProvider] = useState('nebius');
  const [model, setModel] = useState('nvidia/llama-3.1-nemotron-70b-instruct');
  const [apiKey, setApiKey] = useState('');
  const [baseUrl, setBaseUrl] = useState('https://api.studio.nebius.ai/v1');
  const [demoMode, setDemoMode] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl space-y-6 pb-16">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#0C101A] border border-cyan-500/20 shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#00F0FF] mb-1">
            <Settings className="w-4 h-4" />
            <span>COCKPIT CONFIGURATION // SYSTEM TELEMETRY</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
            System Settings
          </h1>
          <p className="text-xs text-gray-400">
            Configure NVIDIA Nemotron integration, Nebius Token Factory credentials, and demo runtime preferences.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 text-[#00FFA3] font-mono text-xs border border-green-500/30">
            <Check className="w-4 h-4" />
            <span>SAVED</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Nebius & NVIDIA AI Provider Configuration */}
        <div className="p-6 rounded-2xl bg-[#0C101A] border border-cyan-500/20 shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-cyan-500/15 font-mono text-xs text-[#A855F7]">
            <Sparkles className="w-4 h-4" />
            <span className="font-bold">NVIDIA NEMOTRON // NEBIUS TOKEN FACTORY</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="space-y-1">
              <label className="text-gray-400">AI PROVIDER:</label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#141A28] border border-cyan-500/20 text-white focus:outline-none"
              >
                <option value="nebius">Nebius Token Factory (Recommended)</option>
                <option value="openai">OpenAI Compatible Endpoint</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-gray-400">AI MODEL TARGET:</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#141A28] border border-cyan-500/20 text-[#00F0FF] focus:outline-none"
              />
              <span className="text-[10px] text-gray-500">
                Default: nvidia/llama-3.1-nemotron-70b-instruct
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-gray-400">NEBIUS_API_KEY:</label>
              <input
                type="password"
                placeholder="neb_xxxxxxxxxxxxxxxxxxxxxxxx"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#141A28] border border-cyan-500/20 text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-400">API BASE URL:</label>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#141A28] border border-cyan-500/20 text-gray-300 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Deterministic Demo Mode Switch */}
        <div className="p-6 rounded-2xl bg-[#0C101A] border border-cyan-500/20 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <div className="font-['Space_Grotesk'] text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#00FFA3]" />
              <span>Deterministic Demo Mode</span>
            </div>
            <p className="text-xs text-gray-400 max-w-md font-sans">
              Ensures judges can test every feature immediately without getting blocked by missing credentials or API outages.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setDemoMode(!demoMode)}
            className={`w-14 h-8 rounded-full p-1 transition-colors ${
              demoMode ? 'bg-[#00F0FF]' : 'bg-gray-700'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full bg-[#05070D] transition-transform ${
                demoMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></div>
          </button>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#00dbe9] text-[#00363a] font-['Space_Grotesk'] text-xs font-bold tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>SAVE CONFIGURATION</span>
          </button>
        </div>
      </form>
    </div>
  );
}
