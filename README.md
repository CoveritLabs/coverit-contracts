# @coveritlabs/contracts

Shared API contracts (Protocol Buffers) for CoverIt services.  
Published to [GitHub Packages](https://github.com/orgs/CoveritLabs/packages).

## Install

**1. Add `.npmrc` to your project root** (one-time setup):
```
@coveritlabs:registry=https://npm.pkg.github.com
```

**2. Authenticate** (one-time per machine):
```bash
npm login --registry=https://npm.pkg.github.com --scope=@coveritlabs
# Use your GitHub username and a PAT with read:packages scope
```

**3. Install:**
```bash
npm install @coveritlabs/contracts
```

**Development (develop branch):**
```json
{
  "dependencies": {
    "@coveritlabs/contracts": "github:CoveritLabs/coverit-contracts#develop"
  }
}
```

**Import types:**
```typescript
import { AuthRequest, AuthResponse } from '@coveritlabs/contracts'
```

## Local Development

**Link for live editing:**

```bash
# Build & link
cd coverit-contracts
npm install && npm link

# Link in api/frontend
cd ../coverit-api
npm link @coveritlabs/contracts

# Edit protos & rebuild
cd ../coverit-contracts
npm run build  # Changes instant in linked projects
```

**Unlink:**

```bash
cd coverit-api
npm unlink @coveritlabs/contracts && npm install
```

## Feature Branch Workflow

**1. Create feature branch from develop:**

```bash
git checkout develop
git pull
git checkout -b feat/new-feature
# Edit auth/auth.proto
npm run build && npm run lint
git commit -m "feat: add new types" && git push
```

**2. Use in api/frontend feature branch:**
```bash
# Link locally while iterating
cd ../coverit-api
npm link @coveritlabs/contracts
```

**3. Merge flow:**
- PR: contracts `feat/new-feature` → `develop`
- PR: api/frontend `feat/new-feature` → `develop`
- When ready for production:
  - PR: contracts `develop` → `main` (triggers publish to GitHub Packages)
  - PR: api/frontend `develop` → `main` (bump contracts version if needed)

## Publishing

Publishing is fully automated. When a PR is merged to `main`, the GitHub Action:
1. Runs `buf generate` (proto → TypeScript)
2. Runs `tsc` (TypeScript → JavaScript + declarations)
3. Publishes `dist/` to GitHub Packages

To publish a new version, bump `version` in `package.json` before merging to `main`.

## Branch Strategy

- `main` = Production contracts (published to GitHub Packages)
- `develop` = Staging contracts (tested)
- `feat/*` = New contracts under development

## Commands

```bash
npm run build      # Generate TS + compile (buf generate && tsc)
npm run generate   # Generate TS types only (buf generate)
npm run lint       # Lint protos
npm run commit     # Commitizen prompt
```

## Structure

```
auth/      # Auth domain protos
common/    # Shared types
gen/ts/    # Generated TS (gitignored, intermediate)
dist/      # Compiled output (gitignored, published)
```
