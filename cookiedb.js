class CookieDB {

  constructor() {
    this.length = JSON.parse(localStorage.getItem('length')) || 0
  }

  createCollection(collection) {
    localStorage.setItem(collection, JSON.stringify([]))
  }

  insert(collection, ...values) {
    let data = JSON.parse(localStorage.getItem(collection))

    values.forEach(value => {
      value._id = this.length++
      data.push(value)
    })

    localStorage.setItem('length', JSON.stringify(this.length))
    localStorage.setItem(collection, JSON.stringify(data))
  }

  find(collection, query) {
    let items = JSON.parse(localStorage.getItem(collection))

    for (let property in query)
      items = items.filter(item => item[property] == query[property])

    return items
  }

  remove(collection, ...queries) {
    let data = localStorage.getItem(collection)

    queries.forEach(query => {
      let items = this.find(collection, query)
      items
        .map(item => JSON.stringify(item))
        .forEach((item) => {
          data = data.replace(new RegExp(`(,${item})|(,${item},)|(${item},)`, 'g'), '')
        })
    })

    localStorage.setItem(collection, data)
  }

  update(collection, ...changes) {
    let items = JSON.parse(localStorage.getItem(collection))

    changes.forEach(function(change) {
      for (let property in change.value) {
        items[change.key][property] = change.value[property]
      }
    })

    localStorage.setItem(collection, JSON.stringify(items))
  }

  count() {
    return this.length
  }

  dump() {
    return localStorage
  }

  drop() {
    localStorage.clear()
  }

}

if (module) module.exports = CookieDB