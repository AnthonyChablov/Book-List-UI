class Book{ // Book constructor
    constructor(title, author, ISBN){
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
    }
}

class UI{ // UI constructor
    addBookToList(book){ // add book to list method
        const list = document.getElementById('book-list');
        const row = document.createElement('tr'); // Create new tr element
        // insert columns
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.ISBN}</td>
            <td><a href="#" class='delete'>X</a></td>
        `;
        list.appendChild(row);
    }
    showAlert(message, className){ // show alert method
        const div = document.createElement('div'); // created div
        div.className = `alert ${className}`; // add class
        div.appendChild(document.createTextNode(message)); // add text
        
        const container = document.querySelector('.container'); // Get parent 
        const form = document.querySelector('#book-form');

        container.insertBefore(div, form); // insert alert()
        setTimeout(()=> document.querySelector('.alert').remove(), 2400); // Timeout
    }
    deleteBook(target){ // delete book method
        if (target.className === 'delete')
        {
            const ui = new UI();
            target.parentElement.parentElement.remove(); 
            ui.showAlert('Book Removed!', 'success');
        }
    }
    clear(){ // clear method
        // clear fields from form
        document.getElementById('title').value ='',
        document.getElementById('author').value ='',
        document.getElementById('isbn').value ='';
    }
    
} 

// Local storage class
class Storage{
    static getBooks(){
        let books;
        if (localStorage.getItem('books') === null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static displayBooks(){  
        const books= Storage.getBooks();
        const ui = new UI;
        books.forEach(book => {
            // Add book to UI
            ui.addBookToList(book);
        });
    }
    static addBook(book){ // add item to local storage 
        const books = Storage.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(ISBN){
        const books = Storage.getBooks();
        books.forEach((book, i) => 
            book.ISBN === ISBN ?
                books.splice(i,1) : '');
                
        localStorage.setItem('books', JSON.stringify(books));
    }
    
}

// Event Listeners
// Dom Load Event
document.addEventListener('DOMContentLoaded', Storage.displayBooks);




// Add Book
let bookForm = document.getElementById('book-form').addEventListener('submit', (e) => {
    let title = document.getElementById('title').value, // get form values 
        author = document.getElementById('author').value,
        ISBN = document.getElementById('isbn').value;

    const book = new Book(title, author, ISBN); // instantiate book
    const ui = new UI(); // instantiate ui

    title === '' || author === '' || ISBN == '' ? // Validation of entered books
        ui.showAlert('Please fill in all fields', 'error') : // show alert 
        ui.addBookToList(book), // add book to list
        ui.showAlert('Book Added', 'success'), // show success
        ui.clear(), // clear entries
        Storage.addBook(book); // add book to local storage
    
    e.preventDefault(); // prevent default state
});

// Delete Book
let bookList = document.getElementById('book-list').addEventListener
('click', (e)=>{
    // instantiate ui
    const ui = new UI();
    // delete book
    ui.deleteBook(e.target);
    // remove from local storage
    Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);
    // show confirmation msg that book has been deleted
    e.preventDefault();
},true);
