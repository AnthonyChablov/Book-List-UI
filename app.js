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

// Event Listeners
// Add Book
let bookForm = document.getElementById('book-form').addEventListener('submit', (e) => {
    let title = document.getElementById('title').value, // get form values 
        author = document.getElementById('author').value,
        ISBN = document.getElementById('isbn').value;
    const book = new Book(title, author, ISBN); // instantiate book
    const ui = new UI(); // instantiate ui
    title === '' || author === '' || ISBN == '' ? // Validation of entered books
        ui.showAlert('Please fill in all fields', 'error') : // show alert 
        ui.addBookToList(book), ui.showAlert('Book Added', 'success'), ui.clear(); // show success
    e.preventDefault(); // prevent default state
});
// Delete Book
let bookList = document.getElementById('book-list').addEventListener
('click', (e)=>{
    const ui = new UI();
    ui.deleteBook(e.target);
    // show confirmation msg that book has been deleted
    
    
    e.preventDefault();
},true);
