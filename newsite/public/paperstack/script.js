/*https://www.forverkliga.se/JavaScript/api/crud.php?requestKey*/
let xhr = new XMLHttpRequest()
    , keyField = document.getElementById('apiRequestField')
    , fetchButton = document.getElementById('fetchButton')
    , loginButton = document.getElementById('loginButton')
    , addDataButton = document.getElementById('addDataButton')
    , userMessage = document.getElementsByClassName('userMessage')
    , bookContainer = document.getElementById('bookContainer')
    , googleBooksContainer = document.getElementById('googleBooksContainer')
    , action, status, legitKey = true
    , currentUserMessage = ''
    , apiSelect = {
        database: {
            url: "https://www.forverkliga.se/JavaScript/api/crud.php?"
        }
        , googleBooks: {
            url: "https://www.googleapis.com/books/v1/volumes?q="
        } //google books
    }, // select the api you want to call
    checkThis = {
        url: (res, url) => {
                if (url == "https://www.forverkliga.se/JavaScript/api/crud.php?requestKey") {
                    sessionStorage.setItem('userKey', res.key);
                    checkThis.userLogin();
                    keyField.value = res.key;
                }
            } // filter functions for api requests
            
        , apiStatus: (res, url, updated) => {
            if (res.message == 'Bad API key, use "requestKey" to request a new one.') {
                currentUserMessage = 'Please login in with your valid key or request a new one';
                legitKey = false;
            }
            if (res.status == "error" && legitKey) {
                apiRequest(url, updated);
            }
        }
        , userLogin: () => {
            let loginStatus = document.getElementsByClassName('loginStatus');
            if (!sessionStorage.getItem('userKey')) {
                loginButton.value = "Login";
                status = 'Not logged in';
                action = () => checkThis.login();
            }
            else {
                loginButton.value = "Logout";
                status = `Current key: ${sessionStorage.getItem('userKey')}`;
                action = () => checkThis.logout();
            }
            for (let i = 0; i < loginStatus.length; i++) {
                loginStatus[i].innerHTML = status;
            }
        }
        , login: () => {
            if (keyField.value.length == 5) {
                sessionStorage.setItem('userKey', keyField.value);
                checkThis.updatedList(true);
            }
            else {
                checkThis.userMessage('Please enter your valid key or request a new one');
            }
        }
        , logout: () => {
            sessionStorage.clear();
        }
        , userMessage: (mess) => {
            for (let i = 0; i < userMessage.length; i++) {
                userMessage[i].classList.remove('userMessageActive');
                userMessage[i].classList.remove('successUserMessage');
                if (mess != '') {
                    userMessage[i].classList.add('userMessageActive');
                }
                userMessage[i].innerHTML = mess;
            }
        }
        , updatedList: (updated) => {
            if (updated && sessionStorage.getItem('userKey')) {
                apiRequest(apiSelect.database.url + `op=select&key=${sessionStorage.getItem('userKey')}`);
            }
        }
    };
window.onload = () => {
        checkThis.userLogin();
        checkThis.updatedList(true);
    }
    /////////////////////////
    //REQUEST AND SYSTEMIZE//
    /////////////////////////
function apiRequest(url, updated) {
    fetch(url).then(res => {
        if (res.ok) {
            legitKey = true;
            checkThis.userMessage(currentUserMessage);
            return res.json();
        }
        return Promise.reject(Error('error'))
    }).catch(err => {
        console.error(`Catched error message: ${err.message}`);
        return Promise.reject(Error(err.message))
    }).then(res => {
        checkThis.apiStatus(res, url, updated);
        checkThis.url(res, url);
        if (res.data || res.items) {
            createElement(res);
        }
        checkThis.updatedList(updated);
    });
}
/////////////////////////////
//ADD ELEMENT FROM API CALL//
/////////////////////////////
function createElement(res) {
    //Gave up on life, here is the result.. It works though
    let container, book, reverseIndex, contenteditable, bookTitle, bookAuthor, myClass;
    if (res.data) {
        container = bookContainer, book = res.data, contenteditable = 'contenteditable="true"';
    }
    else {
        container = googleBooksContainer, book = res.items, contenteditable = '', bookTitle = 'items';
    }
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    for (let i = book.length; i--;) {
        if (res.data) {
            bookTitle = book[i].title, bookAuthor = book[i].author, myClass = 'deleteBook fa fa-times';
        }
        else {
            bookTitle = book[i].volumeInfo.title, bookAuthor = book[i].volumeInfo.authors, myClass = 'addBook fa fa-plus';
        }
        let newLi = document.createElement('li')
            , reverseIndex = book.length - i - 1;
        newLi.innerHTML = `
            <i class="${myClass}" aria-hidden="true"></i> Title 
            <span ${contenteditable} placeholder="enter title" class="changeTitle">${bookTitle}</span> 
            , author  
            <span ${contenteditable} placeholder="enter author" class="changeAuthor">${bookAuthor}</span>
            `;
        container.appendChild(newLi);
        if (res.data) {
            bookContainer.children[reverseIndex].addEventListener('focusout', () => {
                let newTitle = document.getElementsByClassName('changeTitle')[reverseIndex].innerHTML
                    , newAuthor = document.getElementsByClassName('changeAuthor')[reverseIndex].innerHTML,
                currentUserMessage = `<span class="successUserMessage">The title is now "${newTitle}" with the author "${newAuthor}"</span>`;
                if (newTitle != '' || newAuthor != '') apiRequest(apiSelect.database.url + `op=update&id=${res.data[i].id}&title=${newTitle}&author=${newAuthor}&key=${sessionStorage.getItem('userKey')}`)
            });
            document.getElementsByClassName('deleteBook')[reverseIndex].addEventListener('click', () => {
                currentUserMessage = `<span class="successUserMessage">Successfully deleted<span>`;
                apiRequest(apiSelect.database.url + `op=delete&id=${res.data[i].id}&key=${sessionStorage.getItem('userKey')}`)
                bookContainer.children[reverseIndex].classList.add('displayNone');
            });
        }
        else {
            document.getElementsByClassName('addBook')[reverseIndex].addEventListener('click', () => {
                if (sessionStorage.getItem('userKey')) {
                    currentUserMessage = `<span class="successUserMessage">"${book[i].volumeInfo.title}" added</span>`;
                    apiRequest(apiSelect.database.url + `op=insert&title=${book[i].volumeInfo.title}&author=${book[i].volumeInfo.authors}&key=${sessionStorage.getItem('userKey')}`, true);
                }
                else {
                    checkThis.userMessage(`<span>Please login</span>`);
                }
            });
        }
    }
}
///////////////
//API BUTTONS//
//////////////
loginButton.addEventListener('click', () => {
    currentUserMessage = '';
    action();
    checkThis.userLogin();
});
fetchButton.addEventListener('click', () => {
    currentUserMessage = '';
    apiRequest(apiSelect.database.url + "requestKey", true);
});
keyField.addEventListener('keypress', (e) => {
    if (e.keyCode == '13') {
        checkThis.login();
        checkThis.userLogin();
    }
});
titleField.addEventListener('keypress', (e) => {
    if (e.keyCode == '13') {
        insertData();
    }
});
authorField.addEventListener('keypress', (e) => {
    if (e.keyCode == '13') {
        insertData();
    }
});
addDataButton.addEventListener('click', () => {
    insertData();
});

function insertData() {
    currentUserMessage = '';
    let titleInput = document.getElementById('titleField').value
        , authorInput = document.getElementById('authorField').value;
    if (!sessionStorage.getItem('userKey')) {
        checkThis.userMessage('Please log in.');
    }
    else if (titleInput != '' || authorInput != '') {
        currentUserMessage = `<span class="successUserMessage">The book "${titleInput}" with the author "${authorInput}" is now saved to your list<span>`;
        apiRequest(apiSelect.database.url + `op=insert&title=${titleInput}&author=${authorInput}&key=${sessionStorage.getItem('userKey')}`, true);
    }
    else {
        checkThis.userMessage('Add title or/and author');
    };
}
//google book search
document.getElementById('searchField').addEventListener('keypress', (e) => {
    if (e.keyCode == '13') {
        googleSearch();
    }
});
document.getElementById('searchButton').addEventListener('click', () => {
    googleSearch();
});

function googleSearch() {
    let userTitle = document.getElementById('searchField').value;
    apiRequest(apiSelect.googleBooks.url + `title=${userTitle}&maxResults=20&key=AIzaSyDj4JhqWEGJPDRpDgT2rNsmjDrvIYkDIkA`);
}
/////////////////////
//ACTIVATE ONE SITE//
////////////////////
let pOneButton = document.getElementById("pOneButton")
    , pOne = document.getElementById("pOne")
    , pThreeButton = document.getElementById("pThreeButton")
    , pThree = document.getElementById("pThree")
    , pFourButton = document.getElementById("pFourButton")
    , pFour = document.getElementById("pFour")
    , activePage = document.getElementsByClassName("active");
//ADD PAGE
pOneButton.addEventListener('click', () => {
    currentUserMessage = '';
    checkThis.userMessage(currentUserMessage);
    makeActive();
    pOne.classList.add('active');
});
//EXPLORE PAGE
pThreeButton.addEventListener('click', () => {
    makeActive();
    pThree.classList.add('active');
});
//CREATORS PAGE
pFourButton.addEventListener('click', () => {
    makeActive();
    pFour.classList.add('active');
});

function makeActive() {
    for (let i = 0; i < activePage.length; i++) {
        activePage[i].classList.remove('active');
    }
}