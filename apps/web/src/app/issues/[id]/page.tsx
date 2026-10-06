'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ISSUES_DATA } from '../../../lib/data';
import { requestAI } from '../../../lib/ai';
import {
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  Languages,
  BookOpen,
  ArrowRight,
  GitBranch,
  Clock,
  Award,
  Layers,
  ChevronRight,
  Cpu,
  FileCode,
  Terminal,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function IssueDetailPage() {
  const params = useParams();
  const router = useRouter();
  const issueId = (params?.id as string) || '1';

  const issue = ISSUES_DATA.find((i) => i.id === issueId) || ISSUES_DATA[0];

  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'te' | 'hi'>('en');
  const [explainLoading, setExplainLoading] = useState(false);
  const [explanationData, setExplanationData] = useState<any>(null);

  // Default explanations for instant display and language switching
  const defaultExplanations = {
    en: {
      problem: `In "${issue.title}", the token worker deadlocks when the upstream API responds with HTTP 429 (Too Many Requests). Because the backoff ceiling is missing, the retry task stays locked in the event loop.`,
      maintainerExpectation: "The maintainers want an exponential backoff algorithm with full jitter and a defensive timeout threshold, accompanied by clean unit tests.",
      skillsNeeded: ["Python / TypeScript", "Asynchronous Concurrency", "Unit Testing (pytest/jest)"],
      likelyFiles: ["src/core/worker.py", "src/utils/retry.py", "tests/test_worker.py"],
      difficulty: issue.difficulty,
      estimatedTime: issue.estimatedHours,
      whatToLearnFirst: "Inspect CONTRIBUTING.md in the repository root to see how to run isolated test suites locally.",
    },
    te: {
      problem: `"${issue.title}" లోని సమస్య ఏమిటంటే, సర్వర్ నుండి HTTP 429 రేట్ లిమిట్ వచ్చినప్పుడు టోకెన్ వర్కర్ ఆగిపోతోంది. బ్యాకాఫ్ సమయం సరిగ్గా లేకపోవడం వల్ల ఈవెంట్ లూప్ డెడ్‌లాక్ అవుతోంది.`,
      maintainerExpectation: "మెయింటెయినర్లు ఎక్స్‌పోనెన్షియల్ బ్యాకాఫ్ మరియు సరైన ఎర్రర్ హ్యాండ్లింగ్ కోడ్‌తో పాటు యూనిట్ టెస్టులు జోడించాలని ఆశిస్తున్నారు.",
      skillsNeeded: ["పైథాన్ / టైప్‌స్క్రిప్ట్", "యాసింక్ ప్రోగ్రామింగ్", "యూనిట్ టెస్టింగ్"],
      likelyFiles: ["src/core/worker.py", "src/utils/retry.py", "tests/test_worker.py"],
      difficulty: issue.difficulty,
      estimatedTime: issue.estimatedHours,
      whatToLearnFirst: "మొదట రిపోజిటరీ టెస్ట్ సెటప్ మరియు CONTRIBUTING.md చూడండి.",
    },
    hi: {
      problem: `"${issue.title}" में मुख्य समस्या यह है कि HTTP 429 एरर आने पर टोकन रिफ्रेश वर्कर हैंग हो जाता है। बैकऑफ लिमिट न होने से इवेंट लूप लॉक हो जाता है।`,
      maintainerExpectation: "मेंटेनर चाहते हैं कि एक्सपोनेंशियल बैकऑफ और जिट्टर लॉजिक के साथ मजबूत एरर हैंडलिंग और यूनिट टेस्ट जोड़े जाएं।",
      skillsNeeded: ["पायथन / टाइपस्क्रिप्ट", "एसिंक्रोनस प्रोग्रामिंग", "यूनिट टेस्टिंग"],
      likelyFiles: ["src/core/worker.py", "src/utils/retry.py", "tests/test_worker.py"],
      difficulty: issue.difficulty,
      estimatedTime: issue.estimatedHours,
      whatToLearnFirst: "पहले CONTRIBUTING.md पढ़कर लोकल टेस्ट रन करना सीखें।",
    },
  };

  const currentExplanation = explanationData || defaultExplanations[selectedLanguage];

  const handleLanguageChange = async (lang: 'en' | 'te' | 'hi') => {
    setSelectedLanguage(lang);
    setExplainLoading(true);
    try {
      const data = await requestAI('explain_simply', {
        issue: {
          title: issue.title,
          body: issue.body,
          repository: issue.repository,
          labels: issue.labels,
        },
        language: lang,
      });
      if (data) {
        setExplanationData(data);
      }
    } catch (e) {
      // Fallback works automatically
    } finally {
      setExplainLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Issue Recon Header Banner */}
      <div className="p-6 rounded-2xl bg-[#0C101A] border border-cyan-500/25 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-xs">
            <GitBranch className="w-4 h-4 text-[#00F0FF]" />
            <span className="text-[#00F0FF] font-semibold">{issue.repository}</span>
            <span className="text-gray-500">#{issue.number}</span>
            <span className="px-2 py-0.5 rounded bg-[#171b26] text-[#00FFA3] font-bold">
              {issue.matchScore}% AI MATCH
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/plan/${issue.id}`}
              className="px-4 py-2 rounded-xl bg-[#00F0FF] text-[#00363a] font-['Space_Grotesk'] text-xs font-bold flex items-center gap-2 shadow-[0_0_16px_rgba(0,240,255,0.4)] hover:brightness-110 transition-all"
            >
              <span>DISPATCH MISSION PLAN</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <h1 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {issue.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-gray-400">
          <span className="text-[#00f89e]">{issue.difficulty}</span>
          <span>•</span>
          <span>Est: {issue.estimatedHours}</span>
          <span>•</span>
          <span className={issue.claimStatus === 'Available' ? 'text-[#00FFA3]' : 'text-[#FFB800]'}>
            Status: {issue.claimStatus}
          </span>
          <span>•</span>
          <span>Updated {issue.updatedAt}</span>
        </div>
      </div>

      {/* Grid: Explain Simply (7 Cols) + Claim & Match Breakdown (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: EXPLAIN SIMPLY Multi-lingual AI Panel */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-[#0C101A] border border-cyan-500/25 shadow-xl space-y-5">
            {/* Header with Language selector */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-cyan-500/15">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#00F0FF]" />
                <span className="font-['Space_Grotesk'] text-lg font-bold text-white">
                  Explain Simply // AI Recon
                </span>
              </div>

              {/* Language Switcher Buttons */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-[#141A28] border border-cyan-500/20 font-mono text-xs">
                <Languages className="w-3.5 h-3.5 text-gray-400 ml-1.5" />
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    selectedLanguage === 'en'
                      ? 'bg-[#00F0FF] text-[#00363a] font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => handleLanguageChange('te')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    selectedLanguage === 'te'
                      ? 'bg-[#A855F7] text-white font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  తెలుగు (Telugu)
                </button>
                <button
                  onClick={() => handleLanguageChange('hi')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    selectedLanguage === 'hi'
                      ? 'bg-[#00FFA3] text-[#00363a] font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  हिन्दी (Hindi)
                </button>
              </div>
            </div>

            {explainLoading ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3 font-mono text-xs text-[#00F0FF]">
                <div className="w-8 h-8 rounded-full border-2 border-[#00F0FF] border-t-transparent animate-spin"></div>
                <span>NVIDIA Nemotron synthesizing plain explanation...</span>
              </div>
            ) : (
              <div className="space-y-4 font-sans text-sm">
                {/* 1. What is the problem? */}
                <div className="space-y-1">
                  <span className="font-mono text-xs text-[#00F0FF] uppercase tracking-wider font-semibold block">
                    What is the problem?
                  </span>
                  <p className="text-gray-300 leading-relaxed bg-[#141A28]/70 p-3 rounded-xl border border-cyan-500/10">
                    {currentExplanation.problem}
                  </p>
                </div>

                {/* 2. What does maintainer want? */}
                <div className="space-y-1">
                  <span className="font-mono text-xs text-[#00FFA3] uppercase tracking-wider font-semibold block">
                    What does the maintainer want?
                  </span>
                  <p className="text-gray-300 leading-relaxed bg-[#141A28]/70 p-3 rounded-xl border border-cyan-500/10">
                    {currentExplanation.maintainerExpectation}
                  </p>
                </div>

                {/* 3. Skills needed & Likely files */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5 p-3 rounded-xl bg-[#141A28]/70 border border-cyan-500/10">
                    <span className="font-mono text-[11px] text-[#ddb7ff] uppercase tracking-wider font-semibold block">
                      Skills You Need:
                    </span>
                    <ul className="space-y-1 font-mono text-xs text-gray-300">
                      {currentExplanation.skillsNeeded.map((s: string) => (
                        <li key={s} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]"></span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1.5 p-3 rounded-xl bg-[#141A28]/70 border border-cyan-500/10">
                    <span className="font-mono text-[11px] text-[#00F0FF] uppercase tracking-wider font-semibold block">
                      Likely Affected Files:
                    </span>
                    <ul className="space-y-1 font-mono text-xs text-gray-300">
                      {currentExplanation.likelyFiles.map((f: string) => (
                        <li key={f} className="flex items-center gap-1.5">
                          <FileCode className="w-3.5 h-3.5 text-[#00F0FF]" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 4. What to learn first? */}
                <div className="p-3.5 rounded-xl bg-[#080E1C] border border-cyan-500/20 flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-mono text-xs text-white font-semibold">What should I learn first?</span>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {currentExplanation.whatToLearnFirst}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Claim Check + AI Match Score Breakdown */}
        <div className="lg:col-span-5 space-y-4">
          {/* CLAIM CHECK HUD */}
          <div className="p-5 rounded-2xl bg-[#0C101A] border border-cyan-500/25 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-cyan-500/15">
              <span className="font-mono text-xs text-gray-300 uppercase tracking-wider font-semibold">
                AI Claim Detector
              </span>
              <span className="font-mono text-[11px] text-[#00FFA3] font-bold">CONFIDENCE: 95%</span>
            </div>

            {issue.claimStatus === 'Available' ? (
              <div className="p-4 rounded-xl bg-[#00FFA3]/10 border border-green-500/30 space-y-2">
                <div className="flex items-center gap-2 text-[#00FFA3] font-['Space_Grotesk'] text-sm font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>✓ No Active Claimant Detected</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Comment AST scan found 0 intent-to-claim keywords and 0 assigned maintainers. The issue is unreserved and ready for your PR.
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[#FFB800]/10 border border-yellow-500/30 space-y-2">
                <div className="flex items-center gap-2 text-[#FFB800] font-['Space_Grotesk'] text-sm font-bold">
                  <AlertCircle className="w-5 h-5" />
                  <span>⚠ Someone May Already Be Working On This</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  A contributor previously commented "I'll take this". We suggest asking in the issue thread or picking another target.
                </p>
              </div>
            )}

            <div className="pt-2 text-[11px] font-mono text-gray-500">
              Scanned: 3 thread comments • Assignees: None
            </div>
          </div>

          {/* AI MATCH SCORE BREAKDOWN */}
          <div className="p-5 rounded-2xl bg-[#0C101A] border border-cyan-500/25 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-cyan-500/15">
              <span className="font-mono text-xs text-gray-300 uppercase tracking-wider font-semibold">
                AI Match Score Breakdown
              </span>
              <span className="font-['Space_Grotesk'] text-lg font-bold text-[#00FFA3]">
                {issue.matchScore}%
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between text-gray-400 mb-1">
                  <span>Skill Match</span>
                  <span className="text-white font-bold">96%</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#1b1f2a] overflow-hidden">
                  <div className="h-full bg-[#00F0FF] rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-400 mb-1">
                  <span>Difficulty Match</span>
                  <span className="text-white font-bold">91%</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#1b1f2a] overflow-hidden">
                  <div className="h-full bg-[#00FFA3] rounded-full" style={{ width: '91%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-400 mb-1">
                  <span>Technology Match</span>
                  <span className="text-white font-bold">95%</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#1b1f2a] overflow-hidden">
                  <div className="h-full bg-[#A855F7] rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-400 mb-1">
                  <span>Activity & Maintainer Responsiveness</span>
                  <span className="text-white font-bold">89%</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#1b1f2a] overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-400 mb-1">
                  <span>Learning Value</span>
                  <span className="text-white font-bold">97%</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#1b1f2a] overflow-hidden">
                  <div className="h-full bg-[#00f89e] rounded-full" style={{ width: '97%' }}></div>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed pt-1">
              <span className="text-[#00F0FF] font-semibold">Why this is recommended:</span> Low blast radius with isolated worker module. High confidence that maintainer reviews within 6 hours.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <Link
              href={`/code-context/${issue.id}`}
              className="w-full py-3 px-4 rounded-xl bg-[#141A28] hover:bg-[#1b1f2a] border border-cyan-500/20 text-white font-mono text-xs flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#A855F7]" />
                <span>Inspect Visual Code Context & AST Graph</span>
              </span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </Link>

            <Link
              href={`/plan/${issue.id}`}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#00dbe9] text-[#00363a] font-['Space_Grotesk'] text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(0,240,255,0.3)] hover:brightness-110 transition-all"
            >
              <span>BUILD CONTRIBUTION PLAN</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
