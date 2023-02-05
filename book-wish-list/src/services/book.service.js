
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'book'

export const bookService = {
    query,
    getById,
    save,
    remove,
    getEmptyBook,
    addBookMsg
}
window.cs = bookService


async function query(filterBy = { txt: '', price: 0 }) {
    var books = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        books = books.filter(book => regex.test(book.vendor) || regex.test(book.description))
    }
    if (filterBy.price) {
        books = books.filter(book => book.price <= filterBy.price)
    }
    return books
}

function getById(bookId) {
    return storageService.get(STORAGE_KEY, bookId)
}

async function remove(bookId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, bookId)
}

async function save(book) {
    var savedBook
    if (book._id) {
        savedBook = await storageService.put(STORAGE_KEY, book)
    } else {
        // Later, owner is set by the backend
        savedBook = await storageService.post(STORAGE_KEY, book)
    }
    return savedBook
}

async function addBookMsg(bookId, txt) {
    // Later, this is all done by the backend
    const book = await getById(bookId)
    if (!book.msgs) book.msgs = []

    const msg = {
        id: utilService.makeId(),
        txt
    }
    book.msgs.push(msg)
    await storageService.put(STORAGE_KEY, book)

    return msg
}

function getEmptyBook() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




