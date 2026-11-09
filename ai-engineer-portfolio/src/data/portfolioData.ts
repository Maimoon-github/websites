import {
  ProjectCaseStudy,
  TimelineItem,
  ArticlePost,
  SkillGroup,
  KnowledgeChunk,
} from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Maimoon (Moon) Amin',
  shortName: 'Maimoon Amin',
  formalName: 'M. Maimoon',
  role: 'Agentic AI Engineer',
  tagline: 'Agentic AI Engineer • Full-Stack Developer • Problem Solver',
  headline: 'I build LLM/RAG/agent systems.',
  subheadline:
    'Agentic AI Engineer • Full-Stack Developer • Problem Solver — Turning complex ideas into intelligent, scalable products.',
  summary:
    'Results-driven Agentic AI Engineer specializing in architecting, orchestrating, and deploying scalable autonomous agent systems and LLM backends. Proficient in designing advanced multi-agent workflows using LangGraph, CrewAI, and AutoGen, supported by robust orchestration via LangChain and LlamaIndex. Experienced in optimizing local and cloud model inference (vLLM, Ollama) and building high-performance retrieval architectures utilizing vector databases (Qdrant, Pinecone, Milvus). Adept at delivering production-ready, context-aware AI solutions with stringent observability (Langfuse), safety guardrails (Guardrails AI), and resilient serving infrastructure (FastAPI, Docker, NixOS).',
  status: 'Open to Opportunities',
  available: true,
  email: 'ideal.rhel@gmail.com',
  phone: '03153208241',
  location: 'Lahore, Pakistan (Remote / Worldwide)',
  timezone: 'PKT (UTC+5) · Flexible overlap with US / EU / APAC',
  languages: [
    { name: 'English', proficiency: 'Professional Working & Written Proficiency' },
    { name: 'Urdu', proficiency: 'Native / Bilingual Proficiency' },
  ],
  availabilityDetails:
    'Available for full-time Agentic AI / LLM Systems Engineering roles, contract multi-agent architecture, and technical advisory.',
  socials: {
    github: 'https://github.com/Maimoon-github',
    githubHandle: '/Maimoon-github',
    linkedin: 'https://linkedin.com/in/maimoon-moon-amin',
    linkedinHandle: '/in/maimoon-moon-amin',
    email: 'mailto:ideal.rhel@gmail.com',
  },
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'agents-orchestration',
    category: 'Agents & Orchestration',
    accentColor: '#0F52BA',
    description:
      'Stateful multi-agent graphs, collaborative role-based agent teams, deterministic tool execution, and Model Context Protocol servers.',
    skills: [
      'LangGraph',
      'CrewAI',
      'AutoGen',
      'Pydantic AI',
      'LangChain',
      'LlamaIndex',
      'MCP Tool/Context Layer',
    ],
  },
  {
    id: 'inference-core-ml',
    category: 'Inference & Core ML',
    accentColor: '#50C878',
    description:
      'High-throughput local and cloud model serving, quantized weights, custom deep learning pipelines, and Python backend runtime.',
    skills: ['vLLM', 'Ollama', 'PyTorch', 'TensorFlow', 'Python'],
  },
  {
    id: 'vector-dbs-state',
    category: 'Vector DBs & State Management',
    accentColor: '#DC143C',
    description:
      'Hybrid dense-sparse vector indexing, semantic memory persistence, relational state, and low-latency task brokers.',
    skills: ['Qdrant', 'Pinecone', 'Milvus', 'PostgreSQL (pgvector)', 'Redis'],
  },
  {
    id: 'eval-guardrails',
    category: 'Eval, Observability & Guardrails',
    accentColor: '#0F52BA',
    description:
      'Distributed trace telemetry, prompt regression auditing, schema validation, and runtime safety enforcement.',
    skills: ['Langfuse', 'Guardrails AI'],
  },
  {
    id: 'fullstack-devops',
    category: 'Full-Stack, Serving & DevOps',
    accentColor: '#50C878',
    description:
      'Asynchronous API backends, distributed task queues, modern reactive frontends, reproducible NixOS environments, and CI/CD automation.',
    skills: [
      'FastAPI',
      'Django',
      'Celery',
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Docker',
      'NixOS',
      'CI/CD',
      'IaC',
    ],
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    id: 'dsaamp-2025',
    institution: 'DSAAMP — Dr. Ammar Tufail (PhD Data Science)',
    program: 'Data Science to AI Agents Mentorship Program (DSAAMP)',
    roleOrTrack: 'Generative & Agentic AI Specialization',
    period: '2025',
    location: 'Remote / Intensive Mentorship',
    type: 'mentorship',
    summary:
      'Advanced mentorship covering Data Science, Machine Learning, Deep Learning, and Generative & Agentic AI from Intermediate to Advanced production level.',
    highlights: [
      'Architected end-to-end multi-agent workflows using LangGraph state machines, CrewAI, AutoGen, and Pydantic AI.',
      'Designed hybrid RAG pipelines with Qdrant, Pinecone, and Milvus backed by Langfuse trace observability and Guardrails AI validation.',
      'Deployed production-grade agentic backends combining Django, FastAPI, Celery task queues, and Google Gemini / local Ollama inference.',
    ],
    skills: ['LangGraph', 'CrewAI', 'AutoGen', 'Pydantic AI', 'Deep Learning', 'RAG', 'Qdrant', 'Langfuse'],
    accentColor: '#0F52BA',
  },
  {
    id: 'kodekloud-2022-2023',
    institution: 'KodeKloud',
    program: 'DevOps Engineer Learning Path',
    roleOrTrack: 'DevOps & Cloud Infrastructure Engineering',
    period: '2022 – 2023',
    location: 'Hands-on Cloud & Linux Labs',
    type: 'devops',
    summary:
      'Comprehensive DevOps engineering track progressing from foundational Linux and container concepts to advanced automation, Infrastructure as Code (IaC), and observability.',
    highlights: [
      'CI/CD Pipeline Management & Code Deployment: Automated build, test, and deployment workflows with version control integration.',
      'Infrastructure as Code (IaC) & Tool Configuration: Reproducible container and server provisioning across Docker and declarative Linux environments.',
      'Monitoring, Observability & Security Practices: Performance optimization, incident/problem management, security integration, and backup/disaster recovery operations.',
    ],
    skills: [
      'CI/CD Pipeline Management',
      'Infrastructure as Code (IaC)',
      'Monitoring & Observability',
      'Docker',
      'Security Practices Integration',
      'Backup & Disaster Recovery',
      'Automation',
    ],
    accentColor: '#50C878',
  },
  {
    id: 'alnafi-2020-2021',
    institution: 'Alnafi',
    program: 'AI Advancement Track',
    roleOrTrack: 'Machine Learning, Deep Learning & NLP Labs',
    period: '2020 – 2021',
    location: 'Practical Lab Track',
    type: 'ai-track',
    summary:
      'Hands-on practical training in Artificial Intelligence focusing on foundational and applied Machine Learning, Deep Learning, and Natural Language Processing.',
    highlights: [
      'Implemented supervised and unsupervised ML pipelines and neural network architectures in Python, PyTorch, and TensorFlow.',
      'Built natural language processing (NLP) preprocessing, tokenization, and sequence classification models.',
      'Established rigorous model evaluation and cross-validation workflows on structured and unstructured datasets.',
    ],
    skills: ['Python', 'PyTorch', 'TensorFlow', 'Machine Learning', 'Deep Learning', 'NLP'],
    accentColor: '#DC143C',
  },
  {
    id: 'hallmark-2020',
    institution: 'Hallmark Academy',
    program: 'Spoken & Written English Program',
    roleOrTrack: 'Professional Communication & Composition',
    period: '2020',
    location: 'Lahore, Pakistan',
    type: 'communication',
    summary:
      'Intensive communication training focused on formal and informal written and oral English fluency for technical and collaborative environments.',
    highlights: [
      'Communicated effectively in written and oral English across peer and formal professional settings.',
      'Applied accurate English grammar and composed structured technical and analytical writing components.',
    ],
    skills: ['Technical Writing', 'Oral Communication', 'Documentation', 'English Fluency'],
    accentColor: '#0F52BA',
  },
];

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'agentic-review-architecture',
    slug: 'agentic-review-architecture',
    title: 'Agentic-Review-Architecture',
    subtitle: 'Agent Flow — Multi-Agent Orchestration System',
    category: 'agents',
    categoryLabel: 'Multi-Agent System',
    year: '2025',
    role: 'Lead Agentic AI Architect',
    status: 'Production-Ready',
    summary:
      'A production-ready Django + Celery + Google Gemini multi-agent pipeline that collaboratively plans, writes, edits, and quality-reviews content through iterative critique-refinement loops.',
    techStack: [
      'Django',
      'Celery',
      'Google Gemini',
      'Redis',
      'PostgreSQL',
      'Langfuse',
      'Guardrails AI',
      'Docker',
    ],
    metrics: [
      { label: 'Pipeline Architecture', value: '4-Stage Agent Loop' },
      { label: 'Execution Model', value: 'Async Celery Workers' },
      { label: 'Quality Gate', value: 'Iterative Critique' },
    ],
    problem:
      'Single-pass LLM prompts frequently produce shallow structure, inconsistent tone, or unverified claims when generating long-form technical content. Synchronous HTTP request handlers also time out during multi-step reasoning and critique cycles.',
    constraints: [
      'Must execute long-running multi-agent loops asynchronously without blocking Django web workers.',
      'Every stage transition requires strict schema validation and deterministic retry boundaries to prevent infinite agent loops.',
      'Full trace observability across Planner, Writer, Editor, and Quality-Reviewer personas.',
    ],
    architecture: {
      overview:
        'Distributed multi-agent pipeline orchestrated via Django and asynchronous Celery workers backed by Redis and PostgreSQL, invoking Google Gemini with structured Guardrails AI validation and Langfuse tracing.',
      components: [
        'Planner Agent: Decomposes topic brief into structured section outlines, target audience constraints, and verification criteria.',
        'Writer Agent: Synthesizes grounded draft sections from the approved structural plan using Google Gemini.',
        'Editor Agent: Audits structural coherence, clarity, and style alignment, emitting targeted revision diffs.',
        'Quality-Reviewer Agent: Evaluates the draft against rubric thresholds; triggers iterative critique-refinement loops until quality gates pass.',
        'Celery + Redis Task Fabric: Manages asynchronous state transitions, retries, and real-time job progress persistence in PostgreSQL.',
      ],
      dataFlow:
        'Django API Request → Celery Task Dispatch (Redis) → Planner Agent → Writer Agent → Editor Agent ⇄ Quality-Reviewer Critique Loop (Max N Iterations) → Guardrails Validation → PostgreSQL Persistence',
    },
    implementation: {
      challenges:
        'Coordinating stateful iterative loops across asynchronous Celery tasks while preventing runaway token consumption when the Quality-Reviewer rejects a draft.',
      solutions:
        'Implemented explicit state-machine checkpoints in PostgreSQL with bounded revision counters, structured JSON rubric outputs, and Langfuse span telemetry per agent turn.',
      codeSnippet: {
        language: 'python',
        title: 'agents/pipeline_tasks.py',
        code: `@shared_task(bind=True, max_retries=3)
def execute_agentic_review_pipeline(self, job_id: str, max_iterations: int = 3):
    job = ReviewJob.objects.get(id=job_id)
    plan = planner_agent.run(topic=job.prompt, constraints=job.constraints)
    draft = writer_agent.run(plan=plan)

    for iteration in range(1, max_iterations + 1):
        edited = editor_agent.run(draft=draft, plan=plan)
        review = quality_reviewer_agent.evaluate(draft=edited, rubric=job.rubric)
        job.record_checkpoint(iteration=iteration, score=review.score, feedback=review.critique)

        if review.passed:
            job.complete(final_content=edited)
            return {"status": "approved", "iterations": iteration, "score": review.score}

        draft = writer_agent.refine(draft=edited, critique=review.critique)

    job.complete(final_content=edited, flagged_for_human=True)
    return {"status": "max_iterations_reached", "iterations": max_iterations}`,
      },
    },
    results: {
      impact: [
        'Eliminated single-pass structural flaws through collaborative 4-agent planning, writing, editing, and critique-refinement loops.',
        'Decoupled multi-turn Gemini reasoning from web worker threads using Celery and Redis for resilient background execution.',
        'Enforced deterministic termination and full trace auditability across every critique cycle.',
      ],
      takeaways:
        'Pairing asynchronous task queues (Celery/Redis) with bounded critique-refinement loops turns brittle prompt chains into reliable production workflows.',
    },
    demoType: 'agent-flow',
    githubUrl: 'https://github.com/Maimoon-github',
  },
  {
    id: 'ai-learning-career-coach',
    slug: 'ai-learning-career-coach',
    title: 'AI-Learning-Career-Coach',
    subtitle: 'Personalized AI Learning & Career Coach',
    category: 'agents',
    categoryLabel: 'LangGraph + CrewAI',
    year: '2025',
    role: 'Agentic AI Engineer',
    status: 'Production-Grade',
    summary:
      'A production-grade multi-agent system that delivers adaptive, personalized learning paths and career coaching by orchestrating LangGraph (workflow state machine) with CrewAI (collaborative agent teams) against a locally-served Ollama LLM.',
    techStack: [
      'LangGraph',
      'CrewAI',
      'Ollama',
      'Python',
      'FastAPI',
      'Qdrant',
      'Pydantic AI',
      'Docker',
    ],
    metrics: [
      { label: 'State Orchestration', value: 'LangGraph FSM' },
      { label: 'Agent Collaboration', value: 'CrewAI Teams' },
      { label: 'Inference Privacy', value: '100% Local Ollama' },
    ],
    problem:
      'Self-directed learners and engineers struggle with static curricula that ignore their existing skill gaps, while cloud-hosted coaching tools raise privacy and token-cost barriers for continuous daily mentoring.',
    constraints: [
      'Must run 100% against a locally-served Ollama LLM with zero external API token spend or data leakage.',
      'Requires deterministic cyclic workflow control (skill assessment → curriculum synthesis → milestone evaluation) alongside role-specialized agent collaboration.',
      'Must persist learner vector memory and progress state across sessions.',
    ],
    architecture: {
      overview:
        'Hybrid orchestration combining a macro-level LangGraph workflow state machine with micro-level CrewAI collaborative agent crews, backed by local Ollama inference and Qdrant vector memory.',
      components: [
        'LangGraph Workflow State Machine: Governs high-level learner state transitions (Diagnostic → Path Generation → Practice Lab → Competency Gate).',
        'CrewAI Skill Diagnostic Crew: Evaluates current proficiency across target engineering roles and identifies prerequisite gaps.',
        'CrewAI Curriculum & Career Crew: Synthesizes weekly hands-on projects, interview prep drills, and portfolio milestones.',
        'Local Ollama Inference Engine: Serves quantized open-weights models locally with low-latency streaming.',
        'Qdrant Vector Memory: Stores learner history, completed labs, and retrieved reference documentation.',
      ],
      dataFlow:
        'Learner Profile → LangGraph State Node → CrewAI Diagnostic & Coaching Crew → Local Ollama LLM Inference → Pydantic Schema Validation → Qdrant Memory Update → Adaptive Roadmap',
    },
    implementation: {
      challenges:
        'Local models served via Ollama have tighter context windows and stricter formatting sensitivity when switching between LangGraph state nodes and CrewAI task handoffs.',
      solutions:
        'Used Pydantic AI typed contracts at every node boundary and compacted intermediate CrewAI agent scratchpads before committing state updates to the LangGraph graph.',
      codeSnippet: {
        language: 'python',
        title: 'orchestrator/learning_graph.py',
        code: `class LearnerState(TypedDict):
    profile: dict
    skill_gaps: list[str]
    roadmap: dict
    mastery_score: float

def run_coaching_crew(state: LearnerState) -> LearnerState:
    crew = Crew(
        agents=[curriculum_architect, career_mentor],
        tasks=[build_curriculum_task(state["skill_gaps"]), align_career_projects_task(state["profile"])],
        llm=ollama_llm,
        process=Process.sequential,
    )
    result = crew.kickoff()
    return {**state, "roadmap": result.pydantic.model_dump()}

workflow = StateGraph(LearnerState)
workflow.add_node("diagnose_skills", diagnose_node)
workflow.add_node("coaching_crew", run_coaching_crew)
workflow.add_node("evaluate_mastery", mastery_gate_node)
workflow.add_edge(START, "diagnose_skills")
workflow.add_edge("diagnose_skills", "coaching_crew")
workflow.add_conditional_edges("evaluate_mastery", route_by_mastery)`,
      },
    },
    results: {
      impact: [
        'Delivered adaptive, personalized learning paths and career roadmaps tailored to individual skill diagnostics.',
        'Proved the synergy of combining LangGraph deterministic state machines with CrewAI collaborative multi-agent teams.',
        'Achieved complete data privacy and zero per-token cloud billing via local Ollama model serving.',
      ],
      takeaways:
        'Combining LangGraph for explicit graph control flow with CrewAI for role-based team collaboration provides the best of both agentic paradigms.',
    },
    demoType: 'career-coach',
    githubUrl: 'https://github.com/Maimoon-github',
  },
  {
    id: 'fullstack-ai-portfolio-rag',
    slug: 'fullstack-ai-portfolio-rag',
    title: 'Full-Stack AI Portfolio & RAG Platform',
    subtitle: 'Personal Full-Stack Website with Grounded RAG & MCP Server',
    category: 'rag',
    categoryLabel: 'RAG + MCP Platform',
    year: '2025',
    role: 'Full-Stack AI Engineer',
    status: 'Live & Open-Source',
    summary:
      'A personal full-stack AI engineering platform combining a Next.js, React, and TypeScript frontend with Django/Node backend services, hybrid vector retrieval, an embedded citation-grounded RAG assistant, and a public MCP server.',
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Django',
      'Tailwind CSS',
      'Three.js',
      'PostgreSQL (pgvector)',
      'Qdrant',
      'MCP',
    ],
    metrics: [
      { label: 'Retrieval Engine', value: 'Hybrid RRF + Citations' },
      { label: 'Agent Protocol', value: 'JSON-RPC 2.0 MCP' },
      { label: '3D Visuals', value: 'Three.js PBR Gem' },
    ],
    problem:
      'Static developer portfolios fail to demonstrate real-world full-stack AI engineering, while ungrounded chatbots hallucinate experience or cannot be queried programmatically by AI coding agents and technical recruiters.',
    constraints: [
      'Must unify a single source of truth across UI pages, printable CV, RAG vector chunks, /llms.txt, and MCP tools.',
      '3D WebGL gemstone centerpiece must maintain 60fps with software-WebGL fallback, DPR clamping, and reduced-motion compliance.',
      'Every RAG answer must include inline verifiable citations pointing directly to portfolio sections.',
    ],
    architecture: {
      overview:
        'Full-stack architecture pairing a reactive Next.js/React + TypeScript + Three.js frontend with backend API services (Django & Node/Express), hybrid sparse-dense retrieval, and a public Model Context Protocol (`/mcp`) endpoint.',
      components: [
        'Single-Source-of-Truth Knowledge Layer: Unified schema feeding pages, case studies, essays, `/resume`, `/llms.txt`, and RAG chunks.',
        'Hybrid RAG Retriever: Combines semantic embeddings and BM25 lexical scoring via Reciprocal Rank Fusion (RRF) with inline citation tags.',
        'Public MCP Server (`/mcp`): Exposes `search_content`, `get_case_study`, `get_experience`, and `check_availability` over JSON-RPC 2.0.',
        '3D Faceted Gemstone Viewport: Custom Three.js PBR crystal with Sapphire, Emerald, Crimson, and Obsidian facets and off-screen pause.',
      ],
      dataFlow:
        'Visitor / AI Client → Next.js & React UI or /mcp JSON-RPC → Hybrid Retriever (Lexical + Vector RRF) → Top-K Grounded Chunks → Streaming Response with Citations',
    },
    implementation: {
      challenges:
        'Keeping the 3D WebGL canvas responsive across desktop and headless/software renderers while simultaneously supporting multi-route navigation, command palette search, and streaming SSE chat.',
      solutions:
        'Isolated the Three.js lifecycle in a persistent ref container with `IntersectionObserver` pause, DPR `[1, 1.5]` clamping, and unified client/server routing.',
      codeSnippet: {
        language: 'typescript',
        title: 'server/mcpHandler.ts',
        code: `export function handleMcpJsonRpc(request: JsonRpcRequest) {
  const { method, params, id } = request;
  if (method === 'tools/list') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        tools: ['search_content', 'get_case_study', 'get_experience', 'check_availability'],
      },
    };
  }
  if (method === 'tools/call') {
    const toolResult = executePortfolioMcpTool(params.name, params.arguments);
    return { jsonrpc: '2.0', id, result: toolResult };
  }
}`,
      },
    },
    results: {
      impact: [
        'Created a living full-stack proof-of-work combining Next.js/React/TypeScript frontend craft with Django and AI backend architecture.',
        'Enabled recruiters and engineering leads to audit Maimoon’s projects interactively with source-cited RAG responses.',
        'Exposed machine-readable `/llms.txt` and `/mcp` endpoints for programmatic agent discovery.',
      ],
      takeaways:
        'An AI engineer’s portfolio should itself be an observable, citation-grounded AI product.',
    },
    demoType: 'rag-mcp',
    githubUrl: 'https://github.com/Maimoon-github',
  },
];

export const ARTICLES: ArticlePost[] = [
  {
    id: 'langgraph-vs-crewai-production',
    slug: 'orchestrating-langgraph-and-crewai-with-local-ollama',
    title: 'Orchestrating LangGraph State Machines with CrewAI Teams on Local Ollama',
    subtitle:
      'How to combine deterministic cyclic state graphs with collaborative role-based agent crews using Pydantic AI guardrails and local inference.',
    date: 'October 2025',
    readTime: '7 min read',
    category: 'Agents & Orchestration',
    series: 'Production Agentic Systems',
    summary:
      'Architectural blueprint from building AI-Learning-Career-Coach: using LangGraph for macro state transitions and CrewAI for collaborative multi-agent sub-tasks on local Ollama models.',
    tags: ['LangGraph', 'CrewAI', 'Ollama', 'Pydantic AI', 'Agents'],
    headings: [
      { id: 'state-vs-roles', text: 'Why Combine LangGraph and CrewAI?' },
      { id: 'typed-boundaries', text: 'Enforcing Typed Boundaries with Pydantic AI' },
      { id: 'local-ollama-tuning', text: 'Optimizing Local Ollama Inference & Context' },
    ],
    content: `## Why Combine LangGraph and CrewAI?

When designing autonomous systems like **AI-Learning-Career-Coach**, engineers often treat \`LangGraph\` and \`CrewAI\` as mutually exclusive choices. In practice, they solve two distinct layers of the orchestration stack:

1. **Macro-Level State Control (LangGraph)**: Learning paths require cyclic evaluation loops—diagnosing skills, assigning practice labs, grading competency, and branching conditionally. A finite state graph guarantees that transitions follow strict rules.
2. **Micro-Level Collaborative Synthesis (CrewAI)**: Inside a single graph node (such as curriculum synthesis), having a *Curriculum Architect* agent collaborate with a *Career Mentor* agent produces richer, peer-reviewed roadmaps than a monolithic prompt.

## Enforcing Typed Boundaries with Pydantic AI

When passing control from a CrewAI team back into a LangGraph \`TypedDict\` state node, unstructured prose quickly corrupts downstream transitions. Every crew kickoff must terminate in a validated schema accompanied by **Guardrails AI** checks:

\`\`\`python
from pydantic import BaseModel, Field

class WeeklyMilestone(BaseModel):
    week: int = Field(ge=1, le=12)
    objective: str
    hands_on_lab: str
    verification_criteria: list[str]

class LearningRoadmap(BaseModel):
    target_role: str
    identified_gaps: list[str]
    milestones: list[WeeklyMilestone]
\`\`\`

## Optimizing Local Ollama Inference & Context

Running multi-agent workflows against a locally-served **Ollama** LLM (or **vLLM** in cluster deployments) eliminates cloud token costs and keeps user data private, but requires disciplined context hygiene:
- **Scratchpad Compaction**: Only persist the validated Pydantic output into the LangGraph state, discarding verbose intermediate inter-agent dialogue before the next node executes.
- **Vector Memory Offloading**: Store historical session context in **Qdrant** and retrieve only the top-k relevant milestones for each turn.`,
  },
  {
    id: 'django-celery-gemini-agent-loops',
    slug: 'asynchronous-multi-agent-critique-loops-django-celery-gemini',
    title: 'Asynchronous Multi-Agent Critique Loops with Django, Celery & Google Gemini',
    subtitle:
      'Designing resilient background pipelines that plan, write, edit, and quality-review content with Langfuse observability.',
    date: 'September 2025',
    readTime: '6 min read',
    category: 'Backend & Infrastructure',
    series: 'Production Agentic Systems',
    summary:
      'Lessons from architecting Agentic-Review-Architecture: decoupling iterative multi-agent critique-refinement loops from HTTP request cycles using Django, Celery, and Redis.',
    tags: ['Django', 'Celery', 'Google Gemini', 'Langfuse', 'Guardrails AI'],
    headings: [
      { id: 'why-async-queues', text: 'Decoupling Agent Loops from Web Workers' },
      { id: 'critique-refinement', text: 'The 4-Stage Critique-Refinement Pattern' },
      { id: 'observability-langfuse', text: 'Trace Observability with Langfuse' },
    ],
    content: `## Decoupling Agent Loops from Web Workers

A multi-agent system that plans, drafts, edits, and critiques content across 3–4 refinement iterations can easily take 25–60 seconds. Running that loop inside a synchronous web worker starves connection pools and causes gateway timeouts.

In **Agentic-Review-Architecture**, **Django** serves as the state and API layer while **Celery** workers (backed by **Redis** and **PostgreSQL**) execute each agent step asynchronously.

## The 4-Stage Critique-Refinement Pattern

Instead of hoping a single prompt produces publication-ready output, the pipeline separates generation from evaluation:

\`\`\`
Planner Agent ──► Writer Agent ──► Editor Agent ──► Quality-Reviewer Agent
                       ▲                                    │
                       └────── Iterative Critique Loop ─────┘
\`\`\`

1. **Planner**: Establishes structural outline and factual constraints.
2. **Writer**: Drafts content aligned to the plan using **Google Gemini**.
3. **Editor**: Polishes flow, formatting, and conciseness.
4. **Quality-Reviewer**: Scores the draft against an explicit rubric. If any dimension falls below threshold, it emits actionable critique back to the Writer (bounded by \`max_iterations = 3\`).

## Trace Observability with Langfuse

In multi-agent loops, debugging a regression requires inspecting the exact prompt, rubric score, and latency of every iteration. Wrapping each Celery task step with **Langfuse** spans and **Guardrails AI** validators ensures full production visibility and deterministic safety.`,
  },
  {
    id: 'hybrid-rag-vector-databases-nixos',
    slug: 'high-performance-rag-qdrant-pinecone-milvus-nixos',
    title: 'High-Performance Retrieval & Reproducible AI Infrastructure with Qdrant & NixOS',
    subtitle:
      'Evaluating Qdrant, Pinecone, Milvus, and pgvector for grounded RAG systems deployed on declarative Docker and NixOS environments.',
    date: 'August 2025',
    readTime: '8 min read',
    category: 'RAG & Infrastructure',
    series: 'AI Infrastructure & DevOps',
    summary:
      'How to pair hybrid dense-sparse vector retrieval across Qdrant, Pinecone, Milvus, and PostgreSQL with reproducible NixOS and Docker serving pipelines.',
    tags: ['Qdrant', 'Pinecone', 'Milvus', 'NixOS', 'Docker', 'FastAPI'],
    headings: [
      { id: 'vector-db-tradeoffs', text: 'Choosing Between Qdrant, Pinecone, Milvus & pgvector' },
      { id: 'hybrid-rrf', text: 'Hybrid Retrieval with Reciprocal Rank Fusion' },
      { id: 'declarative-infra', text: 'Reproducible AI Serving with NixOS, Docker & FastAPI' },
    ],
    content: `## Choosing Between Qdrant, Pinecone, Milvus & pgvector

Having built retrieval pipelines across **Qdrant**, **Pinecone**, **Milvus**, and **PostgreSQL (pgvector)**, choosing the right vector store depends on operational constraints:
- **Qdrant**: Rust-powered efficiency, rich payload filtering, and seamless local-to-cloud Docker deployment—ideal for agent memory and hybrid search.
- **Pinecone**: Managed serverless scale when zero-ops cloud elasticity is the primary constraint.
- **Milvus**: High-throughput distributed indexing for multi-million vector collections.
- **PostgreSQL + Redis**: Keeps relational state, transactional checkpoints, and low-latency semantic cache layers unified.

## Hybrid Retrieval with Reciprocal Rank Fusion

Pure dense embeddings capture conceptual similarity but can miss exact identifiers (such as package names, phone numbers, or framework versions). Combining BM25 lexical matching with dense vector similarity via **Reciprocal Rank Fusion (RRF)** ensures both keyword precision and semantic recall:

\`\`\`
RRF_Score(doc) = 1 / (60 + rank_lexical(doc)) + 1 / (60 + rank_semantic(doc))
\`\`\`

## Reproducible AI Serving with NixOS, Docker & FastAPI

Drawing from DevOps engineering practices (**KodeKloud**) and **NixOS**, declarative environment configuration eliminates "works on my machine" drift across Python CUDA/CPU dependencies, **vLLM** / **Ollama** model servers, and **FastAPI** microservices.`,
  },
];

export const USES_STACK = [
  {
    category: 'Agent Frameworks & Orchestration',
    items: [
      { name: 'LangGraph', detail: 'Deterministic stateful cyclic graphs and conditional agent routing.' },
      { name: 'CrewAI & AutoGen', detail: 'Role-specialized multi-agent collaboration and conversational task teams.' },
      { name: 'Pydantic AI & Guardrails AI', detail: 'Strict schema enforcement, structured outputs, and runtime safety checks.' },
      { name: 'LangChain & LlamaIndex', detail: 'Document ingestion, chunking pipelines, and tool abstractions.' },
      { name: 'MCP (Model Context Protocol)', detail: 'Standardized JSON-RPC context and tool exposure for LLM clients.' },
    ],
  },
  {
    category: 'Inference, Models & Observability',
    items: [
      { name: 'vLLM & Ollama', detail: 'High-throughput PagedAttention serving and privacy-first local LLM execution.' },
      { name: 'Google Gemini & PyTorch / TensorFlow', detail: 'Cloud reasoning & embedding models alongside custom deep learning workflows.' },
      { name: 'Langfuse', detail: 'Open-source LLM engineering observability, trace trees, and prompt evaluation.' },
    ],
  },
  {
    category: 'Data, Vector Stores & Infrastructure',
    items: [
      { name: 'Qdrant, Pinecone & Milvus', detail: 'High-dimensional vector similarity search and metadata filtering.' },
      { name: 'PostgreSQL & Redis', detail: 'Relational state persistence, pgvector indexing, and Celery task brokering.' },
      { name: 'FastAPI, Django & Celery', detail: 'Production Python REST/streaming backends and distributed task queues.' },
      { name: 'NixOS, Docker & CI/CD (IaC)', detail: 'Declarative reproducible Linux systems, containerized deployments, and automated pipelines.' },
    ],
  },
];

export const ENDORSEMENTS = [
  {
    id: 'endorsement-dsaamp',
    quote:
      'Maimoon consistently translates complex multi-agent architectures—combining LangGraph state machines, CrewAI teams, and hybrid vector retrieval—into resilient, observable backend systems.',
    author: 'DSAAMP Mentorship Cohort',
    role: 'Data Science to AI Agents Mentorship Program (2025)',
    context: 'Generative & Agentic AI Specialization',
    accentColor: '#0F52BA',
  },
  {
    id: 'endorsement-architecture',
    quote:
      'Pairing asynchronous Django + Celery task queues with iterative Gemini critique-refinement loops and Langfuse telemetry solved our long-form generation reliability bottlenecks.',
    author: 'Architecture Review Benchmark',
    role: 'Agentic-Review-Architecture Case Study',
    context: '4-Stage Multi-Agent Pipeline',
    accentColor: '#50C878',
  },
  {
    id: 'endorsement-devops',
    quote:
      'Disciplined DevOps foundation across Docker, NixOS declarative environments, CI/CD automation, and local Ollama/vLLM model serving ensures zero configuration drift in production.',
    author: 'Infrastructure & MLOps Track',
    role: 'KodeKloud & Reproducible AI Serving',
    context: 'DevOps & Cloud Engineering',
    accentColor: '#DC143C',
  },
];

export interface PortfolioSourceBundle {
  personalInfo?: typeof PERSONAL_INFO;
  skillGroups?: SkillGroup[];
  timeline?: TimelineItem[];
  projects?: ProjectCaseStudy[];
  articles?: ArticlePost[];
  customChunks?: KnowledgeChunk[];
}

/**
 * Build unified RAG knowledge chunks from either the default constants or a live CMS store bundle.
 */
export function buildKnowledgeChunks(bundle: PortfolioSourceBundle = {}): KnowledgeChunk[] {
  const info = bundle.personalInfo || PERSONAL_INFO;
  const skills = bundle.skillGroups || SKILL_GROUPS;
  const projects = bundle.projects || PROJECTS;
  const timeline = bundle.timeline || TIMELINE;
  const articles = bundle.articles || ARTICLES;
  const customChunks = bundle.customChunks || [];

  const chunks: KnowledgeChunk[] = [
    ...customChunks,
    {
      id: 'chunk-profile-overview',
      sourceType: 'profile',
      slug: 'maimoon-amin-profile',
      title: `${info.name} — Profile & Contact`,
      url: '/about',
      content: `${info.name} (${info.formalName}) is an ${info.role} based in ${info.location}. Contact Email: ${info.email}, Phone: ${info.phone}, LinkedIn: ${info.socials.linkedinHandle} (${info.socials.linkedin}), GitHub: ${info.socials.githubHandle} (${info.socials.github}). Languages: English and Urdu. Status: ${info.status}. ${info.summary}`,
      keywords: [
        'maimoon',
        'moon',
        'amin',
        'contact',
        'email',
        'phone',
        'lahore',
        'pakistan',
        'remote',
        'linkedin',
        'github',
        'hire',
        'available',
        'availability',
        'languages',
        'english',
        'urdu',
      ],
    },
    {
      id: 'chunk-skills-matrix',
      sourceType: 'skills',
      slug: 'technical-skills',
      title: 'Technical Skills & Stack Matrix',
      url: '/resume',
      content: skills
        .map((g) => `${g.category}: ${g.skills.join(', ')} (${g.description})`)
        .join(' | '),
      keywords: [
        'skills',
        'stack',
        'tools',
        ...skills.flatMap((g) => g.skills.map((s) => s.toLowerCase())),
      ],
    },
  ];

  for (const project of projects) {
    chunks.push({
      id: `chunk-work-${project.slug}`,
      sourceType: 'work',
      slug: project.slug,
      title: `Case Study: ${project.title} (${project.subtitle})`,
      url: `/work/${project.slug}`,
      content: `${project.title} — ${project.subtitle}. Summary: ${project.summary} Stack: ${project.techStack.join(', ')}. Problem: ${project.problem} Constraints: ${project.constraints.join('; ')}. Architecture: ${project.architecture.overview} Components: ${project.architecture.components.join('; ')}. Implementation: ${project.implementation.solutions} Results: ${project.results.impact.join(' ')}`,
      keywords: [
        project.slug,
        project.title.toLowerCase(),
        ...project.techStack.map((t) => t.toLowerCase()),
        'project',
        'case study',
        'work',
        'architecture',
      ],
    });
  }

  for (const item of timeline) {
    chunks.push({
      id: `chunk-timeline-${item.id}`,
      sourceType: 'timeline',
      slug: item.id,
      title: `${item.institution} (${item.period}) — ${item.program}`,
      url: '/resume',
      content: `${item.period}: ${item.institution} — ${item.program} (${item.roleOrTrack}). ${item.summary} Highlights: ${item.highlights.join(' ')} Skills: ${item.skills.join(', ')}.`,
      keywords: [
        item.institution.toLowerCase(),
        item.program.toLowerCase(),
        item.period.toLowerCase(),
        'education',
        'timeline',
        'experience',
        'dsaamp',
        'ammar tufail',
        'kodekloud',
        'devops',
        'alnafi',
        'hallmark',
      ],
    });
  }

  for (const post of articles) {
    chunks.push({
      id: `chunk-writing-${post.slug}`,
      sourceType: 'writing',
      slug: post.slug,
      title: `Article: ${post.title}`,
      url: `/writing/${post.slug}`,
      content: `${post.title} (${post.date}). ${post.subtitle} Summary: ${post.summary} Tags: ${post.tags.join(', ')}. Excerpt: ${post.content.slice(0, 650)}`,
      keywords: [
        post.slug,
        ...post.tags.map((t) => t.toLowerCase()),
        'blog',
        'article',
        'writing',
        'essay',
      ],
    });
  }

  chunks.push({
    id: 'chunk-colophon',
    sourceType: 'colophon',
    slug: 'colophon',
    title: 'Colophon & Site Architecture',
    url: '/colophon',
    content:
      'This open-source portfolio (MIT/Apache-2.0) is built for Maimoon (Moon) Amin with Next.js/React, TypeScript, Tailwind CSS, Three.js PBR 3D Gemstone visuals, Motion animations, a centralized Admin Console with file-backed JSON persistence, a hybrid lexical + semantic RAG assistant with inline citations, /llms.txt, and a public JSON-RPC 2.0 MCP server at /mcp.',
    keywords: ['colophon', 'mcp', 'llms.txt', 'open source', 'three.js', 'how this site is built'],
  });

  return chunks;
}

export const KNOWLEDGE_CHUNKS: KnowledgeChunk[] = buildKnowledgeChunks();

