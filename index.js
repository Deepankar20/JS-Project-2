console.log("This is a library project")
//ToDos
// 1.store all data in local Storage
// 2.give another column as an option to delete the book
// 3.add a scrollbar to the view

// Constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//Display constructor 
// Add method to display prototype to load books from local storage
Display.prototype.loadBooks = function () {
    let books = JSON.parse(localStorage.getItem('books'));
    if (books) {
        let tableBody = document.getElementById('tableBody');
        let uiString = '';
        books.forEach(function (book) {
            uiString += `
                <tr>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                </tr>
            `;
        });
        tableBody.innerHTML = uiString;
    }
};

// Add call to loadBooks() method when the page loads
window.addEventListener('load', function () {
    let display = new Display();
    display.loadBooks();
});

//Implent the clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

//Implent the validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    }
    else {
        return true;
    }
}

Display.prototype.show = function (type, displayMessage) {

    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                             <strong>Message : </strong> ${displayMessage}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`
    setTimeout(function () {
        message.innerHTML = ''
    }, 2000)

}



// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('Author').value;
    let type;
  
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
  
    if (fiction.checked) {
      type = fiction.value
    }
    else if (programming.checked) {
      type = programming.value
    }
    else if (cooking.checked) {
      type = cooking.value
    }
  
    let book = new Book(name, author, type);
    console.log(book);
  
    let display = new Display();
    if (display.validate(book)) {
      display.add(book);
      display.clear();
      display.show('success', ' Book has been added');
  
      // Add book data to local storage
      let books = [];
      let storedBooks = localStorage.getItem('books');
      if (storedBooks) {
        books = JSON.parse(storedBooks);
      }
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
    else {
      display.show('danger', ' Too short book name or author name');
    }
    e.preventDefault();
  }
  
