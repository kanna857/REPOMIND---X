'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ISSUES_DATA } from '../../../lib/data';
import {
  FileCode,
  Folder,
  ChevronRight,
  ChevronDown,
  Layers,
  ArrowRight,
  GitBranch,
  Sparkles,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

export default function CodeContextClient() {
  const params = useParams();
  const issueId = (params?.id as string) || '1';
  const issue = ISSUES_DATA.find((i) => i.id === issueId) || ISSUES_DATA[0];

  const [activeFile, setActiveFile] = useState('worker.py');

  const files = [
    {
      name: 'worker.py',
      path: 'src/core/worker.py',
      role: 'Token Refresh & Async Event Loop',
      whyMatters: 'Contains the main while-loop that fails to parse HTTP 429 Retry-After headers, leading to deadlock.',
      code: `import asyncio
import logging
from .retry import calculate_jittered_backoff

logger = logging.getLogger(__name__)

class TokenWorker:
    def __init__(self, broker_client, max_retries=5):
        self.broker = broker_client
        self.max_retries = max_retries

    async def refresh_loop(self):
        retries = 0
        while retries < self.max_retries:
            try:
                response = await self.broker.request_token()
                if response.status_code == 200:
                    return response.token
                
                # FIX: Handle HTTP 429 explicitly with header parsing
                if response.status_code == 429:
                    retry_after = int(response.headers.get("retry-after", "2"))
                    backoff = calculate_jittered_backoff(retries, ceiling=retry_after)
                    logger.warning(f"Throttled (429). Backing off for {backoff:.2f}s")
                    await asyncio.sleep(backoff)
                    retries += 1
            except Exception as e:
                logger.error(f"Unexpected broker error: {e}")
                raise`,
    },
    {
      name: 'retry.py',
      path: 'src/utils/retry.py',
      role: 'Jittered Exponential Backoff Helper',
      whyMatters: 'Utility module calculating randomized full-jitter backoff intervals to prevent thundering herd requests.',
      code: `import random

def calculate_jittered_backoff(attempt: int, base: float = 0.5, ceiling: float = 16.0) -> float:
    """
    Computes exponential backoff with full jitter:
    Sleep = random(0, min(ceiling, base * 2 ** attempt))
    """
    temp = min(ceiling, base * (2 ** attempt))
    return random.uniform(0, temp)`,
    },
    {
      name: 'test_worker.py',
      path: 'tests/test_worker.py',
      role: 'Regression Test Suite',
      whyMatters: 'Validates that HTTP 429 response triggers backoff sleep and releases event loop lock.',
      code: `import pytest
import asyncio
from unittest.mock import AsyncMock, MagicMock
from src.core.worker import TokenWorker

@pytest.mark.asyncio
async def test_token_worker_handles_429_backoff():
    mock_broker = AsyncMock()
    mock_response_429 = MagicMock(status_code=429, headers={"retry-after": "1"})
    mock_response_200 = MagicMock(status_code=200, token="mock-bearer-token")
    mock_broker.request_token.side_effect = [mock_response_429, mock_response_200]

    worker = TokenWorker(mock_broker, max_retries=3)
    token = await worker.refresh_loop()
    assert token == "mock-bearer-token"
    assert mock_broker.request_token.call_count == 2`,
    },
  ];

  const currentFile = files.find((f) => f.name === activeFile) || files[0];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#0C101A] border border-cyan-500/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#00F0FF] mb-1">
            <Layers className="w-4 h-4" />
            <span>AST DEPENDENCY GRAPH & REPOSITORY SPATIAL MAP</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Code Context Reader
          </h1>
          <p className="text-xs text-gray-400">
            Targeting {issue.repository} for "{issue.title}".
          </p>
        </div>

        <Link
          href={`/plan/${issue.id}`}
          className="px-4 py-2 rounded-xl bg-[#141A28] border border-cyan-500/30 text-white font-mono text-xs flex items-center gap-2 hover:bg-[#1b1f2a] transition-colors"
        >
          <span>Return to Plan</span>
          <ArrowRight className="w-4 h-4 text-[#00F0FF]" />
        </Link>
      </div>

      {/* Grid: File Tree (4 Cols) + Code Viewer & Why This Matters (8 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* File Tree & Impacted List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-2xl bg-[#0C101A] border border-cyan-500/20 shadow-lg space-y-3 font-mono text-xs">
            <span className="text-gray-400 uppercase tracking-wider font-semibold block">
              Affected File Tree ({files.length} Files)
            </span>

            <div className="space-y-1">
              {files.map((file) => {
                const isSelected = file.name === activeFile;
                return (
                  <button
                    key={file.name}
                    onClick={() => setActiveFile(file.name)}
                    className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-[#141A28] border-cyan-500 text-[#00F0FF] shadow-sm'
                        : 'bg-[#141A28]/40 border-transparent text-gray-400 hover:text-white hover:bg-[#141A28]'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <FileCode className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#00F0FF]' : 'text-gray-500'}`} />
                      <span className="truncate">{file.path}</span>
                    </span>
                    <span className="text-[10px] text-gray-500 uppercase shrink-0">
                      {isSelected ? 'ACTIVE' : 'VIEW'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* AST Spatial Dependency Preview */}
          <div className="p-4 rounded-2xl bg-[#0C101A] border border-cyan-500/20 shadow-lg space-y-2 font-mono text-xs">
            <span className="text-gray-400 uppercase tracking-wider font-semibold block">
              AST Component Hierarchy
            </span>
            <div className="space-y-2 p-3 rounded-xl bg-[#080E1C] border border-cyan-500/10 text-gray-300 text-[11px]">
              <div className="flex items-center gap-1.5 text-[#00F0FF]">
                <span>[Worker Loop]</span> ➔ imports <span>[retry.py]</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#A855F7] pl-4">
                <span>↳</span> exports `calculate_jittered_backoff()`
              </div>
              <div className="flex items-center gap-1.5 text-[#00FFA3] pl-4">
                <span>↳</span> tested by `test_token_worker_handles_429_backoff()`
              </div>
            </div>
          </div>
        </div>

        {/* Code Viewer & Why This Matters */}
        <div className="lg:col-span-8 space-y-4">
          {/* Why This Matters Callout */}
          <div className="p-4 rounded-2xl bg-[#141A28] border border-cyan-500/25 space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs text-[#00FFA3] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>WHY THIS FILE MATTERS:</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-sans">
              {currentFile.whyMatters}
            </p>
          </div>

          {/* Code Viewer */}
          <div className="rounded-2xl bg-[#080E1C] border border-cyan-500/25 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0C101A] border-b border-cyan-500/15 font-mono text-xs text-gray-400">
              <span className="flex items-center gap-2 text-white">
                <FileCode className="w-4 h-4 text-[#00F0FF]" />
                {currentFile.path}
              </span>
              <span className="text-[11px] text-[#00f89e]">READ-ONLY AST INSPECTOR</span>
            </div>
            <pre className="p-4 font-mono text-xs text-cyan-100 overflow-x-auto leading-relaxed bg-[#05070D]">
              <code>{currentFile.code}</code>
            </pre>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Link
              href="/terminal"
              className="px-5 py-2.5 rounded-xl bg-[#00F0FF] text-[#00363a] font-['Space_Grotesk'] text-xs font-bold flex items-center gap-2 shadow-[0_0_16px_rgba(0,240,255,0.4)] hover:brightness-110 transition-all"
            >
              <span>RUN IN TEST SANDBOX</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
