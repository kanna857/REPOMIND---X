# RepoMind-X — Your AI Copilot for Open Source

[![NVIDIA Nemotron 70B](https://img.shields.io/badge/Model-NVIDIA%20Nemotron%2070B-76B900?logo=nvidia)](https://build.nvidia.com)
[![Nebius Token Factory](https://img.shields.io/badge/Inference-Nebius%20AI%20Cloud-00F0FF)](https://nebius.ai)
[![Next.js 14](https://img.shields.io/badge/Framework-Next.js%2014-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript%205-3178C6?logo=typescript)](https://www.typescriptlang.org)

> **"Discover the right issue. Understand the code. Build with confidence. Ship your contribution."**

RepoMind-X transforms the overwhelming open-source journey for students and beginner developers into a structured, cinematic, autonomous flight deck:

```
GitHub Issue ➔ Understand ➔ Plan ➔ Code ➔ Test ➔ Review ➔ PR ➔ Portfolio ➔ Next Contribution
```

---

## 🌌 Key Highlights & Features

1. **Open Source Galaxy (3D Spatial Canvas)**
   - High-performance 3D canvas mapping repositories, orbiting issues, PR conduits, and your central intelligent agent node.
   - Interactive zoom, drag/pan, stack filters, and live telemetry feeds.

2. **NVIDIA Nemotron 70B via Nebius Token Factory**
   - Clean AI provider abstraction supporting real API completions and deterministic demo fallback.
   - Multilingual **Explain Simply** in **English**, **Telugu**, and **Hindi**.
   - Context-aware AST dependency parsing.

3. **Autonomous Tri-Agent Fleet (LangGraph Pattern)**
   - **Finder Agent**: Semantic vector search, maintainer response time scoring, stale issue detection.
   - **Planner Agent**: Step-by-step checklist synthesis with branch & commit conventions.
   - **Reviewer Agent**: Git diff parsing against `CONTRIBUTING.md` and PR Readiness Scoring (0-100%).

4. **Claim Collision Guardian**
   - Scans issue threads and comments to detect active intent-to-claim keywords and assignees, protecting beginners from duplicate work.

5. **Integrated Cockpit Terminal & AI Debug Assistant**
   - Interactive sandbox terminal running preset tests and lint commands.
   - Instant root-cause diagnostic assistant for test failures and stack traces.

6. **Developer Passport & LinkedIn Share Generator**
   - Cybernetic verifiable portfolio displaying merged PR velocity, skill radar, and contribution badges.
   - 1-click AI LinkedIn & social media post writer with Professional, Technical, and Storytelling modes.

7. **Browser & Editor Extensions**
   - **Chrome Extension (Manifest V3)**: Injects RepoMind-X HUD into GitHub issue & PR headers.
   - **VS Code Extension**: Direct commands for mission planning and diff auditing in your IDE.

---

## 🛠️ Quick Start & Installation

### Prerequisites
- Node.js 18+ & npm
- (Optional) Docker & Docker Compose
- (Optional) Nebius Token Factory API Key

### 1. Clone & Install
```bash
git clone https://github.com/your-org/repomind-x.git
cd repomind-x/apps/web
npm install
```

### 2. Configure Environment
```bash
cp ../../.env.example .env.local
```
Key variables:
```env
AI_PROVIDER=nebius
AI_MODEL=nvidia/llama-3.1-nemotron-70b-instruct
NEBIUS_API_KEY=your_nebius_api_key
NEBIUS_BASE_URL=https://api.studio.nebius.ai/v1
DEMO_MODE=true
```

### 3. Run Locally
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🗺️ Application Routes

- `/` — Cinematic Landing Page & 3D Galaxy Canvas
- `/login` — GitHub OAuth & 1-Click Demo Login
- `/dashboard` — Command Core & Telemetry Stream
- `/discover` — Discover Issues Laboratory with Semantic Search
- `/issues/[id]` — Deep Issue Recon (Explain Simply in EN/TE/HI, Claim Check)
- `/agent` — Autonomous Tri-Agent Swarm Visualization
- `/plan/[id]` — Contribution Mission Plan & Git Commands
- `/code-context/[id]` — Code Context Reader & File Tree
- `/terminal` — Terminal Sandbox & AI Debug Assistant
- `/review` — PR Reviewer & Readiness Matrix
- `/pr-generator` — AI Pull Request Markdown Generator
- `/portfolio` — Developer Passport & AI Social Post Generator
- `/learning` — Adaptive Learning Path & Skill Tree
- `/watchlist` — Repository Radar & Subscriptions
- `/trending` — Trending Open-Source Target Vectors
- `/compare` — Repository Comparison & AI Verdict
- `/community` — Sprints & Contributor Leaderboards
- `/notifications` — Realtime Telemetry Feed
- `/settings` — Nebius Token Factory & Cockpit Settings

---

## 📄 License
MIT © RepoMind-X Team. Built for the open-source community.
