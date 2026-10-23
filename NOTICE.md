# Notices and Attribution

This repository holds material under two licenses.

## Files derived from ethereum.org: MIT

The site began in January 2024 as a copy of the open-source
[ethereum.org website](https://github.com/ethereum/ethereum-org-website). Much of the application
code is derived from that project: the Next.js pages, layouts, components, hooks, theme, build
scripts and project configuration, and the structure of the interface string files in `src/intl/`.
Those files remain under its MIT license:

> Copyright (c) 2019 ethereum.org contributors

The full license text is in [`LICENSES/ethereum-org-MIT.txt`](LICENSES/ethereum-org-MIT.txt),
restored verbatim from the version the site was copied from. MIT requires that notice and
permission text to stay with any substantial portion of the code, so do not delete this file or the
license text while derived code remains.

The navigation bar in `src/components/Nav/` (2026) follows the structure of the current
ethereum.org navigation (mega-menu sections with item descriptions, a language picker with a
filter, and a mobile drawer). It was rewritten for this codebase (Chakra UI and the Pages Router);
no Ethereum copy, logos or artwork are used.

## Co-x3 Family Foundation content and additions: CC BY-NC-SA 4.0

Co-x3's own page content, interface wording, images and logos (for example `public/content/`,
`public/assets/` and the Co-x3 wording in `src/intl/`), and Co-x3's additions to the code, are
licensed under the
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](LICENSE).
Using this license for the combined work does not change the MIT terms of the derived files above.

The ethereum.org name and logos are trademarks of their owners and are not used on this site.

## Third-party packages

Packages installed from npm keep their own licenses; see each package under `node_modules/`.
