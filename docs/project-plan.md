
 1. Create repo; choose workspace tool (pnpm or npm workspaces).
 2. Create folders: /apps/frontend, /apps/backend, /ml, /packages (shared), /infra, /docs.
 3. Add root package.json, README.md, LICENSE, .gitignore.
 4. Initialize workspace manifests and root tsconfig.json (project refs).
 5. Frontend: scaffold React + TypeScript app in /apps/frontend; add env.example, build/start/test scripts.
 6. Backend: scaffold Node + Express + TypeScript in /apps/backend; add env.example, build/start/test scripts.
 7. Shared types/utils: create /packages/shared and reference from apps.
 8. ML: create /ml with venv/requirements.txt, src/, notebooks/, model/, experiment tracking plan.
 9. Docker: create Dockerfiles for backend and ML; optional for frontend.
 10. MongoDB Atlas: create cluster, DB user, IP access, copy connection string.
 11. Secrets: add MONGO_URI, VERCEL_TOKEN, RENDER_API_KEY, other keys to GitHub/Vercel/Render secrets.
 12. Lint/format: add ESLint, Prettier, Husky pre-commit, commitlint hooks.
 13. Testing: add Jest + RTL for frontend, Jest/supertest for backend, pytest for ML.
 14. Type checking: enable tsc --build and CI type checks.
 15. CI: add GitHub Actions to run lint/test/type/build; artifacts for deployments.
 16. Deploy: connect frontend to Vercel, backend to Render (services + env); configure preview/deploy branches.
 17. Infra/config: store deployment manifests in /infra (render.yaml, vercel.json, docker-compose).
 18. Branch policies: add PR template, branch protection rules, CODEOWNERS.
 19. Observability: plan Sentry/logging and metrics placeholders.
 20. Docs: update README setup steps, CONTRIBUTING, architecture diagram, runbook.
 21. Make initial commit and verify CI passes and first deploy preview.
 