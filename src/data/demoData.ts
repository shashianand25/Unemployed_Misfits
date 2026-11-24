import type { UserProfile, JobAnalysis, Application, InterviewQuestion } from '../types';

export const DEMO_USER: UserProfile = {
  name: 'Alex Morgan',
  educationLevel: "Bachelor's Degree",
  fieldOfStudy: 'Computer Science',
  careerGoal: 'Software Developer',
  existingSkills: ['Python', 'PostgreSQL', 'REST APIs'],
  preferredRole: 'Backend Engineering Intern',
};

export const BACKEND_JOB_DESCRIPTION = `Backend Engineering Intern

We are looking for a backend engineering intern with experience in Python, PostgreSQL, Redis, Docker, and REST APIs.

Responsibilities:
- Develop backend services using Python.
- Build and maintain REST APIs.
- Work with PostgreSQL databases.
- Understand caching and job queues using Redis.
- Containerise applications using Docker.
- Collaborate with engineering teams.

Required skills: Python, PostgreSQL, Redis, Docker, REST APIs.`;

export const DEMO_ANALYSIS: JobAnalysis = {
  jobTitle: 'Backend Engineering Intern',
  matchScore: 60,
  matchedSkills: ['Python', 'PostgreSQL', 'REST APIs'],
  missingSkills: ['Redis', 'Docker'],
  recommendedSkills: ['Background processing', 'Distributed systems fundamentals', 'Containerisation'],
  recommendedProject: {
    id: 'distributed-job-queue',
    title: 'Distributed Job Queue System',
    description:
      'Build a production-grade distributed job queue system using Python, Redis, PostgreSQL, and Docker. This project demonstrates backend engineering skills including async processing, caching, containerisation, and REST API design.',
    technologies: ['Python', 'Redis', 'PostgreSQL', 'Docker', 'FastAPI', 'Celery'],
    githubUrl: '',
    demoUrl: '',
    milestones: [
      {
        id: 'ms-1',
        title: 'Project Setup & Core Models',
        description: 'Initialise the project structure, set up PostgreSQL schema, and create core domain models.',
        status: 'active',
        tasks: [
          'Initialise Python project with Poetry/pip and directory structure',
          'Define PostgreSQL schema for jobs, queues, and workers',
          'Create SQLAlchemy ORM models for Job, Queue, and Worker',
          'Write database migration scripts with Alembic',
        ],
      },
      {
        id: 'ms-2',
        title: 'Redis Integration & Queue Logic',
        description: 'Connect Redis for fast job queuing and implement core queue operations.',
        status: 'locked',
        tasks: [
          'Set up Redis connection with redis-py and connection pooling',
          'Implement FIFO queue push/pop operations using Redis lists',
          'Add priority queue support using Redis sorted sets',
          'Write unit tests for queue operations',
        ],
      },
      {
        id: 'ms-3',
        title: 'Worker & Task Processor',
        description: 'Build the background worker that picks up and processes jobs from the queue.',
        status: 'locked',
        tasks: [
          'Implement Celery worker configuration with Redis as broker',
          'Create task processor with retry logic and exponential back-off',
          'Handle job status transitions (pending → running → done/failed)',
          'Add dead-letter queue for failed jobs after max retries',
        ],
      },
      {
        id: 'ms-4',
        title: 'REST API Layer',
        description: 'Expose the job queue system via a FastAPI REST API.',
        status: 'locked',
        tasks: [
          'Create FastAPI application with OpenAPI docs',
          'Implement POST /jobs endpoint to enqueue a job',
          'Implement GET /jobs/:id endpoint to poll job status',
          'Implement GET /queues/:name/stats endpoint for queue metrics',
        ],
      },
      {
        id: 'ms-5',
        title: 'Containerisation with Docker',
        description: 'Package the full system into Docker containers with Docker Compose.',
        status: 'locked',
        tasks: [
          'Write Dockerfile for the FastAPI application',
          'Write Dockerfile for the Celery worker',
          'Create docker-compose.yml with app, worker, Redis, and PostgreSQL services',
          'Add health checks and environment variable configuration',
        ],
      },
      {
        id: 'ms-6',
        title: 'Monitoring, Docs & Portfolio Polish',
        description: 'Add monitoring, write documentation, and polish the project for portfolio showcase.',
        status: 'locked',
        tasks: [
          'Integrate Flower dashboard for Celery task monitoring',
          'Write comprehensive README with architecture diagram',
          'Add Prometheus metrics endpoint to the FastAPI app',
          'Record a 2-minute demo video and push to GitHub',
        ],
      },
    ],
  },
};

export const DEMO_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    company: 'Stripe',
    jobTitle: 'Backend Engineering Intern',
    requiredSkills: ['Python', 'PostgreSQL', 'Redis', 'Docker', 'REST APIs'],
    matchScore: 60,
    status: 'preparing',
  },
  {
    id: 'app-2',
    company: 'Cloudflare',
    jobTitle: 'Software Engineering Intern',
    requiredSkills: ['Python', 'Go', 'REST APIs', 'Distributed Systems'],
    matchScore: 55,
    status: 'interested',
  },
  {
    id: 'app-3',
    company: 'Supabase',
    jobTitle: 'Backend Intern',
    requiredSkills: ['PostgreSQL', 'REST APIs', 'Docker', 'TypeScript'],
    matchScore: 70,
    status: 'applied',
  },
  {
    id: 'app-4',
    company: 'PlanetScale',
    jobTitle: 'Database Engineering Intern',
    requiredSkills: ['PostgreSQL', 'MySQL', 'Python', 'Redis'],
    matchScore: 65,
    status: 'interview',
  },
];

// Alias for backwards compatibility: InterviewQuestion[] = [
  {
    id: 'q-1',
    question: 'What is Redis and how does it differ from a traditional relational database like PostgreSQL?',
    type: 'technical',
    suggestedAnswer:
      'Redis is an in-memory data structure store that supports strings, lists, sets, sorted sets, and hashes. Unlike PostgreSQL, which persists data to disk and is optimised for complex queries with ACID guarantees, Redis keeps data in RAM for ultra-low-latency access. Redis is best for caching, session storage, and message brokering — not for primary persistent storage where you need complex joins or strong durability guarantees.',
    practiced: false,
  },
  {
    id: 'q-2',
    question: 'Explain how you would implement a job queue using Redis.',
    type: 'technical',
    suggestedAnswer:
      'I would use a Redis list as the queue. Producers call RPUSH to append job payloads (serialised as JSON) to the right of the list. Workers call BLPOP on the left, which blocks until a job is available — this is efficient because workers do not spin-poll. For priority queues I would use a Redis sorted set, where the score represents priority or scheduled time. Each job gets a unique ID stored in a hash for status tracking.',
    practiced: false,
  },
  {
    id: 'q-3',
    question: 'How does Docker help with backend development and deployment?',
    type: 'technical',
    suggestedAnswer:
      'Docker packages an application and all its dependencies into a container image, ensuring it runs identically in development, CI, and production. It eliminates "works on my machine" issues. With Docker Compose I can spin up the full stack — app, worker, Redis, and PostgreSQL — with a single command. Images are lightweight and start in seconds compared to virtual machines.',
    practiced: false,
  },
  {
    id: 'q-4',
    question: 'What is the difference between a background job and a cron job?',
    type: 'technical',
    suggestedAnswer:
      'A background job is triggered by an event — a user action, a webhook, or another service — and runs asynchronously outside the request-response cycle. A cron job runs on a fixed schedule regardless of events, e.g. "every night at 2 AM". In Celery, background jobs use apply_async or delay, while cron jobs are configured via Celery Beat with a crontab schedule.',
    practiced: false,
  },
  {
    id: 'q-5',
    question: 'How do you handle job failures and retries in a distributed system?',
    type: 'technical',
    suggestedAnswer:
      'I implement retry logic with exponential back-off: after each failure the wait doubles (e.g. 1s, 2s, 4s, 8s) up to a max delay, to avoid thundering-herd problems. I set a max_retries limit and move jobs exceeding it to a dead-letter queue for manual inspection. Each attempt is logged with the error message. Celery handles this natively with autoretry_for and retry_backoff settings.',
    practiced: false,
  },
  {
    id: 'q-6',
    question: 'Walk me through your Distributed Job Queue project — what does it do and why did you build it?',
    type: 'project-based',
    suggestedAnswer:
      "I built the Distributed Job Queue System to bridge the gap between my existing Python and PostgreSQL skills and the Redis and Docker skills required for this role. The project is a production-style backend that lets you enqueue background jobs via a FastAPI REST API, process them asynchronously with Celery workers, persist state to PostgreSQL, and use Redis as the message broker. I containerised the whole stack with Docker Compose so it's fully reproducible.",
    practiced: false,
  },
  {
    id: 'q-7',
    question: 'What challenges did you face when implementing the distributed job queue, and how did you solve them?',
    type: 'project-based',
    suggestedAnswer:
      'The hardest part was handling job deduplication — I did not want the same job queued twice if a client retried on network timeout. I solved it by hashing the job payload to generate an idempotency key and using a Redis SET with SETNX to atomically check-and-set before enqueueing. Another challenge was container startup ordering in Docker Compose; I added health checks for Redis and PostgreSQL so the app and worker only start when their dependencies are ready.',
    practiced: false,
  },
  {
    id: 'q-8',
    question: 'How would you scale the job queue system to handle 10x the current load?',
    type: 'project-based',
    suggestedAnswer:
      'Horizontally: spin up more Celery worker containers — Docker Compose or Kubernetes makes this trivial. For Redis, switch to Redis Cluster or a managed service like Elasticache to distribute the load. For PostgreSQL, add a read replica for status polling queries so the primary handles only writes. I would also partition queues by job type so heavy batch jobs do not block time-sensitive ones, and add autoscaling based on queue depth metrics.',
    practiced: false,
  },
  {
    id: 'q-9',
    question: 'Explain connection pooling and why it matters in a backend service.',
    type: 'technical',
    suggestedAnswer:
      'Opening a new database connection for every request is expensive — it involves TCP handshake, authentication, and memory allocation on both client and server. A connection pool maintains a set of pre-opened connections that requests borrow and return. This reduces latency and prevents exhausting the database\'s connection limit. In SQLAlchemy I configure pool_size and max_overflow; in asyncpg I use asyncpg.create_pool. Without pooling, a spike in traffic can crash the database with "too many connections" errors.',
    practiced: false,
  },
  {
    id: 'q-10',
    question: 'How would you expose queue health metrics for monitoring?',
    type: 'project-based',
    suggestedAnswer:
      'I added a /metrics endpoint to the FastAPI app that exports Prometheus-compatible metrics: queue depth, jobs processed per minute, failure rate, and worker count. These are scraped by Prometheus and visualised in Grafana. I also set up alerts — if queue depth exceeds a threshold or failure rate spikes, PagerDuty fires. The Flower dashboard provides a real-time UI for Celery task inspection during development.',
    practiced: false,
  },
];

// Alias for backwards compatibility
export const DEMO_QUESTIONS = DEMO_INTERVIEW_QUESTIONS;
