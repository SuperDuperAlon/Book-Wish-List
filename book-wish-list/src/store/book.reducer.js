export const SET_BOOKS = 'SET_BOOKS'
export const REMOVE_BOOK = 'REMOVE_BOOK'
export const ADD_BOOK = 'ADD_BOOK'
export const UPDATE_BOOK = 'UPDATE_BOOK'
export const ADD_TO_BOOKT = 'ADD_TO_BOOKT'
export const CLEAR_BOOKT = 'CLEAR_BOOKT'
export const UNDO_REMOVE_BOOK = 'UNDO_REMOVE_BOOK'
export const REMOVE_FROM_BOOKT = 'REMOVE_FROM_BOOKT'

const initialState = {
    books: [],
    lastRemovedBook: null
}

export function bookReducer(state = initialState, action) {
    var newState = state
    var books
    var bookt
    switch (action.type) {
        case SET_BOOKS:
            newState = { ...state, books: action.books }
            break
        case REMOVE_BOOK:
            const lastRemovedBook = state.books.find(book => book._id === action.bookId)
            books = state.books.filter(book => book._id !== action.bookId)
            newState = { ...state, books, lastRemovedBook }
            break
        case ADD_BOOK:
            newState = { ...state, books: [...state.books, action.book] }
            break
        case UPDATE_BOOK:
            books = state.books.map(book => (book._id === action.book._id) ? action.book : book)
            newState = { ...state, books }
            break
        case UNDO_REMOVE_BOOK:
            if (state.lastRemovedBook) {
                newState = { ...state, books: [...state.books, state.lastRemovedBook], lastRemovedBook: null }
            }
            break
        default:
    }
    return newState
}
