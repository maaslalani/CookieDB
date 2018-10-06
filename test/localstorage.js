const keys = Symbol.for('keys')

class LocalStorage {
  constructor () {
    this[keys] = new Map()
  }
  get length () {
    return this[keys].size
  }
  key (n) {
    return this[keys].keys()[n]
  }
  getItem (key) {
    const item = this[keys].get(key)
    return item === undefined ? null : item
  }
  setItem (key, value) {
    this[keys].set(key, value)
  }
  removeItem (key) {
    this[keys].delete(key)
  }
  clear () {
    this[keys].clear()
  }
}

module.exports = function () {
  if (!global.localStorage) global.localStorage = new LocalStorage()
}
