export function BookWishlist({ books, onRemoveBook }) {
  if (!books) return <div>No Books</div>;
  else
    return (
      <section>
        <ul className="book-list clean-list">
          {books.map((book) => (
            <li className="book-wishlist clean-list" key={book._id}>
              <div className="wishlist-item">
                <div>{book.title}</div>
                <div>
                  <button
                    onClick={() => {
                      onRemoveBook(book._id);
                    }}
                  >
                    x
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
}
