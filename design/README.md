# design/

Committed design inputs for feature work. Everything UI work is built against
lives here, as files in the repo, so no external design tool access is needed.

- `tokens.json` the design token export: semantic colors (light and dark),
  radius scale, and typography. It mirrors `styles/globals.css` exactly; that
  file is the source of truth. If a token changes in CSS, update this file in
  the same commit. A fixture that disagrees with the code teaches the wrong
  lesson.
- `reference/` reference images of target designs, one per feature. A design
  in this directory is buildable entirely from the tokens in `tokens.json`;
  if a design appears to need a value the token set does not provide, that is
  a question to raise, not a value to hardcode.
