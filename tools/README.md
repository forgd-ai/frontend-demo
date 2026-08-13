# What ships in tools/, and why

- **`preflight.tar.gz`** — the Preflight code-review plugin for Claude
  Code, bundled into this repo so workshop setup needs no network access,
  no accounts, and no external marketplace: everything installs from the
  repo you already cloned, version-pinned to these labs. Inside it: the
  `/preflight` command (reviews the commits on your current branch against
  `main` and returns a triage of the diff plus style findings checked
  against this repo's own conventions), `/preflight:preflight-pr` (drafts
  a PR description from the last report), an optional git pre-push hook
  that blocks unreviewed pushes, and the review agents those commands run.
- **`install-preflight.sh`** — extracts the tarball and registers the
  plugin with your Claude Code. Used by setup step 7, or from inside a
  session as `/install-preflight`. Registration is local to this clone
  (`.claude/settings.local.json`); it does not change your global Claude
  Code setup. To remove it later:

  ```
  claude plugin uninstall preflight@preflight-local --scope local
  ```

- **`test-preflight-stamp.sh`** — a maintenance check used when the
  bundle is rebuilt. Participants never need to run it.
