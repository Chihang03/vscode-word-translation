const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const test = require('node:test')
const source = fs.readFileSync(__dirname + '/../src/index.js', 'utf8')
function deferred() {
  let resolve
  let reject
  const promise = new Promise((a, b) => { resolve = a; reject = b })
  return { promise, resolve, reject }
}
function setup(query = async () => ({w: '你好', p: 'hello'}), execute) {
  const commands = new Map()
  const events = {}
  const calls = []
  const point = n => ({n, isEqual(other) {return this.n === other.n}})
  const selection = text => ({text, isEmpty: !text, start: point(0), end: point(text.length), active: point(text.length), isEqual(other) {return this.text === other.text}})
  const editor = {selection: selection('hello'), document: {version: 1, getText(sel) {return sel.text}}, decorations: [], setDecorations(type, value) {this.decorations = value}}
  const on = name => listener => {events[name] = listener; return {dispose() {}}}
  const vscode = {
    window: {activeTextEditor: editor, createTextEditorDecorationType: () => ({dispose() {}}), onDidChangeTextEditorSelection: on('selection'), onDidChangeActiveTextEditor: on('active'),},
    workspace: {onDidChangeTextDocument: on('document')},
    commands: {registerCommand(id, fn) {commands.set(id, fn); return {dispose() {}}}, async executeCommand(id, ...args) {calls.push([id, ...args]); if (execute) return execute(id, ...args)}},
    ThemeColor: class {}, DecorationRangeBehavior: {ClosedClosed: 0}, Range: class {constructor(start, end) {this.start = start; this.end = end}},
    MarkdownString: class {constructor(value) {this.value = value} appendMarkdown(s) {this.value += s}},
  }
  const module = {exports: {}}
  vm.runInNewContext(source, {module, require(id) {
    if (id === 'vscode') return vscode
    if (id === './query') return query
    if (id === './format') return require(__dirname + '/../src/format.js')
    throw new Error(id)
  }})
  const context = {subscriptions: []}
  module.exports.init(context)
  return {editor, vscode, calls, events, selection, context, translate: commands.get('word-translation-shortcuts.translate'), dismiss: commands.get('word-translation-shortcuts.dismiss')}
}
test('explicit translation focuses hover and retains content until dismissal', async () => {
  const showing = deferred()
  const s = setup(undefined, id => id === 'editor.action.showHover' ? showing.promise : undefined)
  const run = s.translate()
  await new Promise(setImmediate)
  assert.equal(s.editor.decorations.length, 1)
  assert.match(s.editor.decorations[0].hoverMessage.value, /你好/)
  assert.equal(s.calls.find(call => call[0] === 'editor.action.showHover')[1].focus, true)
  showing.resolve()
  await run
  assert.equal(s.editor.decorations.length, 1)
  await s.dismiss()
  assert.equal(s.editor.decorations.length, 0)
  assert.equal(s.calls.at(-1)[0], 'editor.action.hideHover')
})
test('selection changes clear current result', async () => {
  const s = setup(); await s.translate()
  s.editor.selection = s.selection('world')
  await s.events.selection({textEditor: s.editor})
  assert.equal(s.editor.decorations.length, 0)
})
test('document edits and editor switches clear results', async () => {
  const s = setup(); await s.translate()
  s.editor.document.version++
  await s.events.document({document: s.editor.document})
  assert.equal(s.editor.decorations.length, 0)
  await s.translate()
  s.vscode.window.activeTextEditor = undefined
  await s.events.active()
  assert.equal(s.editor.decorations.length, 0)
})
test('no editor or empty selection is harmless', async () => {
  const s = setup(); s.vscode.window.activeTextEditor = undefined; await s.translate()
  s.vscode.window.activeTextEditor = s.editor; s.editor.selection = s.selection(''); await s.translate()
  assert.equal(s.calls.length, 0)
})
test('changing the selection during lookup prevents stale hover', async () => {
  const pending = deferred(); const s = setup(() => pending.promise)
  const run = s.translate(); await new Promise(setImmediate)
  s.editor.selection = s.selection('world'); await s.events.selection({textEditor: s.editor})
  pending.resolve({w: '你好', p: ''}); await run
  assert.equal(s.editor.decorations.length, 0)
  assert.ok(!s.calls.some(call => call[0] === 'editor.action.showHover'))
})
test('latest of two overlapping translations wins', async () => {
  const pending = deferred(); let count = 0
  const s = setup(() => ++count === 1 ? pending.promise : Promise.resolve({w: '新的结果', p: ''}))
  const first = s.translate(); await new Promise(setImmediate)
  await s.translate(); pending.resolve({w: '旧的结果', p: ''}); await first
  assert.match(s.editor.decorations[0].hoverMessage.value, /新的结果/)
  assert.equal(s.calls.filter(call => call[0] === 'editor.action.showHover').length, 1)
})
test('show failure clears decoration and visibility context', async () => {
  const s = setup(undefined, id => {if (id === 'editor.action.showHover') throw new Error('show failed')})
  await assert.rejects(s.translate(), /show failed/)
  assert.equal(s.editor.decorations.length, 0)
  assert.equal(s.calls.at(-1)[2], false)
})
test('real local dictionary still translates camelCase identifiers', async () => {
  const s = setup(require(__dirname + '/../src/query.js'))
  s.editor.selection = s.selection('helloWorld'); await s.translate()
  const result = s.editor.decorations[0].hoverMessage.value
  assert.match(result, /hello/); assert.match(result, /world/); assert.match(result, /世界/)
})

test('code selection looks up clean words and renders real dictionary results', async () => {
  const words = []
  const query = require(__dirname + '/../src/query.js')
  const s = setup(word => {words.push(word); return query(word)})
  s.editor.selection = s.selection('self._launcher_settings = load_launcher_settings()')
  await s.translate()
  assert.deepEqual(words, ['self', 'launcher', 'settings', 'load'])
  const result = s.editor.decorations[0].hoverMessage.value
  assert.match(result, /\[self\]/)
  assert.match(result, /\[settings\]/)
  assert.match(result, /设置/)
  assert.match(result, /自己/)
  assert.doesNotMatch(result, /本地词库暂无结果/)
})

test('punctuation-only selection clears old content without querying or showing an empty hover', async () => {
  let queries = 0
  const s = setup(async () => {queries++; return {w: '你好', p: ''}})
  await s.translate()
  s.calls.length = 0
  s.editor.selection = s.selection(' = () 123 ')
  await s.translate()
  assert.equal(queries, 1)
  assert.equal(s.editor.decorations.length, 0)
  assert.ok(!s.calls.some(call => call[0] === 'editor.action.showHover'))
})
