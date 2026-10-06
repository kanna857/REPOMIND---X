'use client';

import React, { useState } from 'react';
import {
  Compass,
  Layers,
  User,
  GitMerge,
  Rocket,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  CheckCircle2,
  Clock,
  ArrowRight,
  Cpu,
} from 'lucide-react';

interface AgentEventLog {
  id: string;
  time: string;
  agent: string;
  type: 'info' | 'success' | 'warn';
  message: string;
}

export default function AgentPage() {
  const [running, setRunning] = useState(false);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [logs, setLogs] = useState<AgentEventLog[]>([
    { id: '1', time: '10:04:12', agent: 'ORCHESTRATOR', type: 'info', message: 'Tri-agent kernel initialized. Awaiting dispatch signal.' },
  ]);

  const stages = [
    { id: 1, name: 'Finder Agent', role: 'Scans & Filters AST Targets', icon: Compass, color: '#00F0FF' },
    { id: 2, name: 'Planner Agent', role: 'Synthesizes Step-by-Step Mission', icon: Layers, color: '#A855F7' },
    { id: 3, name: 'YOU (Developer)', role: 'Executes Code Changes in Sandbox', icon: User, color: '#00FFA3' },
    { id: 4, name: 'Reviewer Agent', role: 'Calculates PR Readiness & Diff Checks', icon: GitMerge, color: '#FFB800' },
  ];

  const handleStartSwarm = () => {
    setRunning(true);
    setActiveStage(1);
    setLogs((prev) => [
      ...prev,
      { id: Date.now().toString(), time: new Date().toLocaleTimeString(), agent: 'FINDER', type: 'info', message: 'Initiating semantic vector search across open-telemetry/opentelemetry-python...' },
    ]);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        { id: Date.now().toString(), time: new Date().toLocaleTimeString(), agent: 'FINDER', type: 'success', message: 'Issue #184 validated. Zero claim conflict detected. Recommending target.' },
      ]);
      setActiveStage(2);
    }, 1200);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        { id: Date.now().toString(), time: new Date().toLocaleTimeString(), agent: 'PLANNER', type: 'info', message: 'Deconstructing issue AST into 6 granular implementation steps & git branch...' },
      ]);
      setActiveStage(3);
    }, 2400);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        { id: Date.now().toString(), time: new Date().toLocaleTimeString(), agent: 'ORCHESTRATOR', type: 'info', message: 'Handoff to Developer. Terminal sandbox ready for edits.' },
      ]);
    }, 3600);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        { id: Date.now().toString(), time: new Date().toLocaleTimeString(), agent: 'REVIEWER', type: 'success', message: 'Reviewer ready. Awaiting git diff for PR Readiness Scoring.' },
      ]);
      setActiveStage(4);
      setRunning(false);
    }, 4800);
  };

  const handleReset = () => {
    setActiveStage(0);
    setRunning(false);
    setLogs([
      { id: '1', time: new Date().toLocaleTimeString(), agent: 'ORCHESTRATOR', type: 'info', message: 'Reset swarm state. Ready for fresh dispatch.' },
    ]);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#0C101A] border border-cyan-500/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#00F0FF] mb-1">
            <Cpu className="w-4 h-4" />
            <span>TRI-AGENT SWARM ORCHESTRATION // LANGGRAPH PATTERN</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Autonomous Agent Fleet
          </h1>
          <p className="text-xs text-gray-400">
            Powered by NVIDIA Nemotron 70B via Nebius Token Factory. Orchestrates issue discovery, mission synthesis, and merge validation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleStartSwarm}
            disabled={running}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#00dbe9] text-[#00363a] font-['Space_Grotesk'] text-xs font-bold tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            <span>{running ? 'SWARM EXECUTING...' : 'DISPATCH AGENT SWARM'}</span>
          </button>
          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-[#141A28] border border-cyan-500/20 text-gray-400 hover:text-white transition-colors"
            title="Reset Swarm"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Visual Agent Pipeline Stages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((stage) => {
          const Icon = stage.icon;
          const isActive = activeStage >= stage.id;
          const isCurrent = activeStage === stage.id;

          return (
            <div
              key={stage.id}
              className={`p-5 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                isCurrent
                  ? 'bg-[#141A28] border-cyan-500 shadow-[0_0_25px_rgba(0,240,255,0.25)]'
                  : isActive
                  ? 'bg-[#0C101A] border-cyan-500/40'
                  : 'bg-[#0C101A]/60 border-cyan-500/10 opacity-70'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className="p-2.5 rounded-xl"
                    style={{ backgroundColor: `${stage.color}20`, color: stage.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs text-gray-500">STAGE 0{stage.id}</span>
                </div>

                <div>
                  <h3 className="font-['Space_Grotesk'] text-base font-bold text-white">
                    {stage.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    {stage.role}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-cyan-500/10 flex items-center justify-between font-mono text-[11px]">
                <span className="text-gray-500">STATUS:</span>
                <span
                  className="font-bold flex items-center gap-1.5"
                  style={{ color: isActive ? stage.color : '#6b7280' }}
                >
                  {isCurrent && <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: stage.color }}></span>}
                  {isCurrent ? 'ACTIVE' : isActive ? 'COMPLETED' : 'STANDBY'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Agent Live Telemetry Event Console */}
      <div className="p-5 rounded-2xl bg-[#080E1C] border border-cyan-500/25 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-cyan-500/15">
          <div className="flex items-center gap-2 font-mono text-xs text-[#00F0FF]">
            <Terminal className="w-4 h-4" />
            <span className="font-bold">AGENT FLEET TELEMETRY FEED</span>
          </div>
          <span className="font-mono text-[11px] text-gray-500">LOG REPOSITORY // LIVE</span>
        </div>

        <div className="font-mono text-xs space-y-2 max-h-72 overflow-y-auto pr-2">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-3 p-2 rounded-lg bg-[#0C101A] border border-cyan-500/10 text-gray-300"
            >
              <span className="text-gray-500 shrink-0">[{log.time}]</span>
              <span
                className={`font-bold shrink-0 ${
                  log.agent === 'FINDER'
                    ? 'text-[#00F0FF]'
                    : log.agent === 'PLANNER'
                    ? 'text-[#A855F7]'
                    : log.agent === 'REVIEWER'
                    ? 'text-[#FFB800]'
                    : 'text-[#00FFA3]'
                }`}
              >
                {log.agent}:
              </span>
              <span className="text-gray-300 flex-1">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
