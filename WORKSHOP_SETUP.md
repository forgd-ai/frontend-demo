# Workshop setup

Complete this checklist in the week before the workshop. It takes about
fifteen minutes. Anyone who cannot finish it gets unblocked at the start of
the session, not during a lab, so please try it early.

1. **Claude Code.** Install it, authenticate, and verify:

   ```sh
   claude --version
   ```

2. **Node.js 20 or later** (and npm, which ships with it):

   ```sh
   node --version
   ```

3. **Clone this repository** and install. There is no `.env` to configure;
   the install also creates the local database:

   ```sh
   git clone https://github.com/forgd-ai/frontend-demo.git
   cd frontend-demo
   npm install
   ```

4. **Run the app** and confirm it loads:

   ```sh
   npm run dev
   ```

   Open http://localhost:3000, click Get Started, and sign in with any
   email address. No password, no account creation.

5. **Toggle dark mode** using the control at the right edge of the page
   footer, and confirm the theme flips. Both labs depend on it.

6. **Install jq** (the preflight installer and its checks use it):

   ```sh
   brew install jq        # macOS
   sudo apt-get install jq  # Debian/Ubuntu
   ```

7. **Install the bundled preflight plugin** (from the repo root):

   ```sh
   bash tools/install-preflight.sh
   ```

8. **Verify preflight.** Restart Claude Code in the repo and run
   `/preflight`. It should review the current state of the repo and produce
   a report. The first run may ask you to approve the project's plugin;
   approve it. Optionally run `/preflight:install-preflight-hook` to add
   the git pre-push hook.

That is the whole gate: Node, a browser, and Claude Code. If `npm install`
fails on a corporate network, note the error and bring it to the session;
that is useful information, not a failure.
