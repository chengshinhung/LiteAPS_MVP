# LiteAPS Development Guidelines

Auto-generated from feature plans. Last updated: 2026-01-03

## Active Technologies

### Frontend (PoC)
- **Framework**: React 18+ with TypeScript 5.x
- **Build Tool**: Vite 6.x
- **UI Library**: Ant Design 5.24+
- **Charts**: react-google-charts 5.2+ (Timeline)
- **Routing**: react-router-dom 7.x (HashRouter)
- **Deployment**: GitHub Pages via gh-pages

### Backend (Future MVP)
- **Framework**: ASP.NET Core 8 (C#)
- **ORM**: Entity Framework Core
- **Real-time**: SignalR
- **Database**: SQL Server

## Project Structure

```text
# Current: PoC Frontend-only
poc/
├── src/
│   ├── assets/              # Static resources
│   ├── components/          # Shared components
│   │   ├── AppLayout/
│   │   ├── FileUploader/
│   │   ├── SimulationProgress/
│   │   └── GanttChart/
│   ├── pages/
│   │   ├── Dashboard/
│   │   └── Simulation/
│   ├── data/
│   │   └── mockGanttData.ts
│   ├── types/
│   │   └── index.ts
│   ├── config/
│   │   ├── navigation.ts
│   │   └── theme.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Commands

### Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run deploy       # Deploy to GitHub Pages
```

## Code Style

### TypeScript
- Enable strict mode
- Use interfaces for props/state definitions
- Export types from `@/types`
- Use path aliases (`@/components`, `@/pages`)

### React
- Functional components with hooks
- Use `App.useApp()` for Ant Design message/notification
- HashRouter for GitHub Pages compatibility

### Naming Conventions
- Components: PascalCase (`SimulationView.tsx`)
- Hooks: camelCase with `use` prefix (`useSimulation.ts`)
- Types: PascalCase (`WorkOrder`, `SimulationState`)
- Constants: UPPER_SNAKE_CASE (`DEMO_ORDERS`)

## Recent Changes

### Feature 001: Scheduling PoC (2026-01-03)
- Initial PoC system for scheduling module demo
- React + Vite + TypeScript + Ant Design
- Mock data simulation with progress animation
- Google Charts Timeline for Gantt visualization

## Constitution Reference

All development must comply with `.specify/memory/constitution.md`:
1. **Data Agnosticism**: Accept any data source
2. **Human Sovereignty**: Human decisions override AI
3. **Latency Zero**: <1s interaction response
4. **Observability**: Explainable results
5. **Pragmatic Simplicity**: Schema-first, CSV-exportable

<!-- MANUAL ADDITIONS START -->
<!-- Add project-specific notes below this line -->

<!-- MANUAL ADDITIONS END -->
