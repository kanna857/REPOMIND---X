/**
 * RepoMind-X GitHub Client and Data Module
 */

export interface GitHubIssue {
  id: string;
  number: number;
  title: string;
  body: string;
  repository: string;
  repositoryUrl: string;
  labels: string[];
  difficulty: 'Beginner' | 'Easy' | 'Intermediate' | 'Advanced';
  language: string;
  stars: number;
  forks: number;
  openIssues: number;
  maintainerResponseHours: number;
  matchScore: number;
  estimatedHours: string;
  claimStatus: 'Available' | 'Potentially Claimed' | 'Assigned';
  assignees: string[];
  updatedAt: string;
  createdAt: string;
  commentsCount: number;
  comments?: Array<{
    user: string;
    body: string;
    created_at: string;
  }>;
}

export const SAMPLE_REPOSITORIES = [
  {
    name: "facebook/react",
    stars: 228000,
    forks: 46000,
    language: "JavaScript / TypeScript",
    description: "The library for web and native user interfaces",
    healthScore: 98,
    openIssues: 840,
    beginnerFriendly: true,
  },
  {
    name: "vercel/next.js",
    stars: 125000,
    forks: 26000,
    language: "TypeScript",
    description: "The React Framework for the Web",
    healthScore: 96,
    openIssues: 2100,
    beginnerFriendly: true,
  },
  {
    name: "fastapi/fastapi",
    stars: 76000,
    forks: 6300,
    language: "Python",
    description: "FastAPI framework, high performance, easy to learn, fast to code, ready for production",
    healthScore: 99,
    openIssues: 540,
    beginnerFriendly: true,
  },
  {
    name: "open-telemetry/opentelemetry-python",
    stars: 1850,
    forks: 820,
    language: "Python",
    description: "The Python implementation of OpenTelemetry",
    healthScore: 94,
    openIssues: 184,
    beginnerFriendly: true,
  },
  {
    name: "pallets/flask",
    stars: 67500,
    forks: 16100,
    language: "Python",
    description: "The Python micro framework for building web applications",
    healthScore: 95,
    openIssues: 112,
    beginnerFriendly: true,
  },
  {
    name: "rust-lang/rust",
    stars: 97000,
    forks: 12000,
    language: "Rust",
    description: "Empowering everyone to build reliable and efficient software",
    healthScore: 93,
    openIssues: 8200,
    beginnerFriendly: false,
  },
];

export const SAMPLE_ISSUES: GitHubIssue[] = [
  {
    id: "iss-101",
    number: 184,
    title: "Fix authentication timeout in token refresh worker",
    body: "The refresh worker hangs when upstream identity broker returns HTTP 429 backoff header, leading to deadlock in async event loop. We should implement exponential backoff with full jitter and a sensible timeout ceiling.",
    repository: "open-telemetry/opentelemetry-python",
    repositoryUrl: "https://github.com/open-telemetry/opentelemetry-python",
    labels: ["good first issue", "bug", "python", "asyncio"],
    difficulty: "Easy",
    language: "Python",
    stars: 1850,
    forks: 820,
    openIssues: 184,
    maintainerResponseHours: 4,
    matchScore: 96,
    estimatedHours: "2-3 hours",
    claimStatus: "Available",
    assignees: [],
    updatedAt: "2 hours ago",
    createdAt: "3 days ago",
    commentsCount: 2,
    comments: [
      {
        user: "maintainer_alex",
        body: "Thanks for reporting. We'd welcome a PR that adds exponential backoff in worker.py!",
        created_at: "2 days ago",
      },
      {
        user: "triager_dev",
        body: "Tagged as good first issue. Make sure to add unit tests in tests/test_worker.py.",
        created_at: "1 day ago",
      },
    ],
  },
  {
    id: "iss-102",
    number: 2841,
    title: "Improve error message for invalid hook usage outside component tree",
    body: "When useId or useContext is invoked outside of a React render boundary in development mode, the invariant error message points to minified bundle numbers instead of a descriptive diagnostic hint.",
    repository: "facebook/react",
    repositoryUrl: "https://github.com/facebook/react",
    labels: ["good first issue", "developer-experience", "documentation", "react"],
    difficulty: "Beginner",
    language: "JavaScript",
    stars: 228000,
    forks: 46000,
    openIssues: 840,
    maintainerResponseHours: 8,
    matchScore: 94,
    estimatedHours: "1-2 hours",
    claimStatus: "Available",
    assignees: [],
    updatedAt: "5 hours ago",
    createdAt: "4 days ago",
    commentsCount: 3,
    comments: [
      {
        user: "gaearon_bot",
        body: "This is a great first contribution. The error table is generated in scripts/error-codes.",
        created_at: "3 days ago",
      },
    ],
  },
  {
    id: "iss-103",
    number: 62044,
    title: "Add warning when middleware matcher pattern contains invalid glob syntax",
    body: "If middleware config matcher has unmatched curly braces or regex escape characters, Next.js currently fails during build with an obscure parser crash rather than a graceful build-time diagnostic warning.",
    repository: "vercel/next.js",
    repositoryUrl: "https://github.com/vercel/next.js",
    labels: ["area: middleware", "help wanted", "good first issue"],
    difficulty: "Easy",
    language: "TypeScript",
    stars: 125000,
    forks: 26000,
    openIssues: 2100,
    maintainerResponseHours: 12,
    matchScore: 91,
    estimatedHours: "2-4 hours",
    claimStatus: "Potentially Claimed",
    assignees: [],
    updatedAt: "1 day ago",
    createdAt: "5 days ago",
    commentsCount: 4,
    comments: [
      {
        user: "sam_contributor",
        body: "I'll take this and open a draft PR shortly!",
        created_at: "18 hours ago",
      },
    ],
  },
  {
    id: "iss-104",
    number: 10420,
    title: "Support Pydantic v2 computed_field serialization in response schema",
    body: "FastAPI response_model filtering skips properties decorated with @computed_field in certain nested union models. Need to ensure model_dump(mode='json') handles computed fields properly.",
    repository: "fastapi/fastapi",
    repositoryUrl: "https://github.com/fastapi/fastapi",
    labels: ["pydantic-v2", "enhancement", "python"],
    difficulty: "Intermediate",
    language: "Python",
    stars: 76000,
    forks: 6300,
    openIssues: 540,
    maintainerResponseHours: 6,
    matchScore: 88,
    estimatedHours: "4-6 hours",
    claimStatus: "Available",
    assignees: [],
    updatedAt: "3 hours ago",
    createdAt: "2 days ago",
    commentsCount: 1,
    comments: [
      {
        user: "tiangolo",
        body: "PRs welcome with test coverage covering both v1 and v2 fallback behavior.",
        created_at: "1 day ago",
      },
    ],
  },
  {
    id: "iss-105",
    number: 5122,
    title: "Add type annotations to Werkzeug session cookie signer",
    body: "The secure cookie signer in flask/sessions.py still contains untyped Any arguments for serializer payloads. Adding explicit Generic[T] annotations will fix Pyright and Mypy strict mode errors.",
    repository: "pallets/flask",
    repositoryUrl: "https://github.com/pallets/flask",
    labels: ["typing", "good first issue", "python"],
    difficulty: "Beginner",
    language: "Python",
    stars: 67500,
    forks: 16100,
    openIssues: 112,
    maintainerResponseHours: 10,
    matchScore: 97,
    estimatedHours: "1-2 hours",
    claimStatus: "Available",
    assignees: [],
    updatedAt: "12 hours ago",
    createdAt: "6 days ago",
    commentsCount: 2,
    comments: [
      {
        user: "davidism",
        body: "Happy to accept a PR for this. Check types in tests/test_basic.py.",
        created_at: "4 days ago",
      },
    ],
  },
  {
    id: "iss-106",
    number: 119420,
    title: "Rustc diagnostic: suggest borrow when moving out of non-Copy struct field",
    body: "When an expression moves a struct field behind a shared reference, compiler error E0507 is triggered. The compiler should proactively suggest adding & or .clone() with an automatic rustfix machine-applicable suggestion.",
    repository: "rust-lang/rust",
    repositoryUrl: "https://github.com/rust-lang/rust",
    labels: ["A-diagnostics", "E-mentor", "compiler"],
    difficulty: "Intermediate",
    language: "Rust",
    stars: 97000,
    forks: 12000,
    openIssues: 8200,
    maintainerResponseHours: 16,
    matchScore: 82,
    estimatedHours: "6-8 hours",
    claimStatus: "Assigned",
    assignees: ["oli-obk"],
    updatedAt: "2 days ago",
    createdAt: "1 week ago",
    commentsCount: 8,
    comments: [
      {
        user: "oli-obk",
        body: "Assigned to myself for mentoring/initial investigation.",
        created_at: "5 days ago",
      },
    ],
  },
];
