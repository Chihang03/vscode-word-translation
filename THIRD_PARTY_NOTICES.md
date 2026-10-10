# Third-party notices and project provenance

## Upstream code and bundled dictionary

Kieran Code Lexicon is an independently maintained community fork of:

- [liqwang/vscode-word-translation](https://github.com/liqwang/vscode-word-translation)
- Earlier source: [w88975/code-translate-vscode](https://github.com/w88975/code-translate-vscode)

The upstream MIT license and its original `Copyright (c) [2020] [w88975]` notice are preserved in [LICENSE](LICENSE). Upstream authors are credited for the inherited work; they are not identified as the publisher or maintainer of this fork. This product does not represent the upstream authors and does not claim their endorsement.

The dictionary files in `src/dict/` are inherited unchanged from the upstream repository. This fork has not independently established the original collection sources or separate licensing history of those dictionary entries. Preservation of the repository license is not evidence that every dictionary entry has an independently verified provenance.

## Bundled humps helper

`src/humps.js` is an inherited copy of [humps by Dom Christie](https://github.com/domchristie/humps). Its existing source notice, `copyright © 2012+ Dom Christie` and `Released under the MIT license`, is retained. This fork does not claim authorship of that helper.

## Fork identity and icon

Current maintainer: Kieran Dai (GitHub `Chihang03`; Marketplace publisher `chihang03`). The extension identifier is `chihang03.word-translation-shortcuts`; internal identifiers are retained for upgrade compatibility.

The product icon used from 0.1.8 onward is newly generated for this fork with an image generation tool. It was created without an upstream icon reference and combines generic code chevrons with Latin `A` and Chinese `文`. It replaces the inherited icon. No upstream logo, Marketplace statistics badge, Microsoft logo or verification badge is used to present this fork as an official release.

## External translation links

Google Translate and Baidu Translate are external destinations for user-initiated lookups. Their names identify the linked services; no partnership or endorsement is claimed. Clicking a translation link opens the selected word at that service. The extension performs local dictionary lookup without automatically sending selected text to those services.
