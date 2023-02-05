import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";
// import { userService } from './user.service.js'

const STORAGE_KEY = "bookDB";
_createBooks();

export const bookService = {
  query,
  getById,
  save,
  remove,
//   getEmptyBook,
//   addBookMsg,
};
window.cs = bookService;

async function query(filterBy = { txt: "", price: 0 }) {
  var books = await storageService.query(STORAGE_KEY);
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, "i");
    books = books.filter(
      (book) => regex.test(book.vendor) || regex.test(book.description)
    );
  }
  if (filterBy.price) {
    books = books.filter((book) => book.price <= filterBy.price);
  }
  return books;
}

function getById(bookId) {
  return storageService.get(STORAGE_KEY, bookId);
}

async function remove(bookId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, bookId);
}

async function save(book) {
  var savedBook;
  if (book._id) {
    savedBook = await storageService.put(STORAGE_KEY, book);
  } else {
    // Later, owner is set by the backend
    savedBook = await storageService.post(STORAGE_KEY, book);
  }
  return savedBook;
}

// async function addBookMsg(bookId, txt) {
//   // Later, this is all done by the backend
//   const book = await getById(bookId);
//   if (!book.msgs) book.msgs = [];

//   const msg = {
//     id: utilService.makeId(),
//     txt,
//   };
//   book.msgs.push(msg);
//   await storageService.put(STORAGE_KEY, book);

//   return msg;
// }

// function getEmptyBook() {
//   return {
//     vendor: "Susita-" + (Date.now() % 1000),
//     price: utilService.getRandomIntInclusive(1000, 9000),
//   };
// }

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))

function _createBooks() {
  var books = utilService.loadFromStorage(STORAGE_KEY);
  if (!books || !books.length) {
     books = [
      {
        _id: utilService.makeId(),
        title: "Sea of Death",
        description: "Written in 1936 when Amado was twenty-four years old, Sea of Death tells the dockside tales of Bahia. Sailors and their wives, steeped in the rich mythology surrounding the goddess Iemanj?, are at the heart of this novel, a lyrical and tragic portrayal of the workers� daily struggle for survival. Sea of Death narrates the story of Guma and L?via, lovers whose triumphs and tribulations mirror the dark imperatives of the world around them.",
        rating: 4.2,
        author: "Jorge Amado",
        price: 16.35,
      },
      {
        _id: utilService.makeId(),
        title: "The Day Lasts More than a Hundred Years",
        description: "Set in the vast windswept Central Asian steppes and the infinite reaches of galactic space, this powerful novel offers a vivid view of the culture and values of the Soviet Union�s Central Asian peoples.",
        rating: 4.5,
        author: "Chingiz Aitmatov",
        price: 24,
      }
    ];
    utilService.saveToStorage(STORAGE_KEY, books);
  }
}
