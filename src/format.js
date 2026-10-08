
module.exports = {
  // Extract English words before splitting identifier case boundaries.
  // Code punctuation, whitespace and digits separate words instead of joining them.
  getWordArray: function (character) {
    const identifiers = character.match(/[A-Za-z]+/g) || []
    const words = []
    for (const identifier of identifiers) {
      const parts = identifier
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .toLowerCase()
        .split(' ')
      words.push(...parts)
    }
    return Array.from(new Set(words))
  },
  cleanWord: function (character) {
    return character.replace(/"/g, '')
  }
}
