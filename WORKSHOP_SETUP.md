# Workshop setup

Complete this checklist in the week before the workshop. It takes about
ten minutes. Anyone who cannot finish it gets unblocked at the start of
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

   npm 11 may print a warning block telling you some packages' install
   scripts were blocked and suggesting `npm approve-scripts`. That is
   expected and harmless here; you do not need to approve anything.

4. **Run the app** and confirm it loads:

   ```sh
   npm run dev
   ```

   Open http://localhost:3000, click Get Started, and sign in with any
   email address. No password, no account creation.

5. **Toggle dark mode** using the control at the right edge of the page
   footer, and confirm the theme flips. Both labs depend on it.

That is the whole gate: Node, a browser, and Claude Code. If
`npm install` fails on a corporate network, note the error and bring it to
the session; that is useful information, not a failure.
