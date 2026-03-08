# @coveritlabs/contracts

Shared API contracts (Protocol Buffers) for CoverIt services.

## Install

**Production (main branch):**
```json
{
  "dependencies": {
    "@coveritlabs/contracts": "github:CoveritLabs/coverit-contracts#main"
  }
}
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
# Setup
cd coverit-contracts
npm install && npm run generate && npm link

# Link in api/frontend
cd ../coverit-api
npm link @coveritlabs/contracts

# Edit protos & regenerate
cd ../coverit-contracts
npm run generate  # Changes instant in linked projects
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
npm run generate && npm run lint
git commit -m "feat: add new types" && git push
```

**2. Use in api/frontend feature branch:**
```json
{
  "dependencies": {
    "@coveritlabs/contracts": "github:CoveritLabs/coverit-contracts#feat/new-feature"
  }
}
```

**3. Merge flow:**
- PR: contracts `feat/new-feature` → `develop`
- PR: api/frontend `feat/new-feature` → `develop` (update to contracts#develop)
- When ready for production:
  - PR: contracts `develop` → `main`
  - PR: api/frontend `develop` → `main` (update to contracts#main)

## Branch Strategy

- `main` = Production contracts (stable)
- `develop` = Staging contracts (tested)
- `feat/*` = New contracts under development

## Commands

```bash
npm run generate   # Generate TS types
npm run lint       # Lint protos
npm run commit     # Commitizen prompt
```

## Structure

```
auth/      # Auth domain protos
common/    # Shared types
gen/ts/    # Generated (auto, don't edit)
```
