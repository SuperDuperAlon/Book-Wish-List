import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadBooks, addBook, updateBook, removeBook, onRemoveBookOptimistic } from '../store/book.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { bookService } from '../services/book.service.js'

import {BookPreview} from '../pages/book-preview'
import { BookWishlist } from './book-wishlist.jsx'

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

    console.log(books)

    if (!books) return <div>loading</div>

    return (
        <div>                   
            <h3>Books App</h3>
            <main>
                <BookPreview books={books}/>
                <BookWishlist books={books} onRemoveBook={onRemoveBook}/>
            </main>
        </div>
    )
}