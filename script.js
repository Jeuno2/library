let log = console.log;

const bookArray = [];

// book constructor
function Book(author, title, numOfPages, beenRead) {
    this.author = author;
    this.title = title;
    this.numOfPages = numOfPages;
    this.beenRead = beenRead;
} //end constructor

function addBookToLibrary(bookObject) {
    bookArray.push(bookObject);
}

const book1 = new Book("James", "this is my weapon", 109, true);
const book2 = new Book("Richard", "Child's Play", 210, true);


log(book1);
log(book1.author);

addBookToLibrary(book1);
addBookToLibrary(book2);

log(bookArray);


