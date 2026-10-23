# Notices and Attribution

This repository holds two kinds of material under two licenses.

## Co-x3 Family Foundation content: CC BY-NC-SA 4.0

Original Co-x3 writing, copy, translations, images and logos (for example everything under
`public/content/`, `public/assets/` and `src/intl/`) are licensed under the
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](LICENSE).

## Code derived from ethereum.org: MIT

The site began in January 2024 as a copy of the open-source
[ethereum.org website](https://github.com/ethereum/ethereum-org-website). Much of the application
code (the Next.js pages, layouts, components, hooks, theme and build scripts under `src/` and the
project configuration files) is derived from that project and remains covered by its MIT license:

> Copyright (c) 2019-2026 ethereum.org contributors

The full license text is in [`LICENSES/ethereum-org-MIT.txt`](LICENSES/ethereum-org-MIT.txt). The
MIT license requires that notice to stay with any substantial portion of the code, so do not delete
this file or the license text while derived code remains.

The navigation bar in `src/components/Nav/` (2026) follows the structure of the current
ethereum.org navigation (mega-menu sections with item descriptions, a language picker with a
filter, and a mobile drawer). It was rewritten for this codebase (Chakra UI and the Pages Router);
no Ethereum copy, logos or artwork are used.

The ethereum.org name and logos are trademarks of their owners and are not used on this site.
Every Co-x3 page, translation and image was written for the Co-x3 Family Foundation.

## Third-party packages

Packages installed from npm keep their own licenses; see each package under `node_modules/`.
