'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { requestAI } from '../../lib/ai';
import {
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  Download,
  ArrowRight,
  GitPullRequest,
  CheckCircle2,
} from 'lucide-react';

export default function PRGeneratorPage() {
  const [copied, setCopied] = useState(false);
  const [prData, setPrData] = useState({
    title: 'fix(worker): implement exponential backoff on HTTP 429 throttling',
    markdown: `## Summary
This pull request resolves issue #184 by introducing guarded exponential backoff and jittered retry intervals when the identity broker returns HTTP 429 (Too Many Requests).

## Key Changes
- **Core Worker**: Replaced unbounded async loop with exponential backoff and jittered retry in \`src/core/worker.py\`.
- **Error Handling**: Explicitly parses HTTP 429 \`Retry-After\` response header to enforce server-requested backoff ceilings.
- **Unit Tests**: Added comprehensive regression tests in \`tests/test_worker.py\` covering deadlock scenarios.

## Verification & Testing
\`\`\`bash
pytest tests/test_worker.py
npm run lint
\`\`\`
All 42 unit tests passed with 100% assertion coverage on modified files.

## Related Issue
Fixes open-telemetry/opentelemetry-python#184

## Checklist
- [x] Code adheres to repository style guides
- [x] All existing tests continue to pass
- [x] New unit tests have been added
- [x] Documentation comments updated
`,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(prData.markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([prData.markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'PULL_REQUEST.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#0C101A] border border-cyan-500/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#00F0FF] mb-1">
            <GitPullRequest className="w-4 h-4" />
            <span>AI PR SYNTHESIS ENGINE</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
            AI Pull Request Generator
          </h1>
          <p className="text-xs text-gray-400">
            Synthesize maintainer-grade pull request markdown formatted for immediate approval.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl bg-[#141A28] border border-cyan-500/30 text-white font-mono text-xs flex items-center gap-2 hover:bg-[#1b1f2a] transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-[#00FFA3]" /> : <Copy className="w-4 h-4 text-[#00F0FF]" />}
            <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY MARKDOWN'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2.5 rounded-xl bg-[#141A28] border border-cyan-500/30 text-white font-mono text-xs flex items-center gap-2 hover:bg-[#1b1f2a] transition-colors"
          >
            <Download className="w-4 h-4 text-[#00FFA3]" />
            <span>EXPORT .MD</span>
          </button>
        </div>
      </div>

      {/* PR Title & Markdown Editor Preview */}
      <div className="space-y-4">
        <div className="p-4 rounded-2xl bg-[#0C101A] border border-cyan-500/20 space-y-1 font-mono text-xs">
          <span className="text-gray-500 text-[10px] uppercase font-semibold">Suggested PR Title:</span>
          <div className="text-white font-bold text-sm bg-[#141A28] p-3 rounded-xl border border-cyan-500/20">
            {prData.title}
          </div>
        </div>

        <div className="rounded-2xl bg-[#080E1C] border border-cyan-500/25 overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#0C101A] border-b border-cyan-500/15 font-mono text-xs text-gray-400">
            <span>PULL_REQUEST_TEMPLATE.md</span>
            <span className="text-[#00FFA3]">READY FOR GITHUB</span>
          </div>
          <pre className="p-6 font-mono text-xs text-gray-300 leading-relaxed whitespace-pre-wrap bg-[#05070D]">
            {prData.markdown}
          </pre>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <a
            href="https://github.com/open-telemetry/opentelemetry-python/compare"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-[#00F0FF] text-[#00363a] font-['Space_Grotesk'] text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:brightness-110 transition-all"
          >
            <span>SUBMIT PULL REQUEST ON GITHUB</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <Link
            href="/portfolio"
            className="px-5 py-3 rounded-xl bg-[#141A28] hover:bg-[#1b1f2a] border border-cyan-500/20 text-white font-mono text-xs flex items-center gap-2 transition-colors"
          >
            <span>LOG IN DEVELOPER PASSPORT</span>
            <ArrowRight className="w-4 h-4 text-[#A855F7]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
