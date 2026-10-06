/**
 * RepoMind-X Central State & Repository Data
 */

export interface IssueItem {
  id: string;
  number: number;
  title: string;
  body: string;
  repository: string;
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
  commentsCount: number;
}

export const ISSUES_DATA: IssueItem[] = [
  {
    id: "1",
    number: 184,
    title: "Fix authentication timeout in token refresh worker",
    body: "The refresh worker hangs when upstream identity broker returns HTTP 429 backoff header, leading to deadlock in async event loop. We should implement exponential backoff with full jitter and a sensible timeout ceiling.",
    repository: "open-telemetry/opentelemetry-python",
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
    updatedAt: "2h ago",
    commentsCount: 2,
  },
  {
    id: "2",
    number: 2841,
    title: "Improve error message for invalid hook usage outside component tree",
    body: "When useId or useContext is invoked outside of a React render boundary in development mode, the invariant error message points to minified bundle numbers instead of a descriptive diagnostic hint with stack trace.",
    repository: "facebook/react",
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
    updatedAt: "5h ago",
    commentsCount: 3,
  },
  {
    id: "3",
    number: 62044,
    title: "Add warning when middleware matcher pattern contains invalid glob syntax",
    body: "If middleware config matcher has unmatched curly braces or regex escape characters, Next.js currently fails during build with an obscure parser crash rather than a graceful build-time diagnostic warning.",
    repository: "vercel/next.js",
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
    updatedAt: "1d ago",
    commentsCount: 4,
  },
  {
    id: "4",
    number: 10420,
    title: "Support Pydantic v2 computed_field serialization in response schema",
    body: "FastAPI response_model filtering skips properties decorated with @computed_field in certain nested union models. Need to ensure model_dump(mode='json') handles computed fields properly.",
    repository: "fastapi/fastapi",
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
    updatedAt: "3h ago",
    commentsCount: 1,
  },
  {
    id: "5",
    number: 5122,
    title: "Add type annotations to Werkzeug session cookie signer",
    body: "The secure cookie signer in flask/sessions.py still contains untyped Any arguments for serializer payloads. Adding explicit Generic[T] annotations will fix Pyright and Mypy strict mode errors.",
    repository: "pallets/flask",
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
    updatedAt: "12h ago",
    commentsCount: 2,
  },
  {
    id: "6",
    number: 119420,
    title: "Rustc diagnostic: suggest borrow when moving out of non-Copy struct field",
    body: "When an expression moves a struct field behind a shared reference, compiler error E0507 is triggered. The compiler should proactively suggest adding & or .clone() with an automatic rustfix machine-applicable suggestion.",
    repository: "rust-lang/rust",
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
    updatedAt: "2d ago",
    commentsCount: 8,
  },
];
