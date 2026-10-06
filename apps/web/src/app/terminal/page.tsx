'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { requestAI } from '../../lib/ai';
import {
  Terminal as TerminalIcon,
  Play,
  RotateCcw,
  Sparkles,
  Bug,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export default function TerminalPage() {
  const [commandInput, setCommandInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'RepoMind-X Test Sandbox v4.8.2 [NVIDIA NEMOTRON HOST]',
    'Connected to isolated workspace: open-telemetry/opentelemetry-python',
    'Type a command or choose a preset test subroutine below.',
  ]);

  const [debugResult, setDebugResult] = useState<any>(null);
  const [debugging, setDebugging] = useState(false);

  const runCommand = (cmd: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setTerminalOutput((prev) => [...prev, `[${timestamp}] $ ${cmd}`]);

    if (cmd.includes('test')) {
      setTerminalOutput((prev) => [
        ...prev,
        'Running test suite...',
        'FAIL tests/test_worker.py::test_token_worker_handles_429_backoff',
        'TypeError: Cannot parse retry-after header value undefined. Received NaN in setTimeout.',
        '1 failed, 41 passed in 1.42s',
      ]);
    } else if (cmd.includes('lint')) {
      setTerminalOutput((prev) => [
        ...prev,
        'Running style and linter checks...',
        'Checked 14 source files.',
        '0 errors found. All checks PASSED.',
      ]);
    } else if (cmd.includes('status')) {
      setTerminalOutput((prev) => [
        ...prev,
        'On branch fix/token-timeout-backoff',
        'Changes not staged for commit:',
        '  modified:   src/core/worker.py',
        '  modified:   src/utils/retry.py',
      ]);
    } else if (cmd.includes('diff')) {
      setTerminalOutput((prev) => [
        ...prev,
        'diff --git a/src/core/worker.py b/src/core/worker.py',
        '+ if response.status_code == 429:',
        '+     retry_after = int(response.headers.get("retry-after", "2"))',
        '+     backoff = calculate_jittered_backoff(retries, ceiling=retry_after)',
      ]);
    } else {
      setTerminalOutput((prev) => [
        ...prev,
        `Executed: ${cmd}. Process exited with code 0.`,
      ]);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;
    runCommand(commandInput.trim());
    setCommandInput('');
  };

  const handleDebugWithAI = async () => {
    setDebugging(true);
    const lastError = terminalOutput.join('\n');
    try {
      const result = await requestAI('debug_error', { errorText: lastError });
      setDebugResult(result);
    } catch (e) {
      // Default fallback
      setDebugResult({
        rootCause: "Uncaught TypeError in async event handler caused by undefined response headers during HTTP 429 throttling.",
        likelyFile: "src/core/worker.py (line 34)",
        whyItHappened: "The handler assumed response.headers.get('retry-after') would always return a valid numeric string, but mock broker returned undefined.",
        suggestedFix: "Use optional chaining and fallback: `const retrySec = parseInt(response?.headers?.get('retry-after') ?? '2', 10);`",
        testToRun: "npm test -- -t 'handles undefined retry-after header'",
      });
    } finally {
      setDebugging(false);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#0C101A] border border-cyan-500/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#00F0FF] mb-1">
            <TerminalIcon className="w-4 h-4" />
            <span>SANDBOX COCKPIT // ISOLATED RUNTIME</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Terminal & Test Assistant
          </h1>
          <p className="text-xs text-gray-400">
            Simulate builds, test suites, and git operations safely with AI root-cause diagnostics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDebugWithAI}
            disabled={debugging}
            className="px-4 py-2.5 rounded-xl bg-[#A855F7] hover:bg-[#8A2BE2] text-white font-['Space_Grotesk'] text-xs font-bold tracking-wider shadow-[0_0_16px_rgba(168,85,247,0.35)] flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{debugging ? 'ANALYZING STACK TRACE...' : 'DEBUG WITH REPOMIND-X'}</span>
          </button>
        </div>
      </div>

      {/* Preset Subroutine Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs text-gray-500 mr-2">PRESETS:</span>
        <button
          onClick={() => runCommand('npm test')}
          className="px-3 py-1.5 rounded-lg bg-[#141A28] hover:bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 font-mono text-xs transition-colors"
        >
          npm test
        </button>
        <button
          onClick={() => runCommand('npm run lint')}
          className="px-3 py-1.5 rounded-lg bg-[#141A28] hover:bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 font-mono text-xs transition-colors"
        >
          npm run lint
        </button>
        <button
          onClick={() => runCommand('git status')}
          className="px-3 py-1.5 rounded-lg bg-[#141A28] hover:bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 font-mono text-xs transition-colors"
        >
          git status
        </button>
        <button
          onClick={() => runCommand('git diff')}
          className="px-3 py-1.5 rounded-lg bg-[#141A28] hover:bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 font-mono text-xs transition-colors"
        >
          git diff
        </button>
        <button
          onClick={() => setTerminalOutput(['Workspace reset. Terminal ready.'])}
          className="px-3 py-1.5 rounded-lg bg-[#141A28] hover:bg-red-500/10 border border-red-500/20 text-red-300 font-mono text-xs transition-colors ml-auto"
        >
          Clear Screen
        </button>
      </div>

      {/* Terminal Viewport */}
      <div className="rounded-2xl bg-[#05070D] border border-cyan-500/30 overflow-hidden shadow-2xl font-mono text-xs">
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0C101A] border-b border-cyan-500/20 text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
            <span className="ml-2 text-white">repomind-sandbox:~/workspace</span>
          </div>
          <span className="text-[11px] text-[#00FFA3]">BASH EMULATOR</span>
        </div>

        {/* Console output lines */}
        <div className="p-4 space-y-1.5 min-h-64 max-h-96 overflow-y-auto">
          {terminalOutput.map((line, idx) => (
            <div
              key={idx}
              className={`${
                line.includes('FAIL') || line.includes('TypeError')
                  ? 'text-red-400 font-bold'
                  : line.includes('$')
                  ? 'text-[#00F0FF]'
                  : line.includes('PASSED')
                  ? 'text-[#00FFA3]'
                  : 'text-gray-300'
              }`}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Command input prompt */}
        <form onSubmit={handleManualSubmit} className="flex items-center px-4 py-2.5 bg-[#080E1C] border-t border-cyan-500/20">
          <span className="text-[#00FFA3] mr-2 font-bold">&gt;</span>
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            placeholder="Type terminal command (e.g. pytest tests/)..."
            className="w-full bg-transparent text-white font-mono text-xs focus:outline-none placeholder-gray-600"
          />
          <button type="submit" className="text-gray-400 hover:text-white ml-2 text-xs">
            ↵
          </button>
        </form>
      </div>

      {/* AI Debug Assistant Diagnostic Result Panel */}
      {debugResult && (
        <div className="p-6 rounded-2xl bg-[#0C101A] border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)] space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-purple-500/20">
            <div className="flex items-center gap-2">
              <Bug className="w-5 h-5 text-[#A855F7]" />
              <span className="font-['Space_Grotesk'] text-base font-bold text-white">
                NVIDIA Nemotron // Root Cause Analysis
              </span>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#171b26] text-[#00FFA3] font-mono text-[10px]">
              AI CONFIDENCE: 98%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
            <div className="space-y-1 p-3 rounded-xl bg-[#141A28]">
              <span className="font-mono text-[#FFB800] uppercase font-semibold block">1. What Went Wrong?</span>
              <p className="text-gray-300 leading-relaxed">{debugResult.rootCause}</p>
            </div>

            <div className="space-y-1 p-3 rounded-xl bg-[#141A28]">
              <span className="font-mono text-[#00F0FF] uppercase font-semibold block">2. Which File Caused It?</span>
              <p className="text-gray-300 leading-relaxed">{debugResult.likelyFile}</p>
            </div>

            <div className="space-y-1 p-3 rounded-xl bg-[#141A28]">
              <span className="font-mono text-[#A855F7] uppercase font-semibold block">3. Why Did It Happen?</span>
              <p className="text-gray-300 leading-relaxed">{debugResult.whyItHappened}</p>
            </div>

            <div className="space-y-1 p-3 rounded-xl bg-[#141A28]">
              <span className="font-mono text-[#00FFA3] uppercase font-semibold block">4. Suggested Fix:</span>
              <code className="text-[#00FFA3] font-mono block bg-[#080E1C] p-2 rounded border border-cyan-500/10">
                {debugResult.suggestedFix}
              </code>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div className="font-mono text-[11px] text-gray-400">
              Run to verify: <span className="text-[#00F0FF]">{debugResult.testToRun}</span>
            </div>
            <Link
              href="/review"
              className="px-4 py-2 rounded-xl bg-[#00F0FF] text-[#00363a] font-['Space_Grotesk'] text-xs font-bold flex items-center gap-2 hover:brightness-110 transition-all"
            >
              <span>PROCEED TO PR REVIEW</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
