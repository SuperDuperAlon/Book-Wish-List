import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  loadBooks,
  updateBook,
} from "../store/book.actions.js";

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";

import { BookPreview } from "../pages/book-preview";
import { BookWishlist } from "./book-wishlist.jsx";

export function BookIndex() {
  const books = useSelector((storeState) => storeState.bookModule.books);

  useEffect(() => {
    loadBooks();
  }, []);

  async function onAddToWishlist(ev, book) {
    ev.stopPropagation();
    const wishlist = !book.wishlist;
    const bookToSave = { ...book, wishlist };
    try {
      const savedBook = await updateBook(bookToSave);
      showSuccessMsg(`Book updated, new price: ${savedBook.price}`);
    } catch (err) {
      showErrorMsg("Cannot update book");
    }
  }

  async function onRemoveFromWishlist(bookId) {
    const book = books.find((book) => bookId === book._id);
    const wishlist = !book.wishlist;
    const bookToSave = { ...book, wishlist };
    try {
      const savedBook = await updateBook(bookToSave);
      showSuccessMsg(`Wishlist updated`);
    } catch (err) {
      showErrorMsg("Cannot update Wishlist");
    }
  }

  if (!books) return <div>loading</div>;
  return (
    <div>
      <main>
        <BookPreview books={books} onAddToWishlist={onAddToWishlist} />
        <BookWishlist
          books={books}
          onRemoveFromWishlist={onRemoveFromWishlist}
        />
      </main>
    </div>
  );
}
