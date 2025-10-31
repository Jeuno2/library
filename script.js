
let log = console.log;

// declarations
const bookArray = [];
const container = document.querySelector(".container");
const openFormBtn = document.querySelector(".open-form");
const closeFormBtn = document.querySelector(".close-form");
const form = document.querySelector(".form-div");

form.addEventListener('submit', (e) => {
    e.preventDefault();
});

// book constructor
function Book(title, author, numOfPages, beenRead, uniqueID) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.beenRead = beenRead; 
    this.uniqueID = uniqueID;
} //end book constructor

function addBookToLibrary(title, author, numOfPages, beenRead) {
    const uniqueID = crypto.randomUUID();
    bookArray.push(new Book(title, author, numOfPages, beenRead, uniqueID));
    displayBooks(uniqueID);
}

function displayBooks(uniqueID) {

    const newCard = document.createElement("div");
    newCard.classList.add("card");
    container.appendChild(newCard);

    const ul = document.createElement("ul");
    const cardButton = document.createElement("button");
    cardButton.innerText = "Remove Book";
    cardButton.classList.add("btn");
    cardButton.setAttribute('id', uniqueID);
    
    log(bookArray);
    cardButton.addEventListener('click', () => {
        bookArray.forEach(element => {
            for(innerElement in element) {
                if(element[innerElement] === uniqueID) {
                    bookArray.splice(element, 1);
                    newCard.remove();
                } 
            } 
        });
        log(bookArray)
    });
    
    newCard.appendChild(ul);
    newCard.appendChild(cardButton);

    bookArray.forEach(element => {
        if(element === bookArray[bookArray.length - 1]) {
            for (innerElement in element) {
                const listItem = document.createElement("li");
                listItem.textContent = element[innerElement];
                ul.appendChild(listItem);
            }
        }
    });
}   

// clicking submit button on form sends all values to addBookToLibrary method to create card using book object
const submit = document.querySelector(".submit");
submit.addEventListener('click', () => {
    const bookTitle = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const numOfPages = document.getElementById("pages").value;

    const radioButtons = document.getElementsByName('read');
    let selectedValue;
    for(let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            selectedValue = radioButtons[i].value;
            break;
        }
        // log(selectedValue);
    }

    addBookToLibrary(bookTitle, author, numOfPages, selectedValue);
});

// clicking button opens form
openFormBtn.addEventListener('click', () => {
    form.style.display = "block";
})

// clicking button closes form
closeFormBtn.addEventListener('click', () => {
    form.style.display = "none";
});