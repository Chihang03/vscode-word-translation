## Word Translation 0.1.5：fork 修改版

基于 liqwang/vscode-word-translation。保留原项目的 MIT 许可证和作者信息。

- Mac 选中文字后使用 **Control+S（⌃S）** 翻译，Command+S 仍保存文件。
- Windows/Linux 选中文字后一次按下 **Alt+Q** 翻译，Ctrl+S 仍保存文件。
- 快捷键仅在编辑器有选区时生效，保留右键 Translate。
- 沿用此前的翻译结果生命周期改进；本次仅简化快捷键和更新文档。
- 如用户旧绑定或 Linux 桌面环境全局快捷键占用 Alt+Q，请调整相关绑定。

**已知限制：原生悬浮框仍可能因鼠标移动消失；没有实现“点击框外才关闭”。实体按键和完整鼠标路径尚未验证。**

附件是本地兼容升级包，扩展 ID 为 quanquan-cho.word-translation，由此 fork 构建，非原发布者官方更新。通过 VS Code“从 VSIX 安装…”安装并重新加载窗口。若手动设置过旧快捷键，请修改该用户绑定。此 Release 不发布到 Marketplace。
