export function BookWishlist({ books, onRemoveFromWishlist }) {
    const filteredBooks = books.filter(book => book.wishlist)

    return (
      <section>
        <ul className="book-list clean-list">
          {filteredBooks.map((book) => (
            <li className="book-wishlist clean-list" key={book._id}>
              <div className="wishlist-item">
                <div>{book.title}</div>
                <div>
                  <button
                    onClick={() => {
                        onRemoveFromWishlist(book._id);
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
