## Word Translation Shortcuts 0.1.7（Preview）

发布者：Kieran Dai（chihang03）。扩展 ID：chihang03.word-translation-shortcuts。

- 修复 `self.`、`settings=`、`settings()` 等代码符号导致查词失败的问题。
- `self._launcher_settings = load_launcher_settings()` 提取为 `self`、`launcher`、`settings`、`load`，重复单词只显示一次。
- 支持驼峰、下划线、连字符与 HTTPServer 等缩写拆分；符号和数字选区不显示空翻译框。
- 保留 Windows/Linux Alt+Q、Mac Control+S、右键 Translate 及翻译结果生命周期。
- 保留 MIT 许可证和上游作者来源说明。

已知限制：原生翻译浮窗仍可能因鼠标移动关闭；实体 Windows/Linux 快捷键及桌面环境冲突尚未验证。

此商店版使用独立扩展标识，需要主动安装，不会作为原插件的自动更新安装。
