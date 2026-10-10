# Kieran Code Lexicon（代码词典）

由 **Kieran Dai（GitHub：Chihang03；Marketplace 发布者：chihang03）** 独立维护的代码单词查询工具。选中代码里的英文单词或标识符，用快捷键查询本地中英词库。

**这是社区 fork，基于 liqwang 的 vscode-word-translation；项目最初源自 w88975 的 code-translate-vscode。本产品独立维护，不代表上游作者，也未获得上游作者的官方背书。** 原项目的 MIT 许可证、版权声明和来源信息继续保留。

## 使用

1. 在代码编辑器中选中英文单词或标识符。
2. Windows/Linux 按 **Alt+Q**；macOS 按 **Control+S（⌃S）**。
3. 或使用编辑器右键菜单中的 **Kieran Code Lexicon：翻译所选单词**。也可在命令面板中搜索 Kieran Code Lexicon。

快捷键只在代码编辑器获得焦点且有文字选区时生效。Windows/Linux 的 Ctrl+S、Mac 的 Command+S 继续保存文件。按 Esc、改变选区、编辑文本或切换编辑器会清理结果。要求 VS Code 1.73.0 或更新版本。

## 代码选词

例如选中：

```python
self._launcher_settings = load_launcher_settings()
```

会提取 `self`、`launcher`、`settings`、`load`，按首次出现的顺序查询，重复单词只显示一次。点号、等号、括号、下划线、空白和数字作为分隔符，避免把 `self.`、`settings=` 等代码符号带入查词。`HTTPServer` 会拆成 `http`、`server`。只选中符号或数字时不显示空结果。

当前功能是拆分单词后查询本地词库，尚不提供整句翻译。本地词库没有结果时，可以主动打开 Google 翻译或百度翻译链接；只有点击链接才会把对应单词交给该网站。扩展本身不自动向这些网站发送选区内容。

## 产品身份与安装

- 产品名：**Kieran Code Lexicon（代码词典）**，0.1.8 起使用独立绘制的图标。
- 当前源码：[此仓库的 marketplace 分支](https://github.com/Chihang03/vscode-word-translation/tree/marketplace)。问题反馈请使用[本仓库 Issues](https://github.com/Chihang03/vscode-word-translation/issues)。
- 扩展 ID：`chihang03.word-translation-shortcuts`。产品更名后保留这一标识，便于已有安装升级；不使用上游发布者的扩展 ID。
- 本产品不会作为上游扩展的官方更新安装。历史 0.1.5 及更早的开发包沿用过上游标识，可能覆盖原插件；它们不代表上游官方发行，新的独立版本不再使用这种身份。

可以从本仓库 [Releases](https://github.com/Chihang03/vscode-word-translation/releases) 下载独立版本的 VSIX，在 VS Code 扩展视图“…”中选择“从 VSIX 安装…”。若同时启用同类翻译扩展，可能出现重复菜单或快捷键冲突，可按需要禁用其中一个。

**商店状态：** Microsoft 的[公开移除记录](https://github.com/microsoft/vsmarketplace/blob/main/RemovedPackages.md)将本扩展列为 2026-10-09 移除，分类为 Impersonation。0.1.8 是品牌与来源说明整改版本，不表示商店条目已经恢复或微软已认可整改。能否恢复原条目，需由 Marketplace 团队复核。

## 快捷键与当前限制

可在 VS Code“键盘快捷方式”中搜索 `word-translation-shortcuts.translate` 并修改。其他扩展或 Linux 桌面环境可能占用 Alt+Q；系统占用时还需调整桌面环境绑定。

这是预览版本。结果使用 VS Code 原生悬浮窗口，鼠标移动仍可能导致窗口消失，尚未实现“点击框外才关闭”。实体 Windows/Linux 按键触发及桌面环境冲突尚未验证。

## 来源与开发

本 fork 在上游基础上改进代码选词、增加主动翻译快捷键，并调整翻译结果生命周期。上游代码和本地词库的来源见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)，许可证见 [LICENSE](LICENSE)。

运行 `npm run test:unit`（Node.js 18+，无需额外依赖）。正式发行包使用 `@vscode/vsce package --no-dependencies --githubBranch marketplace`；GitHub 工作流只生成 VSIX 和 GitHub Release，不会自动发布到 Marketplace。
