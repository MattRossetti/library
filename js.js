function Book(title, author, pages, read, index) {
  // constructor
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.index = index;

  this.info = () => {
    const readText = read ? 'read' : 'not read yet'
    const info = `${title} by ${author}, ${pages} pages, ${readText}.`
    return info
  }
}

let updateOverview = () => {
  const totalBooks = library.length;
  overviewLibraryTotal.textContent = `Books in library: ${totalBooks}`;
  let booksRead = 0;
  library.forEach((book) => book.read ? booksRead += 1: 'pass')
  if (booksRead === undefined) booksRead = 0;
  overviewBooksRead.textContent = `Books read: ${booksRead}`;
  let pagesRead = 0;
  library.forEach((book) => {
    book.read ? pagesRead += parseInt(book.pages) : 'pass'
  });
  if (pagesRead === undefined) pagesRead = 0;
  overviewPagesRead.textContent = `Pages Read: ${pagesRead}`;
}

let toggleRead = (e) => {
  e.classList.toggle('read');
  if (e.classList.contains('read')) e.textContent = 'Mark as unread';
  else e.textContent = 'Mark as read';
  const indexToToggle = parseInt(e.parentNode.getAttribute('data-index'));
  const bookToToggleRead = library.find((book) => book.index === indexToToggle)
  bookToToggleRead.read = !bookToToggleRead.read
  updateOverview();
}

let handlePopulateError = () => {
  populateErrorMessage.classList.remove('hidden');
}

let handleNumberError = () => {
  numberErrorMessage.classList.remove('hidden');
}

let removeFromLibrary = (indexToRemove) => {
  let newLibrary = [];
  newLibrary = library.filter(book => book.index != indexToRemove);
  library = newLibrary;
}

let sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

let removeBook = (e) => {
  const bookCard = e.parentNode;
  const bookToRemoveIndex = parseInt(bookCard.getAttribute('data-index'))
  bookCard.remove();
  const indexToRemove = library.findIndex((e) => e.index === bookToRemoveIndex)
  removeFromLibrary(indexToRemove);
  sleep(200);
  updateOverview();
}

let createBookCard = (book) => {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card')
  bookCard.setAttribute('data-index', book.index);
  const bookTitle = document.createElement('div');
  bookTitle.textContent = `Title: ${book.title}`;
  const bookAuthor = document.createElement('div');
  bookAuthor.textContent = `Author: ${book.author}`;
  const bookPages = document.createElement('div');
  bookPages.textContent = `Pages: ${book.pages}`;
  const readButton = document.createElement('BUTTON');
  readButton.textContent = 'Mark As Read';
  readButton.classList.add('read-button');
  readButton.addEventListener('click', (e) => toggleRead(e.target));
  if (book.read) readButton.classList.add('read');
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove'
  removeButton.classList.add('remove-button')
  removeButton.addEventListener('click', (e) => removeBook(e.target));
  // removeButton.addEventListnener('click', (e) => removeCard(e));
  bookCard.append(bookTitle, bookAuthor, bookPages, readButton, removeButton);
  bookCardContainer.appendChild(bookCard)
}


let handleSubmitButton = () => {
  clearErrorMessages();
  const title = inputTitle.value;
  const author = inputAuthor.value;
  const pages = inputPages.value;
  const read = readCheckbox.checked ? true : false;
  if (title === '' || author === '') return handlePopulateError()
  const isNum = /^\d+$/.test(pages)
  if (!isNum) return handleNumberError();
  const newBook = new Book(title, author, pages, read, index)
  index += 1;
  library.push(newBook);
  modalContainer.classList.remove('show-modal');
  inputForm.reset();
  createBookCard(newBook);
  updateOverview();
}

let clearErrorMessages = () => {
  populateErrorMessage.classList.add('hidden');
  numberErrorMessage.classList.add('hidden');
}

/*-----Script-----*/



// library.forEach(e => console.log(e.info()))

let library = [];
let index = 0;
const addBookButton = document.querySelector('.add-book-button');
const modalContainer = document.getElementById('modal-container');
const closeModalButton = document.getElementById('close-modal-button');
const submitBookButton = document.getElementById('submit-book-button');
const inputTitle = document.getElementById('form-title');
const inputAuthor = document.getElementById('form-author');
const inputPages = document.getElementById('form-pages');
const readCheckbox = document.getElementById('form-read-checkbox');
const inputForm = document.getElementById('input-form');
const populateErrorMessage = document.getElementById('populate-error-message');
const numberErrorMessage = document.getElementById('number-error-message');
const bookCardContainer = document.querySelector('.book-card-container');
const overviewLibraryTotal = document.getElementById('overview-library-total');
const overviewBooksRead = document.getElementById('overview-books-read');
const overviewPagesRead = document.getElementById('overview-pages-read');

addBookButton.addEventListener('click', () => modalContainer.classList.toggle('show'))
closeModalButton.addEventListener('click', () => modalContainer.toggle)

addBookButton.addEventListener('click', () => {
  clearErrorMessages();
  inputForm.reset();
  modalContainer.classList.add('show-modal');
})

closeModalButton.addEventListener('click', () => {
  modalContainer.classList.remove('show-modal');
  inputForm.reset();
})

submitBookButton.addEventListener('click', () => {
  handleSubmitButton();
})

updateOverview();



