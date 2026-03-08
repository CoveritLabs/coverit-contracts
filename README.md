# @coveritlabs/contracts

Shared API contracts (Protocol Buffers) for CoverIt services.

## Install

**In your project (api/frontend):**

```json
{
  "dependencies": {
    "@coveritlabs/contracts": "github:CoveritLabs/coverit-contracts#main"
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

**1. Create branch & edit:**

```bash
git checkout -b feat/new-feature
# Edit auth/auth.proto
npm run generate && npm run lint
git commit -m "feat: add new types" && git push
```

**2. Use in api/frontend:**
```json
{
  "dependencies": {
    "@coveritlabs/contracts": "github:CoveritLabs/coverit-contracts#feat/new-feature"
  }
}
```

**3. Merge order:**
- Merge contracts → `main` first
- Update api/frontend to `#main`, then merge

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
