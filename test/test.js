const CookieDB = require('../cookiedb')
const assert = require('assert')
require('./localstorage')()

describe('CookieDB', function () {
  let db

  it('should create a new CookieDB', function () {
    db = new CookieDB()
    assert(db)
  })

  it('should create a collection', function () {
    db.createCollection('books')
  })

  it('should count the entries', function () {
    assert(db.count() === 0)
  })

  it('should insert into the db', function () {
    db.insert('books', { title: 'The Great Gatsby', year: 1925, author: 'F. Scott Fitzgerald' })
    db.insert('books', { title: 'Nineteen Eighty-Four', year: 1949, author: 'George Orwell' })
    db.insert('books', { title: 'To Kill a Mockingbird', year: 1960, author: 'Harper Lee' })
    db.insert('books', { title: 'Animal Farm', year: 1945, author: 'George Orwell' })

    assert(db.count() === 4)
  })

  it('should update the collections', function () {
    db.update('books', 1, { author: 'Eric Blair' })
    db.update('books', 3, { author: 'Eric Blair' })

    assert(db.count() === 4)

    const book = db.find('books', {title: 'Nineteen Eighty-Four'})[0]
    assert(book.author === 'Eric Blair')
  })

  it('should find the collections', function () {
    db.insert('books', { title: '', year: 1925, author: '' })
    const books = db.find('books', {year: 1925})
    assert(books.length === 2)
  })

  it('should remove collections', function () {
    db.remove('books', { year: 1925 })
    assert(db.count() === 3)
  })

  it('should drop all contents', function () {
    db.drop()
    assert(db.count() === 0)
  })
})
