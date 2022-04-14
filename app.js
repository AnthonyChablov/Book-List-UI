// Book constructor
class Book{
    constructor(title, author, ISBN){
        this.title = title;
        this.Author = author;
        this.ISBN = ISBN;
    }
}

// UI constructor
class UI{}
// prototype add book to list
UI.prototype.addBookToList=function(book){
    const list = document.getElementById('book-list');
    // Create new tr element
    const row = document.createElement('tr');
    // insert columns
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.ISBN}</td>
        <td><a href="#" class='delete'>X</a></td>
    `;
    list.appendChild(row);
};
// prototype show alert
UI.prototype.showAlert = function(message, className){
    const div = document.createElement('div');
    
    // add class
    div.className = `alert ${className}`;
    
    // add text
    div.appendChild(document.createTextNode(message));
    
    // Get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    
    // insert alert()
    container.insertBefore(div, form);

    // Timeout after 3 sec
    setTimeout(()=> document.querySelector('.alert').remove(), 3000);


}


// prototype clear
UI.prototype.clear=function(){
    // clear fields from form
    document.getElementById('title').value ='',
    document.getElementById('author').value ='',
    document.getElementById('isbn').value ='';
}
// 


// Event Listeners
let bookForm = document.getElementById('book-form').addEventListener('submit', (e) => {
    // get form values
    let title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        ISBN = document.getElementById('isbn').value;
    // instantiate book
    const book = new Book(title, author, ISBN);

    // instantiate ui
    const ui = new UI();

    // Validate
    if (title === '' || author === '' || ISBN === ''){
        // show alert 
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // add book to list
        ui.addBookToList(book);

        // show success
        ui.showAlert('Book Added', 'success');

        // clear 
        ui.clear();
    } 

    /* title === '' || author === '' || ISBN == ''? 
        alert('Please enter valid input') : 
        ui.addBookToList(book), ui.clear(); */

    

    e.preventDefault();
});