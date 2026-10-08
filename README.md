# Word Translation Shortcuts

通过快捷键或右键 Translate 查询选中的英文单词，支持驼峰、下划线组合词拆分和本地离线词库。由 Kieran Dai 维护，基于 [liqwang/vscode-word-translation](https://github.com/liqwang/vscode-word-translation)，原项目源自 [w88975/code-translate-vscode](https://github.com/w88975/code-translate-vscode)。保留原项目的 MIT 许可证和版权声明。

## 使用

1. 在代码编辑器中选中要翻译的文字。
2. Windows/Linux 按 **Alt+Q**；macOS 按 **Control+S（⌃S）**。
3. 也可以使用编辑器右键菜单中的 Translate。

快捷键只在代码编辑器获得焦点且有文字选区时生效。Windows/Linux 的 Ctrl+S、Mac 的 Command+S 继续保存文件。按 Esc、改变选区、编辑文本或切换编辑器会清理翻译内容。要求 VS Code 1.73.0 或更新版本。

## 快捷键设置

可在 VS Code“键盘快捷方式”中搜索 `word-translation-shortcuts.translate` 并修改。其他扩展或 Linux 桌面环境全局快捷键可能占用 Alt+Q；系统占用时还需调整桌面环境绑定。

本扩展是独立维护的 fork，商店版使用自己的扩展标识，不会作为原 Marketplace 插件的自动更新安装。若同时启用同类翻译插件，可能出现重复菜单或相同快捷键，请按需要禁用其中一个或修改绑定。

## 当前限制

这是预览版本。翻译结果使用 VS Code 原生悬浮窗口，鼠标移动仍可能导致窗口消失，尚未实现“点击框外才关闭”。实体 Windows/Linux 按键触发及桌面环境冲突尚未验证。

## 来源与维护

- 当前商店版源码：[Chihang03/vscode-word-translation 的 marketplace 分支](https://github.com/Chihang03/vscode-word-translation/tree/marketplace)。
- 上游作者：liqwang、w88975；原项目版权声明见 [LICENSE](LICENSE)。
- 翻译数据和单词拆分逻辑沿用上游项目；本 fork 增加主动翻译快捷键和翻译结果生命周期处理。

## 开发

运行 `npm run test:unit`（Node.js 18+，无需额外依赖）。测试覆盖翻译结果清理及异步查询处理，不能替代实际桌面交互验证。
