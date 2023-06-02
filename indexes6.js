console.log("This is ES6 version of Project 2");
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {
    add(book) {
        let tableBody = document.getElementById('tableBody');
        let uiString = `
        <tr>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.type}</td>
        </tr>
        `;
        tableBody.innerHTML += uiString;

    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        }
        else {
            return true;
        }
    }

    show(type, displayMessage) {

        let message = document.getElementById('message');
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                 <strong>Message : </strong> ${displayMessage}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`
        setTimeout(function () {
            message.innerHTML = ''
        }, 2000)
    
    }
}

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

    entryObj = [];

    let myObj = {
        name : name,
        author : author,
        type : type
    }

    entryObj.push(myObj);
    localStorage.setItem("tableBody",JSON.stringify(entryObj));



    

    let book = new Book(name, author, type);
    console.log(book);
    

    let display = new Display();
    if (display.validate(book)) {

        display.add(book);
        display.clear();
        display.show('success', ' Book has been added');


    }
    else {
        display.show('danger', ' Too short book name or author name');
    }
    e.preventDefault();
}

