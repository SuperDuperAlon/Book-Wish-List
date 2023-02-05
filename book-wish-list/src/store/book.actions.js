import { bookService } from "../services/book.service.js";
import { store } from "./store.js";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import {
  ADD_BOOK,
  REMOVE_BOOK,
  SET_BOOKS,
  UNDO_REMOVE_BOOK,
  UPDATE_BOOK,
} from "./book.reducer.js";

// Action Creators:
export function getActionRemoveBook(bookId) {
  return {
    type: REMOVE_BOOK,
    bookId,
  };
}
export function getActionAddBook(book) {
  return {
    type: ADD_BOOK,
    book,
  };
}
export function getActionUpdateBook(book) {
  return {
    type: UPDATE_BOOK,
    book,
  };
}

export async function loadBooks() {
  try {
    const books = await bookService.query();
    console.log("Books from DB:", books);
    store.dispatch({
      type: SET_BOOKS,
      books,
    });
  } catch (err) {
    console.log("Cannot load books", err);
    throw err;
  }
}

export async function removeBook(bookId) {
  try {
    await bookService.remove(bookId);
    store.dispatch(getActionRemoveBook(bookId));
  } catch (err) {
    console.log("Cannot remove book", err);
    throw err;
  }
}

export async function addBook(book) {
  try {
    const savedBook = await bookService.save(book);
    console.log("Added Book", savedBook);
    store.dispatch(getActionAddBook(savedBook));
    return savedBook;
  } catch (err) {
    console.log("Cannot add book", err);
    throw err;
  }
}

export function updateBook(book) {
  return bookService
    .save(book)
    .then((savedBook) => {
      console.log("Updated Book:", savedBook);
      store.dispatch(getActionUpdateBook(savedBook));
      return savedBook;
    })
    .catch((err) => {
      console.log("Cannot save book", err);
      throw err;
    });
}

// Demo for Optimistic Mutation
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveBookOptimistic(bookId) {
  store.dispatch({
    type: REMOVE_BOOK,
    bookId,
  });
  showSuccessMsg("Book removed");

  bookService
    .remove(bookId)
    .then(() => {
      console.log("Server Reported - Deleted Succesfully");
    })
    .catch((err) => {
      showErrorMsg("Cannot remove book");
      console.log("Cannot load books", err);
      store.dispatch({
        type: UNDO_REMOVE_BOOK,
      });
    });
}
