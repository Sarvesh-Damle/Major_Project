# Frontend Improvement Plan

## 1. Requirements Definition

The goal is to modernize the frontend codebase to match industry best practices (referenced from `IntelligentDocumentGenerator.UI`).

### Key Objectives:

- **Code Standardization**: Enforce consistent styling and linting rules.
- **Workflow Enhancement**: Automate quality checks before commits.
- **Structural Organization**: Separate Routing/Views (`pages`) from Reusable UI (`components`).
- **Dependency Management**: Prepare for major upgrades (React Router v6).

## 2. Architecture Design

### Directory Structure

We will transition to a feature-based structure:

```
src/
├── assets/          # Static assets
├── components/      # Shared/Reusable UI components (Buttons, Inputs, etc.)
│   └── ui/          # Atomic design elements
├── features/        # Feature-specific logic (Auth, PropertyListing)
├── layouts/         # Layout wrappers (Navbar, Footer wrapper)
├── pages/           # Route views (Home, About, Dashboard)
├── hooks/           # Custom React hooks
├── context/         # React Context providers
├── utils/           # Helper functions
└── services/        # API services (axios instances)
```

### Tooling Stack

- **Linter**: ESLint + Prettier (Auto-fix on save).
- **Git Hooks**: Husky + Lint-staged (Prevent bad commits).
- **Build**: Vite (Existing, but with alias `@` support).

## 3. Implementation Plan

1.  **Dependencies**: Install Prettier, ESLint plugins, Husky.
2.  **Configuration**: Update `package.json`, `.eslintrc.cjs`, `.prettierrc`.
3.  **Git Hooks**: Configure `.husky/pre-commit`.
4.  **Refactoring**: (Phased approach)
    - Phase 1: Tooling & Aliases.
    - Phase 2: Move Pages to `src/pages`.
    - Phase 3: Upgrade React Router.

## 4. Testing Strategy

- **Static Analysis**: Verify `lint` command runs without errors.
- **Formatting**: Verify files are formatted on save/commit.
- **Build**: Ensure `npm run build` passes after refactoring.
