import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadBooks, addBook, updateBook, removeBook } from '../store/book.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { bookService } from '../services/book.service.js'

export function BookIndex() {

    const books = useSelector(storeState => storeState.bookModule.books)

    useEffect(() => {
        loadBooks()
    }, [])

    async function onRemoveBook(bookId) {
        try {
            await removeBook(bookId)
            showSuccessMsg('Book removed')            
        } catch (err) {
            showErrorMsg('Cannot remove book')
        }
    }

    async function onAddBook() {
        const book = bookService.getEmptyBook()
        book.vendor = prompt('Vendor?')
        try {
            const savedBook = await addBook(book)
            showSuccessMsg(`Book added (id: ${savedBook._id})`)
        } catch (err) {
            showErrorMsg('Cannot add book')
        }        
    }

    async function onUpdateBook(book) {
        const price = +prompt('New price?')
        const bookToSave = { ...book, price }
        try {
            const savedBook = await updateBook(bookToSave)
            showSuccessMsg(`Book updated, new price: ${savedBook.price}`)
        } catch (err) {
            showErrorMsg('Cannot update book')
        }        
    }


    function onAddBookMsg(book) {
        console.log(`TODO Adding msg to book`)
    }

    return (
        <div>
            <h3>Books App</h3>
            <main>
                <button onClick={onAddBook}>Add Book ⛐</button>
                <ul className="book-list">
                    {books.map(book =>
                        <li className="book-preview" key={book._id}>
                            <h4>{book.vendor}</h4>
                            <h1>⛐</h1>
                            <p>Price: <span>${book.price.toLocaleString()}</span></p>
                            <p>Owner: <span>{book.owner && book.owner.fullname}</span></p>
                            <div>
                                <button onClick={() => { onRemoveBook(book._id) }}>x</button>
                                <button onClick={() => { onUpdateBook(book) }}>Edit</button>
                            </div>

                            <button onClick={() => { onAddBookMsg(book) }}>Add book msg</button>
                        </li>)
                    }
                </ul>
            </main>
        </div>
    )
}