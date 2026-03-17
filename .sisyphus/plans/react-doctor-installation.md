# React Doctor Installation

## TL;DR

> **Quick Summary**: Add `react-doctor` to this Next.js 16 + React 19 repo as a repeatable local diagnostic tool using npm, without changing application code or CI.
>
> **Deliverables**:
> - `react-doctor` added as a dev dependency
> - `package.json` script for repeatable local runs
> - Optional minimal config only if the CLI requires it
> - Verified local execution from the repo root
>
> **Estimated Effort**: Quick
> **Parallel Execution**: YES - 2 waves
> **Critical Path**: Task 1 -> Task 2 -> Task 4

---

## Context

### Original Request
Install React Doctor in the repository.

### Interview Summary
**Key Discussions**:
- User clarified that "react doctor" means the `react-doctor` package.
- User chose a permanent repo setup instead of a one-off `npx` run.
- CI integration is out of scope for this request.

**Research Findings**:
- The repo is an npm-based Next.js app with a root `package.json` and `package-lock.json`.
- Current app stack is `next` 16.x with `react` and `react-dom` 19.2.3.
- Public React Doctor docs show CLI usage through `npx -y react-doctor@latest .`, optional `--verbose`, and optional config via `react-doctor.config.json` or the `reactDoctor` key in `package.json`.

### Metis Review
**Identified Gaps** (addressed):
- Workspace ambiguity resolved by defaulting to the single detected root `package.json`; no multi-package layout was found during initial inspection.
- Package/binary mismatch risk handled by requiring local binary verification with `npx --no-install react-doctor --help`.
- Lockfile churn risk constrained by forbidding unrelated dependency upgrades.

---

## Work Objectives

### Core Objective
Install and wire `react-doctor` as a local development diagnostic tool that can be run repeatedly from the repository root using npm.

### Concrete Deliverables
- `react-doctor` listed under `devDependencies` in `package.json`
- Updated `package-lock.json`
- A repeatable npm script in `package.json` for invoking React Doctor
- Optional minimal config only if required for this repo to run cleanly

### Definition of Done
- [ ] `npm pkg get devDependencies.react-doctor` returns a concrete version string
- [ ] `npm run react:doctor -- --help` exits successfully from the repo root
- [ ] No unrelated dependency versions are changed

### Must Have
- Persistent local installation through npm
- Script-based invocation from `package.json`
- Verification using local binary resolution, not only remote `npx -y`

### Must NOT Have (Guardrails)
- No upgrades/downgrades of `next`, `react`, `react-dom`, TypeScript, ESLint, or other existing packages beyond adding `react-doctor`
- No app code changes, UI changes, or remediation of diagnostics found by React Doctor
- No CI workflow changes, GitHub Actions wiring, or extra tooling additions
- No config file unless the tool actually needs one for this repo

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** - ALL verification is agent-executed.

### Test Decision
- **Infrastructure exists**: YES
- **Automated tests**: None for this tooling-install task
- **Framework**: npm CLI checks
- **Reasoning**: This request is for repo tooling installation and command verification, not feature behavior changes.

### QA Policy
Every task must be verified through executable commands and captured evidence.

- **CLI verification**: Use Bash to run npm/npx commands and capture terminal output
- **Config verification**: Only if config is introduced, re-run CLI help and root scan checks to prove the config does not break execution
- **Evidence location**: `.sisyphus/evidence/task-{N}-{scenario-slug}.txt`

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately - foundation and wiring):
├── Task 1: Verify package target and root install location [quick]
├── Task 2: Add devDependency and lockfile entry [quick]
└── Task 3: Add npm script and only-minimal config if required [quick]

Wave 2 (After Wave 1 - prove local usability):
└── Task 4: Run local React Doctor commands and capture first-pass evidence [quick]

Wave FINAL (After all tasks - independent review):
├── Task F1: Plan compliance audit [oracle]
├── Task F2: Code quality review [unspecified-high]
├── Task F3: Real command QA replay [unspecified-high]
└── Task F4: Scope fidelity check [deep]

Critical Path: Task 1 -> Task 2 -> Task 4
Parallel Speedup: Moderate
Max Concurrent: 3
```

### Dependency Matrix

- **1**: None -> 2, 3, 4
- **2**: 1 -> 4
- **3**: 1 -> 4
- **4**: 1, 2, 3 -> F1, F2, F3, F4

### Agent Dispatch Summary

- **Wave 1**: **3** - T1 -> `quick`, T2 -> `quick`, T3 -> `quick`
- **Wave 2**: **1** - T4 -> `quick`
- **FINAL**: **4** - F1 -> `oracle`, F2 -> `unspecified-high`, F3 -> `unspecified-high`, F4 -> `deep`

---

## TODOs

- [ ] 1. Verify install target and repo-root constraints

  **What to do**:
  - Confirm the executor is operating in the single root npm package represented by the current `package.json`.
  - Record current Node/npm versions and confirm the package target is the unscoped `react-doctor` package.
  - Inspect existing scripts and dependencies before any mutation so later verification can detect unrelated churn.

  **Must NOT do**:
  - Do not install anything in this task.
  - Do not assume workspaces or a nested app package unless command evidence proves it.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Fast repo inspection and environment capture.
  - **Skills**: [`git-master`]
    - `git-master`: Useful for keeping the change surface controlled and auditable.
  - **Skills Evaluated but Omitted**:
    - `documentation-lookup`: Not needed because this task is local repo inspection, not external docs.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3)
  - **Blocks**: Tasks 2, 3, 4
  - **Blocked By**: None

  **References**:
  - `package.json` - Root npm package, current scripts, and existing dependency surface to preserve.
  - `package-lock.json` - Lockfile that should only change as needed for `react-doctor`.
  - `README.md` - Confirms this repository is a Next.js portal app rather than a multi-package workspace.
  - `.sisyphus/plans/react-doctor-installation.md` - Current execution contract and verification checklist.

  **Acceptance Criteria**:
  - [ ] `node -v` exits 0 and version is captured in evidence
  - [ ] `npm -v` exits 0 and version is captured in evidence
  - [ ] `npm pkg get name` returns `"justice-ru"`
  - [ ] `npm pkg get scripts` output is captured before changes

  **QA Scenarios**:
  ```text
  Scenario: Prepare evidence workspace
    Tool: Bash
    Preconditions: `.sisyphus/` exists
    Steps:
      1. Create `.sisyphus/evidence` if it does not already exist.
      2. Save command output to `.sisyphus/evidence/task-1-package-baseline.txt` or terminal transcript.
    Expected Result: `.sisyphus/evidence` exists before later verification commands write files into it.
    Failure Indicators: Permission errors or missing `.sisyphus` parent directory.
    Evidence: .sisyphus/evidence/task-1-package-baseline.txt

  Scenario: Capture repo-root npm baseline
    Tool: Bash
    Preconditions: Shell opened at repository root
    Steps:
      1. Run `node -v` and save stdout to `.sisyphus/evidence/task-1-node-version.txt`.
      2. Run `npm -v` and append stdout to `.sisyphus/evidence/task-1-node-version.txt`.
      3. Run `npm pkg get name scripts` and save stdout to `.sisyphus/evidence/task-1-package-baseline.txt`.
    Expected Result: Commands exit 0 and show the root package plus current scripts.
    Failure Indicators: Missing `package.json`, npm command failure, empty package name.
    Evidence: .sisyphus/evidence/task-1-package-baseline.txt

  Scenario: Reject wrong install target assumptions
    Tool: Bash
    Preconditions: Repository root available
    Steps:
      1. Run `npm pkg get workspaces`.
      2. Save stdout/stderr to `.sisyphus/evidence/task-1-workspaces-check-error.txt`.
      3. Assert output is `undefined`, `null`, or absent rather than a workspace array; if a workspace array appears, stop and re-plan before installation.
    Expected Result: No workspace configuration is detected for this task scope.
    Failure Indicators: Workspace array present, meaning install target needs reconsideration.
    Evidence: .sisyphus/evidence/task-1-workspaces-check-error.txt
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-1-node-version.txt`
  - [ ] `.sisyphus/evidence/task-1-package-baseline.txt`
  - [ ] `.sisyphus/evidence/task-1-workspaces-check-error.txt`

  **Commit**: NO

- [ ] 2. Add `react-doctor` as a local dev dependency

  **What to do**:
  - Install the unscoped `react-doctor` package with npm as a dev dependency at the root package.
  - Allow only the expected `package.json` and `package-lock.json` updates required by that installation.
  - Record the exact installed version for later reproducibility.

  **Must NOT do**:
  - Do not upgrade or downgrade existing dependencies.
  - Do not switch package managers or regenerate the lockfile beyond what npm needs for this package.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Small deterministic package-management change.
  - **Skills**: [`git-master`]
    - `git-master`: Helps verify that only intended files changed.
  - **Skills Evaluated but Omitted**:
    - `documentation-lookup`: Installation command is already determined; task is execution-focused.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3)
  - **Blocks**: Task 4
  - **Blocked By**: Task 1

  **References**:
  - `package.json` - Location where the new dev dependency must be added.
  - `package-lock.json` - Must reflect only the installed package and its transitive dependencies.
  - `https://github.com/millionco/react-doctor` - Public installation guidance showing CLI usage and expected package name.

  **Acceptance Criteria**:
  - [ ] `npm i -D react-doctor` exits 0
  - [ ] `npm pkg get devDependencies.react-doctor` returns a non-empty version string
  - [ ] `npm ls react-doctor` shows the package in the dependency tree without `ELSPROBLEMS`

  **QA Scenarios**:
  ```text
  Scenario: Install local React Doctor dependency
    Tool: Bash
    Preconditions: Task 1 baseline complete
    Steps:
      1. Run `npm i -D react-doctor`.
      2. Save full terminal output to `.sisyphus/evidence/task-2-install.txt`.
      3. Run `npm pkg get devDependencies.react-doctor` and append output to the same evidence file.
    Expected Result: Install exits 0 and `devDependencies.react-doctor` contains a concrete semver string.
    Failure Indicators: Non-zero exit, package missing from `package.json`, peer resolution failure.
    Evidence: .sisyphus/evidence/task-2-install.txt

  Scenario: Detect dependency-tree problems early
    Tool: Bash
    Preconditions: `react-doctor` installed locally
    Steps:
      1. Run `npm ls react-doctor`.
      2. Save stdout/stderr to `.sisyphus/evidence/task-2-install-error.txt`.
      3. Assert the output contains `react-doctor@` and does not contain `ELSPROBLEMS`.
    Expected Result: The local package resolves in the npm tree.
    Failure Indicators: Missing package, invalid tree, npm resolution errors.
    Evidence: .sisyphus/evidence/task-2-install-error.txt
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-2-install.txt`
  - [ ] `.sisyphus/evidence/task-2-install-error.txt`

  **Commit**: NO

- [ ] 3. Add repeatable npm script and only-minimal config if required

  **What to do**:
  - Add a root `package.json` script such as `react:doctor` that runs the local CLI from the repo root.
  - Prefer script wiring alone; add `react-doctor.config.json` or a `reactDoctor` `package.json` key only if execution proves config is needed.
  - If config is required, keep it minimal and scoped only to unblocking execution, not suppressing findings prematurely.

  **Must NOT do**:
  - Do not add verbose ignore rules or speculative suppressions without a real CLI need.
  - Do not add CI scripts, pre-commit hooks, or remediation scripts.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Limited manifest/config edit with narrow scope.
  - **Skills**: [`git-master`]
    - `git-master`: Helps keep the manifest diff tight.
  - **Skills Evaluated but Omitted**:
    - `documentation-lookup`: Only needed if actual config errors appear during execution.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2)
  - **Blocks**: Task 4
  - **Blocked By**: Task 1

  **References**:
  - `package.json` - Existing scripts block where the new reusable command should be added.
  - `https://github.com/millionco/react-doctor` - Documents supported CLI options and configuration locations.

  **Acceptance Criteria**:
  - [ ] `npm pkg get scripts.react:doctor` returns a non-empty script value
  - [ ] If config is added, it contains only fields justified by actual runtime need
  - [ ] No extra scripts unrelated to React Doctor are added

  **QA Scenarios**:
  ```text
  Scenario: Script wiring exists at repo root
    Tool: Bash
    Preconditions: Task 1 baseline complete
    Steps:
      1. Add the `react:doctor` script to `package.json`.
      2. Run `npm pkg get scripts.react:doctor`.
      3. Save stdout to `.sisyphus/evidence/task-3-script.txt`.
    Expected Result: The script key exists and points to the local React Doctor invocation.
    Failure Indicators: Missing script, malformed JSON, command string empty.
    Evidence: .sisyphus/evidence/task-3-script.txt

  Scenario: Avoid unnecessary config sprawl
    Tool: Bash
    Preconditions: Script added; config only if required
    Steps:
      1. Check for `react-doctor.config.json` or `reactDoctor` config in `package.json`.
      2. Save the relevant config snippet or an explicit "no config added" note to `.sisyphus/evidence/task-3-script-error.txt`.
      3. Assert no ignore rules were added unless a real CLI error required them.
    Expected Result: Either no config exists, or the config is minimal and justified.
    Failure Indicators: Speculative ignore list, CI-related settings, unrelated script additions.
    Evidence: .sisyphus/evidence/task-3-script-error.txt
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-3-script.txt`
  - [ ] `.sisyphus/evidence/task-3-script-error.txt`

  **Commit**: NO

- [ ] 4. Verify local CLI execution and capture first-pass diagnostics evidence

  **What to do**:
  - Prove the installed package resolves locally through `npx --no-install` and through the npm script.
  - Run a first pass with `--help` and then a root scan command only if the help output succeeds.
  - Capture raw output as evidence without fixing any reported issues.

  **Must NOT do**:
  - Do not start remediating warnings or adjusting application code based on the scan output.
  - Do not switch to global installation or remote-only execution.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Deterministic command verification and evidence capture.
  - **Skills**: [`git-master`]
    - `git-master`: Useful for checking final diff remains within scope after verification commands.
  - **Skills Evaluated but Omitted**:
    - `documentation-lookup`: Only needed if the verified local binary exposes unexpected behavior.

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2
  - **Blocks**: F1, F2, F3, F4
  - **Blocked By**: Tasks 1, 2, 3

  **References**:
  - `package.json` - Contains the reusable `react:doctor` script to exercise.
  - `package-lock.json` - Confirms the local dependency exists before verifying execution.
  - `https://github.com/millionco/react-doctor` - Documents `--help`, `--verbose`, and root-directory invocation patterns.

  **Acceptance Criteria**:
  - [ ] `npx --no-install react-doctor --help` exits 0
  - [ ] `npm run react:doctor -- --help` exits 0
  - [ ] If a root scan is executed, output is captured without any source-code changes being made in response

  **QA Scenarios**:
  ```text
  Scenario: Verify local binary resolution
    Tool: Bash
    Preconditions: Tasks 2 and 3 complete
    Steps:
      1. Run `npx --no-install react-doctor --help`.
      2. Save stdout/stderr to `.sisyphus/evidence/task-4-help.txt`.
      3. Assert the command exits 0 and prints React Doctor usage information.
    Expected Result: The locally installed binary resolves and responds to `--help`.
    Failure Indicators: `npx` tries to download remotely, command not found, non-zero exit.
    Evidence: .sisyphus/evidence/task-4-help.txt

  Scenario: Verify npm script and capture first-pass output
    Tool: Bash
    Preconditions: `react:doctor` script exists in `package.json`
    Steps:
      1. Run `git status --porcelain` and save output to `.sisyphus/evidence/task-4-pre-scan-git-status.txt`.
      2. Run `npm run react:doctor -- --help` and save output to `.sisyphus/evidence/task-4-script-error.txt`.
      3. If help succeeds, run `npm run react:doctor -- . --verbose` and save output to `.sisyphus/evidence/task-4-first-scan.txt`.
      4. Run `git status --porcelain` again and save output to `.sisyphus/evidence/task-4-post-scan-git-status.txt`.
      5. Assert both git status snapshots match apart from planned manifest/lockfile changes, proving React Doctor did not create or edit source files.
      6. Assert both commands exit 0 or, if the verbose scan returns findings, that the command still completes and no source files are modified in response.
    Expected Result: Script wiring works and produces usable diagnostics output.
    Failure Indicators: Broken script, JSON parse errors, command crashes before reporting diagnostics.
    Evidence: .sisyphus/evidence/task-4-script-error.txt
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-4-help.txt`
  - [ ] `.sisyphus/evidence/task-4-pre-scan-git-status.txt`
  - [ ] `.sisyphus/evidence/task-4-script-error.txt`
  - [ ] `.sisyphus/evidence/task-4-first-scan.txt` (if scan executed)
  - [ ] `.sisyphus/evidence/task-4-post-scan-git-status.txt`

  **Commit**: YES
  - Message: `chore(tooling): add react-doctor`
  - Files: `package.json`, `package-lock.json`, optional `react-doctor.config.json`
  - Pre-commit: `npm run react:doctor -- --help`

---

## Final Verification Wave

> 4 review agents run in parallel after implementation completes. All must approve.

- [ ] F1. **Plan Compliance Audit** - `oracle`
  Verify that `package.json` and `package-lock.json` contain only the planned React Doctor changes, that script wiring exists, and that every plan deliverable is present.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** - `unspecified-high`
  Run package validation commands, inspect changed files for unrelated dependency churn or accidental config spread, and verify no app source files were modified.
  Output: `Install [PASS/FAIL] | Script [PASS/FAIL] | Scope [CLEAN/ISSUES] | VERDICT`

- [ ] F3. **Real Command QA** - `unspecified-high`
  Re-run the exact CLI scenarios from Tasks 1-4 from a clean shell and confirm the recorded evidence matches the observed results.
  Output: `Scenarios [N/N pass] | Repro [PASS/FAIL] | VERDICT`

- [ ] F4. **Scope Fidelity Check** - `deep`
  Compare actual diff against plan scope and ensure no remediation, CI setup, or unrelated package upgrades were introduced.
  Output: `Tasks [N/N compliant] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **1**: `chore(tooling): add react-doctor` - `package.json`, `package-lock.json`, optional `react-doctor.config.json`; pre-commit check: `npm run react:doctor -- --help`

---

## Success Criteria

### Verification Commands
```bash
npm pkg get devDependencies.react-doctor
npx --no-install react-doctor --help
npm run react:doctor -- --help
npm ls react-doctor
```

### Final Checklist
- [ ] `react-doctor` is installed locally as a dev dependency
- [ ] npm script works from repo root
- [ ] Optional config exists only if justified by actual CLI needs
- [ ] No unrelated dependency or application code changes were introduced
