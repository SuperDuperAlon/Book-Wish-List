export const SET_BOOKS = 'SET_BOOKS'
export const REMOVE_BOOK = 'REMOVE_BOOK'
export const ADD_BOOK = 'ADD_BOOK'
export const UPDATE_BOOK = 'UPDATE_BOOK'
export const UNDO_REMOVE_BOOK = 'UNDO_REMOVE_BOOK'

const initialState = {
    books: [],
}

export function bookReducer(state = initialState, action) {
    var newState = state
    var books
    switch (action.type) {
        case SET_BOOKS:
            newState = { ...state, books: action.books }
            break
        case REMOVE_BOOK:
            // const lastRemovedBook = state.books.find(book => book._id === action.bookId)
            books = state.books.filter(book => book._id !== action.bookId)
            newState = { ...state, books }
            break
        case ADD_BOOK:
            newState = { ...state, books: [...state.books, action.book] }
            break
        case UPDATE_BOOK:
            books = state.books.map(book => (book._id === action.book._id) ? action.book : book)
            newState = { ...state, books }
            break
        default:
    }
    return newState
}
