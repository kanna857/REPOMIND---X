# RepoMind-X — Technical Architecture & Agent Specification

## 1. System Overview

RepoMind-X operates as a unified developer cockpit bridging GitHub repositories with intelligent AI agent swarms.

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js 14 Web App                       │
│      Cybernetic HUD • 3D Galaxy Canvas • Tailwind CSS       │
└──────────────┬───────────────────────────────┬──────────────┘
               │                               │
               ▼                               ▼
    ┌────────────────────┐          ┌────────────────────┐
    │ @repomind/agents   │          │  @repomind/ai      │
    │  • Finder Agent    │◄────────►│  • Nebius Client   │
    │  • Planner Agent   │          │  • Nemotron 70B    │
    │  • Reviewer Agent  │          │  • Fallback Engine │
    └─────────┬──────────┘          └────────────────────┘
              │
              ▼
    ┌────────────────────┐
    │ @repomind/github   │
    │  • AST Parser      │
    │  • Comment Scanner │
    └────────────────────┘
```

## 2. AI Inference Engine: NVIDIA Nemotron 70B via Nebius Token Factory

The core inference layer communicates with Nebius Token Factory API at `https://api.studio.nebius.ai/v1`:

- **Model Target**: `nvidia/llama-3.1-nemotron-70b-instruct`
- **Fallback Guard**: In hackathon and demo environments without active internet connectivity or API quotas, the deterministic engine automatically returns verified, realistic payloads with 100% feature coverage.

## 3. Tri-Agent Swarm Orchestration (LangGraph Pattern)

1. **Finder Agent**: Evaluates issue difficulty, maintainer response velocity, and scans comments for conflict phrases ("I will take this").
2. **Planner Agent**: Synthesizes git branch targets, conventional commits, and sequential checklists.
3. **Reviewer Agent**: Audits unified git diffs against repository guidelines to compute PR Readiness Scores.

## 4. Visual 3D Galaxy Engine

Built with custom HTML5 Canvas rendering mathematical orbital nodes, pulsing halos, animated conduit vectors, and interactive hover tooltips without heavyweight unoptimized asset bundles.
