export interface UserRecord {
  id: string;
  githubId: string;
  username: string;
  name?: string;
  avatarUrl?: string;
  streak: number;
  contributionScore: number;
  learningLevel: string;
}

export interface PortfolioRecord {
  username: string;
  prsMerged: number;
  issuesSolved: number;
  repositoriesCount: number;
  technologiesCount: number;
  radarSkills: Array<{ skill: string; value: number }>;
  badges: Array<{ code: string; title: string; icon: string; date: string }>;
  recentContributions: Array<{
    repo: string;
    prNumber: number;
    title: string;
    mergedAt: string;
    impact: string;
  }>;
}

export const DEMO_PORTFOLIO: PortfolioRecord = {
  username: "octo-cadet",
  prsMerged: 42,
  issuesSolved: 31,
  repositoriesCount: 18,
  technologiesCount: 12,
  radarSkills: [
    { skill: "TypeScript", value: 92 },
    { skill: "Python", value: 88 },
    { skill: "Async / Event Loop", value: 85 },
    { skill: "Testing & CI", value: 94 },
    { skill: "Git Architecture", value: 90 },
    { skill: "API Design", value: 86 },
  ],
  badges: [
    { code: "FIRST_MERGE", title: "First PR Merged", icon: "rocket", date: "Jan 2026" },
    { code: "BUG_HUNTER", title: "Race Condition Hunter", icon: "shield-alert", date: "Feb 2026" },
    { code: "AST_MASTER", title: "Semantic AST Architect", icon: "cpu", date: "Mar 2026" },
    { code: "COMMUNITY_STAR", title: "Top Contributor", icon: "star", date: "Apr 2026" },
  ],
  recentContributions: [
    {
      repo: "open-telemetry/opentelemetry-python",
      prNumber: 1842,
      title: "fix(worker): implement exponential backoff on HTTP 429",
      mergedAt: "Yesterday",
      impact: "Reduced deadlock probability by 99.4% under upstream rate throttling.",
    },
    {
      repo: "facebook/react",
      prNumber: 29510,
      title: "docs(hooks): clarify invariant violation outside React context",
      mergedAt: "Last week",
      impact: "Eliminated obscure minified error messages for 100k+ learners.",
    },
    {
      repo: "fastapi/fastapi",
      prNumber: 10421,
      title: "feat(pydantic): support computed_field serialization in response",
      mergedAt: "2 weeks ago",
      impact: "Allowed seamless schema validation for dynamic properties.",
    },
  ],
};
