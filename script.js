let log = console.log;

const bookArray = [];
const container = document.querySelector(".container");

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
}

function displayBooks() {
    for(let i = 0; i < bookArray.length; i++) {
        const newCard = document.createElement("div");
        const ul = document.createElement("ul");
        const cardButton = document.createElement("button");
        cardButton.innerText = "Remove Book";
        cardButton.classList.add("btn");
        newCard.classList.add("card");
        newCard.appendChild(ul);
        newCard.appendChild(cardButton);
        container.appendChild(newCard);
        
        for (let prop in bookArray[i]) {
            log(`${prop}: ${bookArray[i][prop]}`);
            const listItem = document.createElement("li");
            listItem.textContent = `${bookArray[i][prop]}`;
            ul.appendChild(listItem);
        }
    }
}

addBookToLibrary("This Is My Weapon", "James Bries", 109, false);
addBookToLibrary("Child's Play", "Richard Clark", 210, false);
addBookToLibrary("Monkey Business", "Chim Panzee", 210, false);

const openFormBtn = document.querySelector(".open-form");
const closeFormBtn = document.querySelector(".close-form");
const form = document.querySelector(".form-div");

form.addEventListener('submit', (e) => {
    e.preventDefault();
})



const submit = document.querySelector(".submit");
submit.addEventListener('click', () => {
    const bookTitle = document.getElementById("title").value;
    log(bookTitle);
});



openFormBtn.addEventListener('click', () => {
    form.style.display = "block";
})


closeFormBtn.addEventListener('click', () => {
    form.style.display = "none";
});

displayBooks();


