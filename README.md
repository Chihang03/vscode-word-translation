# Word Translation：Chihang03 修改版

本仓库 fork 自 [liqwang/vscode-word-translation](https://github.com/liqwang/vscode-word-translation)，保留原项目代码、作者信息和 MIT 许可证。当前版本增加 Mac 的 Control+S 翻译快捷键，并调整翻译结果的清理时序及异步查询处理。

**已知限制：翻译仍使用 VS Code 原生悬浮窗口，鼠标移动仍可能导致窗口消失。此版本没有实现“仅点击翻译框外部才关闭”。**

## 安装与使用

从本仓库 [Releases](https://github.com/Chihang03/vscode-word-translation/releases) 下载 `.vsix`。在 VS Code 扩展视图右上角“…”中选择“从 VSIX 安装…”，安装后按提示重新加载窗口。

Mac：选中文字后按 **Control+S（⌃S）**，不是 Command+S。Command+S 继续保存文件。Windows/Linux：Ctrl+K 后 Ctrl+Shift+T。快捷键仅在代码编辑器有文字选区时生效。

如果此前手动给 Translate 绑定过 Command+K，请把用户快捷键中 `word-translation.translate` 的 `key` 改成 `ctrl+s`，避免用户规则保留旧按键。

GitHub Release 提供的是**本地兼容升级包**，扩展 ID 使用 `quanquan-cho.word-translation`，用于替换已有的同款 Marketplace 插件；它由此 fork 构建，并非原发布者的官方更新。源码中的原 `publisher`、`author` 字段保留作为项目来源信息。此仓库的自动工作流只打包并发布 GitHub 附件，不发布到 VS Code Marketplace，也不需要 Marketplace Token。

## 开发与打包

- 运行 `npm run test:unit`，需要 Node.js 18+，无需安装额外依赖。
- 本地打包：`python3 scripts/package-vsix.py --publisher QuanQuan-CHO --output word-translation-local.vsix`。
- Actions 手动运行会提供安装包 artifact；推送与 `package.json` 版本一致的 `v*` 标签会建立 GitHub Release 并上传安装包。

回归测试覆盖装饰内容生命周期和异步结果处理；它不代表实际鼠标移动或实体按键路径已验证。

---

## 原项目说明

## 简介
<!-- No VSCode logo for legal reason: https://github.com/simple-icons/simple-icons/issues/11236 -->
![Version](https://img.shields.io/visual-studio-marketplace/v/quanquan-cho.word-translation?label=Version)
![Installs](https://img.shields.io/visual-studio-marketplace/i/quanquan-cho.word-translation?label=Installs)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/quanquan-cho.word-translation?label=Downloads)

Word Translate是一款纯粹的VSCode划词翻译插件，基于[Code Translate插件](https://marketplace.visualstudio.com/items?itemName=w88975.code-translate)修改，将原插件的**悬浮翻译**改为**鼠标右键翻译**，不被悬浮翻译窗干扰

![translate.gif](https://github.com/QuanQuan-CHO/vscode-word-translation/assets/90035785/4f863c52-5f49-430c-92a5-0d6db080e0ce)


1. 无侵入式的显示翻译结果: 与VS Code代码分析完美结合 

2. 强大的单词拆分能力: 支持驼峰, 下划线形式等各种单词拆分

3. 丰富的本地词库: 包含 340 万+离线单词, 支持各种生僻单词

4. 基于丰富的本地词库: Word Translate 拥有超快的查询速度, 每个单词在基本在 10ms 内可查询完毕

---


## 预览

- 自动拆分组合词:
  ![screen_01.png](https://github.com/w88975/code-translate-vscode/blob/master/assets/Snipaste_02.png?raw=true)
- 自由框选单词:
  ![screen_01.png](https://github.com/w88975/code-translate-vscode/blob/master/assets/Snipaste_03.png?raw=true)
- 跳转第三方查询
  ![screen_01.png](https://github.com/w88975/code-translate-vscode/blob/master/assets/Snipaste_04.png?raw=true)

---
## License

MIT License

Copyright (c) [2020] [w88975]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 翻译快捷键（0.1.4）

选中要翻译的文字，在编辑器中按以下快捷键，直接执行 Translate：

- macOS：直接按 `Control+S`（`⌃S`，不是 `Command+S`）。
- Windows / Linux：先按 `Ctrl+K`，松开后按 `Ctrl+Shift+T`（沿用 0.1.2）。

快捷键仅在编辑器有文字选区时触发，右键 Translate 仍可使用。可以在 VS Code 的“键盘快捷方式”中搜索 `word-translation.translate` 并修改。

### macOS 的快捷键范围

`Control+S` 只在代码编辑器有选区时执行翻译。Mac 的保存文件快捷键 `Command+S` 不受影响；本版不再使用 `Command+K`，不占用原有的两段式快捷键前缀。其他扩展或用户自定义快捷键仍可能占用 Control+S，可在“键盘快捷方式”中检查。

如果之前手动在用户 `keybindings.json` 中为 Translate 配置了其他按键，请将原条目的 `key` 改成 `ctrl+s`，避免旧绑定继续生效。Windows/Linux 沿用原有绑定，避免占用这些系统的 Ctrl+S 保存快捷键。

### 悬浮窗口的行为边界

快捷键绕过长右键菜单，减少鼠标从菜单位置移动到结果窗口的距离。结果继续使用 VS Code 原生悬浮窗口，实际使用仍可能因鼠标移动而关闭。这一版没有实现“仅点击窗口外部才关闭”。按 Esc、改变选区、编辑文本或切换编辑器会清理本次翻译。

此版本要求 VS Code 1.73.0 或更新版本。

回归检查：`npm run test:unit`（Node.js 18+，无需安装额外依赖）。
