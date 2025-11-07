
let log = console.log;

// declarations
const bookArray = []; //array to store all book objects

const openFormBtn = document.querySelector(".open-form"); //"New Book" button
const container = document.querySelector(".container");
const closeFormBtn = document.querySelector(".close-form");
const formDisplay = document.querySelector(".form-div");
const form = document.querySelector("#form");

formDisplay.addEventListener('submit', (e) => {
    e.preventDefault();
});

// book constructor
function Book(title, author, numOfPages, beenRead, uniqueID) {
    if(!new.target) {
        throw Error(`You must use the 'new' operator to call the constructor`);
    }
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.beenRead = beenRead; 
    this.uniqueID = uniqueID;
} //end book constructor

Object.defineProperty(Book.prototype, 'changeReadStatus', {
    value: function() {
        if(this.beenRead === "false") {
            this.beenRead = "true";
        }
        else if (this.beenRead === "true") {
            this.beenRead = "false";
        }
        
        return(this.beenRead);
        
    },
    enumerable: false,
    writable: true,
    configurable: true
});

function addBookToLibrary(title, author, numOfPages, beenRead) {
    const uniqueID = crypto.randomUUID();
    bookArray.push(new Book(title, author, numOfPages, beenRead, uniqueID));
    displayBooks(uniqueID);
}

function displayBooks(uniqueID) {

    // create new card with class "card" and add to flex container
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    container.appendChild(newCard);

    // create unordered list to be on each 
    const ul = document.createElement("ul");
    newCard.appendChild(ul);

    // button to change read status (yes or no)
    const readButton = document.createElement("button");
    readButton.innerText = "Toggle Has Read";
    readButton.classList.add("btn");
    readButton.classList.add("readButton");
    newCard.appendChild(readButton);
    
    // loop through array of books then loop through each book object's properties turning them into list items and adding to unordered list
    bookArray.forEach(element => {
        if(element === bookArray[bookArray.length - 1]) {
            for (innerElement in element) {
                const listItem = document.createElement("li");
                listItem.textContent = element[innerElement];
                ul.appendChild(listItem);
            }
        }
    });

    // create card button for each book card and add button to card
    const cardButton = document.createElement("button");
    cardButton.innerText = "Remove Book";
    cardButton.classList.add("btn");
    newCard.appendChild(cardButton);

    newCard.setAttribute('data-id', `${uniqueID}`);
    
    // remove book object from library/display section
    cardButton.addEventListener('click', () => {
        bookArray.forEach(element => {
            for(innerElement in element) {
                if(element[innerElement] === cardButton.parentElement.getAttribute('data-id')) {
                    let index = bookArray.indexOf(element)
                    bookArray.splice(index, 1);
                    cardButton.parentElement.remove();
                }
            }
        });
        log(bookArray);
    });

    readButton.addEventListener('click', () => {
        bookArray.forEach(element => {
            let hasBeenRead = null;
            for(innerElement in element) {
                if(element[innerElement] === readButton.parentElement.getAttribute('data-id')) {
                    let nodeList = newCard.children[0].children[3];
                    hasBeenRead = element.changeReadStatus();
                    log(hasBeenRead);
                    nodeList.textContent = hasBeenRead;
                }
            }
        });
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
    }

    addBookToLibrary(bookTitle, author, numOfPages, selectedValue);
    form.reset();
});

// clicking button opens form
openFormBtn.addEventListener('click', () => {
    form.style.display = "block";
})

// clicking button closes form
closeFormBtn.addEventListener('click', () => {
    form.style.display = "none";
});
