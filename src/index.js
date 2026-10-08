const vscode = require('vscode')
const DICTQuery = require('./query')
const formatter = require('./format')

const markdownHeader = `翻译 \`$word\` :  
`
const markdownFooter = `  
`
const markdownLine = `  
*****
`

const genMarkdown = function (word, translation, p) {
  if (!translation && !p) {
    return `- [${word}](https://translate.google.com?text=${word}) :  
本地词库暂无结果 , 查看 [Google翻译](https://translate.google.com?text=${word}) [百度翻译](https://fanyi.baidu.com/#en/zh/${word})`
  }
  return `- [${word}](https://translate.google.com?text=${word}) ${p ? '*/' + p + '/*' : ''}:  
${translation.replace(/\\n/g, `  
`)}`
}

function init(context) {
  // The `vscode.TextEditorDecorationType` object should only be created once
  // Otherwise, the hoverMessage will be displayed repeatedly
  const decorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: new vscode.ThemeColor('editor.background'),
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed
  });
  let resultEditor
  let requestId = 0
  const clearResult = () => {
    requestId += 1
    if (resultEditor) {
      resultEditor.setDecorations(decorationType, [])
      resultEditor = undefined
    }
    return vscode.commands.executeCommand('setContext', 'wordTranslationShortcuts.resultVisible', false)
  }
  context.subscriptions.push(
    decorationType,
    vscode.window.onDidChangeTextEditorSelection(event => {
      if (event.textEditor === vscode.window.activeTextEditor) {
        clearResult()
      }
    }),
    vscode.window.onDidChangeActiveTextEditor(() => clearResult()),
    vscode.workspace.onDidChangeTextDocument(event => {
      if (vscode.window.activeTextEditor && event.document === vscode.window.activeTextEditor.document) {
        clearResult()
      }
    }),
    vscode.commands.registerCommand('word-translation-shortcuts.dismiss', async () => {
      await clearResult()
      await vscode.commands.executeCommand('editor.action.hideHover')
    }),
    vscode.commands.registerCommand('word-translation-shortcuts.translate',
      async function(){
        //1.generate tranlation `hoverMessage`
        const editor = vscode.window.activeTextEditor
        if (!editor || editor.selection.isEmpty) {
          return
        }
        const selection = editor.selection
        const version = editor.document.version
        const clearing = clearResult()
        const request = requestId
        await clearing
        const selectedText = editor.document.getText(selection)
        const words = formatter.getWordArray(selectedText)
        if (words.length === 0) {
          return
        }
        const originText = formatter.cleanWord(selectedText)
        const header = markdownHeader.replace('$word', originText)
        const hoverMessage = new vscode.MarkdownString(header)
        for (const i in words) {
          let word = words[i]
          let ret = await DICTQuery(word)
          if (i == 0) {
            hoverMessage.appendMarkdown(genMarkdown(word, ret.w, ret.p))
          } else {
            hoverMessage.appendMarkdown(markdownLine + genMarkdown(word, ret.w, ret.p))
          }
        }
        hoverMessage.appendMarkdown(markdownFooter)
        hoverMessage.isTrusted = true
        // Discard a result if its selection, document or active editor changed while querying.
        if (request !== requestId || vscode.window.activeTextEditor !== editor ||
          editor.document.version !== version || !editor.selection.isEqual(selection) ||
          !editor.selection.active.isEqual(selection.active)) {
          return
        }

        //2.set `hoverMessage` decoration to editor
        const range = new vscode.Range(selection.start, selection.end)
        const decorationOptions = [{range, hoverMessage}]
        editor.setDecorations(decorationType, decorationOptions)
        resultEditor = editor
        try {
          // Replace an existing hover instead of focusing stale content.
          await vscode.commands.executeCommand('editor.action.hideHover')
          if (request !== requestId) {
            return
          }
          await vscode.commands.executeCommand('setContext', 'wordTranslationShortcuts.resultVisible', true)
          if (request !== requestId) {
            return
          }
          // Request focus; native VS Code hover dismissal rules still apply.
          await vscode.commands.executeCommand('editor.action.showHover', { focus: true })
        } catch (error) {
          if (request === requestId) {
            await clearResult()
          }
          throw error
        }
      }
    )
  )
}


module.exports = {
  init
}
