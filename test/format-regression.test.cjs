const assert = require('node:assert/strict')
const test = require('node:test')
const {getWordArray} = require('../src/format.js')

test('Python assignments and member access produce clean, distinct words', () => {
  assert.deepEqual(getWordArray('self._launcher_settings = load_launcher_settings()'),
    ['self', 'launcher', 'settings', 'load'])
  assert.deepEqual(getWordArray('self._launcher_settings='), ['self', 'launcher', 'settings'])
})

test('operators, arguments and brackets separate words without merging them', () => {
  assert.deepEqual(getWordArray('settings=load(settings); obj?.name ?? items[index]'),
    ['settings', 'load', 'obj', 'name', 'items', 'index'])
  assert.deepEqual(getWordArray('left!=right && value>=limit || first+second'),
    ['left', 'right', 'value', 'limit', 'first', 'second'])
})

test('camelCase, PascalCase, snake_case and kebab-case remain supported', () => {
  for (const input of ['loadLauncherSettings', 'LoadLauncherSettings',
    'load_launcher_settings', 'load-launcher-settings']) {
    assert.deepEqual(getWordArray(input), ['load', 'launcher', 'settings'])
  }
})

test('acronyms stay together and separate from following capitalized words', () => {
  assert.deepEqual(getWordArray('HTTPServer XMLHttpRequest parseJSON URL'),
    ['http', 'server', 'xml', 'request', 'parse', 'json', 'url'])
  assert.deepEqual(getWordArray('HTTP SERVER'), ['http', 'server'])
})

test('repeated words are deduplicated after case normalization', () => {
  assert.deepEqual(getWordArray('Settings settings SETTINGS self.self'), ['settings', 'self'])
})

test('quotes and multiline code keep adjacent words separate', () => {
  assert.deepEqual(getWordArray('"hello""world"\n\tself._settings = \'value\''),
    ['hello', 'world', 'self', 'settings', 'value'])
})

test('numeric suffixes and non-English text act as word boundaries', () => {
  assert.deepEqual(getWordArray('foo2Bar utf8Name 设置settings中文value'),
    ['foo', 'bar', 'utf', 'name', 'settings', 'value'])
})

test('empty, numeric and punctuation-only selections have no lookup words', () => {
  for (const input of ['', ' \n\t', '123', '_=(){}[]?.:;+-*/!=', '设置']) {
    assert.deepEqual(getWordArray(input), [])
  }
})
