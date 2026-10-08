## 0.1.4

- macOS 的 Translate 快捷键改为 Control+S，仍仅在编辑器有文字选区时生效。
- 不再占用 macOS 的 Command+K 前缀；不影响 Command+S 保存。
- Windows/Linux 绑定保持原样，避免占用其 Ctrl+S 保存快捷键。

## 0.1.3

- macOS 的 Translate 默认快捷键改为单次 Cmd+K；仅在编辑器有选区时生效。
- Windows/Linux 绑定沿用 0.1.2。
- 明确有选区时会占用 Cmd+K 前缀，影响原有两段式快捷键。

## 0.1.2

- 增加 Translate 快捷键：macOS 为 Cmd+K 后 Cmd+Shift+T，Windows/Linux 为 Ctrl+K 后 Ctrl+Shift+T。
- 快捷键仅在编辑器有选区时触发，保留右键翻译入口。
- 明确原生悬浮窗口仍受鼠标关闭规则影响，快捷键用于绕过长右键菜单。

## 0.1.1

- 右键翻译请求立即聚焦悬浮窗口，延后翻译内容清理；原生悬浮窗口仍可能因鼠标移动关闭。
- 等待显示命令完成，避免翻译内容被提前清除。
- Esc 清理翻译；防止异步查询显示已经过时的选区结果。
- 无活动编辑器或无选区时安全退出，并释放装饰对象。

# Change Log

See https://github.com/QuanQuan-CHO/vscode-word-translation/releases
