'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { requestAI } from '../../lib/ai';
import {
  GitMerge,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  ShieldCheck,
  ArrowRight,
  ShieldAlert,
  Cpu,
} from 'lucide-react';

export default function ReviewPage() {
  const [diffText, setDiffText] = useState(`diff --git a/src/core/worker.py b/src/core/worker.py
index 42f1a9..89b2c3 100644
--- a/src/core/worker.py
+++ b/src/core/worker.py
@@ -34,6 +34,11 @@ class TokenWorker:
             if response.status_code == 200:
                 return response.token
+            if response.status_code == 429:
+                retry_after = int(response.headers.get("retry-after", "2"))
+                backoff = calculate_jittered_backoff(retries, ceiling=retry_after)
+                await asyncio.sleep(backoff)
+                retries += 1
`);

  const [loading, setLoading] = useState(false);
  const [reviewResult, setReviewResult] = useState<any>({
    readinessScore: 92,
    verdict: 'Approved',
    summary: 'Clean implementation with guarded backoff logic, minimal blast radius, and passing regression suite.',
    metrics: {
      codeQuality: true,
      tests: true,
      security: true,
      performance: true,
      documentation: false,
      repositoryRules: true,
      regressionRisk: true,
    },
    findings: [
      {
        severity: 'info',
        file: 'src/utils/retry.py',
        line: 24,
        explanation: 'Jitter calculation lacks documentation comments.',
        recommendation: 'Add docstring explaining algorithm bounds.',
      },
      {
        severity: 'warning',
        file: 'tests/test_worker.py',
        line: 18,
        explanation: 'Mock timeout uses real delay instead of fake timer.',
        recommendation: 'Use fake timers to prevent CI test latency.',
      },
    ],
  });

  const handleRunReview = async () => {
    setLoading(true);
    try {
      const data = await requestAI('review_diff', { diff: diffText });
      if (data) setReviewResult(data);
    } catch (e) {
      // Fallback data is already present
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#0C101A] border border-cyan-500/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#00FFA3] mb-1">
            <GitMerge className="w-4 h-4" />
            <span>AI REVIEW KERNEL // NVIDIA NEMOTRON AUDIT</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
            PR Reviewer & Readiness Matrix
          </h1>
          <p className="text-xs text-gray-400">
            Audit your git diff against repository guidelines before maintainers see it.
          </p>
        </div>

        <button
          onClick={handleRunReview}
          disabled={loading}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#00dbe9] text-[#00363a] font-['Space_Grotesk'] text-xs font-bold tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center gap-2 transition-all disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          <span>{loading ? 'AUDITING DIFF...' : 'ANALYZE GIT DIFF'}</span>
        </button>
      </div>

      {/* Grid: Diff Input (6 Cols) + PR Readiness Matrix (6 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Git Diff Editor */}
        <div className="lg:col-span-6 space-y-3">
          <div className="p-4 rounded-2xl bg-[#0C101A] border border-cyan-500/20 shadow-lg space-y-2">
            <div className="flex items-center justify-between font-mono text-xs text-gray-400">
              <span className="flex items-center gap-1.5 text-white">
                <FileCode className="w-4 h-4 text-[#00F0FF]" />
                Git Diff Inspector
              </span>
              <span>PASTE OR CONNECT BRANCH</span>
            </div>

            <textarea
              value={diffText}
              onChange={(e) => setDiffText(e.target.value)}
              rows={12}
              className="w-full p-3.5 rounded-xl bg-[#05070D] border border-cyan-500/20 font-mono text-xs text-cyan-200 focus:outline-none focus:border-[#00F0FF] leading-relaxed"
            />
          </div>
        </div>

        {/* Right Column: Readiness Matrix & Findings */}
        <div className="lg:col-span-6 space-y-4">
          {/* Readiness Score Card */}
          <div className="p-6 rounded-2xl bg-[#0C101A] border border-cyan-500/25 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-cyan-500/15">
              <span className="font-mono text-xs text-gray-400 uppercase tracking-wider font-semibold">
                PR Readiness Score
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#1b1f2a] text-[#00FFA3] font-mono text-xs border border-green-500/30">
                VERDICT: {reviewResult.verdict}
              </span>
            </div>

            <div className="flex items-center gap-6">
              <div className="font-['Space_Grotesk'] text-5xl font-bold text-[#00FFA3]">
                {reviewResult.readinessScore}%
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                {reviewResult.summary}
              </p>
            </div>

            {/* Checklist Matrix */}
            <div className="grid grid-cols-2 gap-2 pt-2 font-mono text-xs">
              {Object.entries(reviewResult.metrics).map(([key, val]) => (
                <div
                  key={key}
                  className="flex items-center gap-2 p-2 rounded-lg bg-[#141A28] text-gray-300"
                >
                  {val ? (
                    <CheckCircle2 className="w-4 h-4 text-[#00FFA3]" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-[#FFB800]" />
                  )}
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Line Findings */}
          <div className="p-5 rounded-2xl bg-[#0C101A] border border-cyan-500/20 space-y-3 font-mono text-xs">
            <span className="text-gray-400 uppercase tracking-wider font-semibold block">
              Actionable Findings ({reviewResult.findings.length})
            </span>

            <div className="space-y-2">
              {reviewResult.findings.map((f: any, idx: number) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#141A28] border border-cyan-500/15 space-y-1 font-sans"
                >
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-[#00F0FF]">{f.file} : L{f.line}</span>
                    <span className="uppercase text-[#FFB800]">{f.severity}</span>
                  </div>
                  <div className="text-xs text-gray-300">{f.explanation}</div>
                  <div className="text-xs text-[#00FFA3] font-mono">
                    Fix: {f.recommendation}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <div className="flex items-center justify-end gap-3 pt-1">
            <Link
              href="/pr-generator"
              className="px-6 py-3 rounded-xl bg-[#00F0FF] text-[#00363a] font-['Space_Grotesk'] text-xs font-bold flex items-center gap-2 shadow-[0_0_16px_rgba(0,240,255,0.4)] hover:brightness-110 transition-all"
            >
              <span>ADVANCE TO PR GENERATOR</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
