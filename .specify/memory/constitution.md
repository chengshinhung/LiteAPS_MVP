<!--
═══════════════════════════════════════════════════════════════════════════════
SYNC IMPACT REPORT - Constitution Update
═══════════════════════════════════════════════════════════════════════════════

VERSION CHANGE: N/A (Initial) → 1.0.0 (Initial Ratification)

REASON: Initial constitution establishment based on LiteAPS Manifesto principles.
        This is the first formal ratification of the project's governing principles.

PRINCIPLES DEFINED:
  1. Data Agnosticism - NEW
  2. Human Sovereignty & Hybrid Intelligence - NEW
  3. User Experience & Latency Zero - NEW
  4. Observability & Transparency - NEW
  5. Pragmatic Simplicity & Schema-First - NEW

SECTIONS ADDED:
  - Core Principles (all 5 principles)
  - Performance Standards
  - Development Standards
  - Governance

TEMPLATES REQUIRING UPDATES:
  ✅ .specify/templates/plan-template.md - Aligned (Constitution Check section present)
  ✅ .specify/templates/spec-template.md - Aligned (User stories + requirements structure)
  ✅ .specify/templates/tasks-template.md - Aligned (Phase structure supports principles)

FOLLOW-UP TODOs:
  - None at this time

NOTES:
  - All principles derived from 產品核心宗旨.md (LiteAPS Manifesto)
  - Performance targets (<1s latency, 1000 orders/20-30s) codified from PRD v1.1
  - Technology stack (C# + React + SQL Server) formalized

═══════════════════════════════════════════════════════════════════════════════
-->

# LiteAPS Constitution

## Core Principles

### I. Data Agnosticism

**Declaration**: The system is a container; data is fluid. LiteAPS shall not prescribe the shape of factory data.

**Non-Negotiable Rules**:
- **Input Democracy**: The system MUST accept data from any source (CSV, Excel, ERP API, manual entry) without discrimination, provided it can be standardized to the required schema.
- **Decoupling**: The scheduling algorithm MUST NOT depend on any ERP vendor's proprietary business logic. All domain models shall be generic and vendor-neutral.
- **Schema Transparency**: Data mapping requirements MUST be explicit and documented. Users shall always know what fields are mandatory vs. optional.

**Rationale**: SME manufacturers cannot afford to be locked into specific ERP ecosystems. By treating all data sources equally, LiteAPS lowers adoption barriers and ensures long-term system portability.

---

### II. Human Sovereignty & Hybrid Intelligence

**Declaration**: AI is the navigator; humans are the drivers. The algorithm calculates paths, but humans decide destinations.

**Non-Negotiable Rules**:
- **Decision Hierarchy**: 
  - Level 1 (Compute): System handles conflict detection and slot-finding.
  - Level 2 (Authority): Human actions (drag-and-drop, pin/lock) have **absolute veto power** over algorithmic suggestions.
- **Responsible Freedom**: The system MUST allow users to override warnings (e.g., force-insert orders despite conflicts), BUT such actions MUST be logged with user identity and timestamp. The system does not bear responsibility for human overrides.
- **No Black Boxes**: Any algorithmic decision (why order X was scheduled to machine Y at time Z) MUST be explainable through UI tooltips or logs.

**Rationale**: Production planners possess domain knowledge that no algorithm can fully replicate (customer relationships, machine quirks, workforce skills). The system augments, not replaces, human expertise.

---

### III. User Experience & Latency Zero

**Declaration**: Any interaction exceeding 1 second breaks the user's sense of control.

**Non-Negotiable Rules**:
- **Optimistic UI**: All user actions (drag-and-drop, pin, parameter changes) MUST reflect immediately in the UI using optimistic updates. Server validation occurs asynchronously.
- **Background Computation**: Long-running calculations (full schedule simulation >1s) MUST execute in the background with progress indicators and cancellation support.
- **Perceived Performance**: Loading states MUST provide educational content (scheduling tips, progress messages) to maintain user engagement during computation.

**Rationale**: In fast-paced manufacturing environments, planners make dozens of micro-decisions per hour. Laggy interfaces disrupt flow state and reduce adoption. Speed is part of correctness.

---

### IV. Observability & Transparency

**Declaration**: Users must understand what the system is doing and why.

**Non-Negotiable Rules**:
- **Explainable Results**: Every scheduled operation MUST expose:
  - Why this machine was selected (capacity, capability, priority)
  - What constraints were considered (deadlines, dependencies, pinned orders)
  - What conflicts exist (if any) and their severity
- **Scenario Comparison**: Users MUST be able to clone scenarios and view side-by-side comparisons (e.g., "Plan A vs Plan B with overtime").
- **Audit Trail**: All manual overrides, parameter changes, and scenario publications MUST be logged with user, timestamp, and reason (if provided).

**Rationale**: Trust in automation comes from understanding. When planners can see the system's reasoning, they gain confidence to accept algorithmic suggestions while knowing when to intervene.

---

### V. Pragmatic Simplicity & Schema-First

**Declaration**: If it cannot be represented in Excel, it's too complex. Start simple, add complexity only when justified.

**Non-Negotiable Rules**:
- **Schema-First Design**: Before implementing any feature, validate that the data model can be expressed as a simple spreadsheet. If the schema requires nested JSON or complex joins to be understood, simplify it.
- **YAGNI Enforcement**: Features MUST NOT be implemented "just in case." Every capability must trace back to a documented user scenario with measurable value.
- **CSV as Contract**: The system MUST support CSV import/export for all major entities (orders, machines, schedules). If a feature cannot be tested via CSV round-trip, it violates this principle.

**Rationale**: Over-engineering killed traditional APS systems. By keeping data models simple enough to fit in spreadsheets, we ensure the system remains understandable, debuggable, and maintainable by small teams.

---

## Performance Standards

### Computation Targets
- **Small-Scale**: <500 orders MUST complete scheduling in <5 seconds.
- **Target Scale**: 1,000 orders MUST complete scheduling in 20-30 seconds.
- **Large-Scale**: 2,000+ orders MAY exceed 30 seconds but MUST provide progress updates every 3 seconds.

### Interaction Responsiveness
- **UI Actions**: Drag-and-drop, pin/unpin, parameter changes MUST reflect in <200ms (optimistic UI).
- **API Latency**: REST endpoints MUST respond in <500ms p95 for metadata operations (list scenarios, fetch results).
- **Real-Time Updates**: SignalR progress updates MUST fire at least every 2 seconds during long computations.

### Concurrency
- **Scenario Locking**: When a user opens a scenario for editing, others MUST be restricted to read-only mode with lock notification.
- **Multi-User Safety**: The system MUST support at least 10 concurrent users working on separate scenarios without performance degradation.

---

## Development Standards

### Technology Stack (NON-NEGOTIABLE)
- **Backend**: ASP.NET Core 8 (C#), Entity Framework Core, SignalR
- **Frontend**: React (TypeScript), Material-UI or Ant Design
- **Database**: SQL Server (or PostgreSQL if justified)
- **Charting**: React Big Calendar or DHTMLX Gantt (licensed if budget permits)

**Rationale**: This stack was chosen in PRD v1.1 for its balance of enterprise readiness, performance, and team expertise.

### Code Quality Gates
- **Linting**: All code MUST pass ESLint (frontend) and StyleCop (backend) with zero warnings.
- **Testing**: Every API endpoint MUST have at least one integration test. UI components MUST have unit tests for business logic.
- **Documentation**: Public APIs MUST have XML comments (C#) or JSDoc (TypeScript). README MUST exist for each major module.

### Version Control
- **Branching**: Follow GitFlow: `main` (production), `develop` (integration), `feature/###-name` (work branches).
- **Commits**: Use Conventional Commits format: `type(scope): description` (e.g., `feat(scheduler): add EDD sorting`).
- **Reviews**: All PRs MUST be reviewed by at least one team member before merging to `develop`.

---

## Governance

### Constitutional Authority
- This constitution **supersedes** all informal practices, coding preferences, and individual design opinions.
- When technical decisions conflict with these principles, the constitution prevails unless formally amended.

### Amendment Process
1. **Proposal**: Any team member may propose an amendment via a documented design discussion (issue or markdown file).
2. **Justification**: The proposal MUST explain:
   - Which principle is affected
   - Why the current principle is insufficient
   - What real-world problem this solves (with user scenario)
3. **Approval**: Amendments require consensus among core maintainers (simple majority if formal roles exist).
4. **Migration**: If the amendment affects existing code, a migration plan MUST be included.

### Compliance Reviews
- **Pre-Implementation**: All feature specifications MUST include a "Constitution Check" section verifying alignment with principles.
- **PR Reviews**: Reviewers MUST verify that implementations adhere to constitutional requirements (especially Principles I-III).
- **Quarterly Audits**: Every 3 months, conduct a constitution compliance review across the codebase. Document violations and remediation plans.

### Complexity Justification
- Any feature that increases system complexity (new dependencies, architectural layers, abstractions) MUST be justified in writing:
  - Which principle does this support?
  - What simpler alternatives were considered?
  - What is the measurable cost of NOT doing this?

---

**Version**: 1.0.0 | **Ratified**: 2026-01-02 | **Last Amended**: 2026-01-02
