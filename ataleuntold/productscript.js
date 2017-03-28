let bookData, titleInput, inputType, xhr = new XMLHttpRequest()
    , parsedBookData, existingElement = document.getElementById('container')
    , authorOneElement = document.getElementById('authorOneContainer')
    , authorTwoElement = document.getElementById('authorTwoContainer')
    , authorThreeElement = document.getElementById('authorThreeContainer')
    , authorFourElement = document.getElementById('authorFourContainer')
    , currentImage, currentBuy, currentIdentifier, currentSubtitle, currentDescription, currentElement, identifiers = []
    , titles = []
    , titlesUser = []
    , userIdentifiers = []
    , bookCart = []
    , priceCart = []
    , ready = false
    , bookCounter = 0;
//FILTER FOR GOOGLE BOOKS API CALL///////////////////////////////////////////////////////////////////////////////////
let filter = {
        findBuy: (data) => {
                if (data.saleInfo.buyLink) {
                    currentBuy = data.saleInfo.buyLink;
                }
                else {
                    currentBuy = '#notAvailable';
                }
            } //checking for buy link, if not, refer to not available
            
        , findIdentifier: (data) => {
                if (data.industryIdentifiers) {
                    currentIdentifier = data.industryIdentifiers[0].identifier;
                }
                else {
                    currentIdentifier = '0';
                }
            } //checking for identifier for previewing books
            
        , findImage: (data) => {
                if (data.imageLinks) {
                    currentImage = data.imageLinks.thumbnail;
                }
                else {
                    currentImage = "./images/missing.jpg";
                }
            } // looking for thumbnail image, if not, replace with default
            
        , findSubtitle: (data) => {
                if (data) {
                    currentSubtitle = data;
                }
                else {
                    currentSubtitle = " ";
                }
            } //looking for subtitle, if not, replace with nothing
            
        , findDescription: (data) => {
            if (data) {
                currentDescription = data;
            }
            else {
                currentDescription = "No description";
            } //looking for description content, if not, replace with predefined text
        }
        , removeElements: () => {
                let removeThis = document.querySelectorAll('ul#container > li');
                removeThis.forEach((element) => {
                    existingElement.removeChild(element);
                });
            } // making it ready for new search
    }
    //PREVIEWER THAT TAKES DATA FROM PARSED BOOK DATA///////////////////////////////////////////////////////////////////////////////
let viewer;
google.books.load();
google.books.setOnLoadCallback(initialize);

function initialize() {
    viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
}
//LOAD BEFORE START/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// -> AJAX CALL SYNC
(function () {
    currentElement = authorOneElement;
    inputType = "inauthor=";
    titleInput = localStorage.getItem('authorOne');
    bookReq();
    currentElement = authorTwoElement;
    inputType = "inauthor=";
    titleInput = localStorage.getItem('authorTwo');
    bookReq();
    currentElement = authorThreeElement;
    inputType = "inauthor=";
    titleInput = localStorage.getItem('authorThree');
    bookReq();
    currentElement = authorFourElement;
    inputType = "inauthor=";
    titleInput = localStorage.getItem('authorFour');
    bookReq();
    info();
})();
// GOOGLE BOOKS API //////////////////////////////////////////////////////////////////////////////////////////////////////////////
function bookReq() {
    xhr.open("GET", "https://www.googleapis.com/books/v1/volumes?q=" + inputType + titleInput + "&maxResults=40&key=AIzaSyDj4JhqWEGJPDRpDgT2rNsmjDrvIYkDIkA", ready);
    xhr.onload = (e) => {
        if (xhr.status === 200 && xhr.readyState === 4) {
            parsedBookData = JSON.parse(xhr.responseText);
            for (let i = 0; i < parsedBookData.items.length; i++) {
                let book = parsedBookData.items[i];
                filter.findImage(book.volumeInfo); //finds thumbnail
                filter.findBuy(book); //checks availability
                filter.findIdentifier(book.volumeInfo); //checks for unique id
                filter.findSubtitle(book.volumeInfo.subtitle); //prints out subtitle if available
                filter.findDescription(book.volumeInfo.description) //looks for description
                addElement(book.volumeInfo.title, currentSubtitle, currentImage, currentBuy, currentDescription, currentElement); //creates the list item
                if (ready) {
                    titlesUser.push(book.volumeInfo.title);
                    userIdentifiers.push(currentIdentifier);
                } // -> This applies when the user search
                else {
                    titles.push(book.volumeInfo.title);
                    identifiers.push(currentIdentifier);
                } //-> This applies when it runs sync
            }
            if (ready) {
                userInfo();
            }
        }
        else {
            console.error("ERROR: " + xhr.statusText);
        }
    };
    xhr.onerror = function (e) {
        console.error("Error! " + xhr.statusText);
    };
    xhr.send(null);
}
///BUTTONS FOR EACH SEARCH RESAULT////////////////////////////////////////////////////////////////////////////////////////////////
// -> This info get printed out on the sync-call
function info() {
    let viewDescriptionButton = document.getElementsByClassName('viewDescriptionButton')
        , previewButton = document.getElementsByClassName('previewButton')
        , addToCartButton = document.getElementsByClassName('addToCartButton');
    // -> Toggle the description
    for (let i = 0; i < viewDescriptionButton.length; i++) {
        viewDescriptionButton[i].addEventListener('click', () => {
            document.getElementsByClassName('viewDescriptionContent')[i].classList.toggle('viewDescriptionContentDisplayed');
        });
    }
    // -> Toggle preview book 
    for (let i = 0; i < previewButton.length; i++) {
        previewButton[i].addEventListener('click', () => {
            initialize();
            viewer.load(identifiers[i]);
            document.getElementsByClassName('previewerContainer')[0].classList.toggle('hidden');
        });
    }
    //-> Adds clicked book to the cart
    for (let i = 0; i < addToCartButton.length; i++) {
        addToCartButton[i].addEventListener('click', () => {
            document.getElementsByClassName('orderBooksButton')[0].classList.add('orderBooksButtonDisplay');
            bookCart.push(titles[i]);
            addToCartButton[i].innerHTML = "Added!";
            localStorage.setItem('storageBookCart', JSON.stringify(bookCart));
            document.getElementById('bookCounterElement').innerHTML = JSON.parse(localStorage.getItem('storageBookCart')).length;
        });
    }
}
// This get printed out on the async call (looks above as refrence)
// ->Changed variables to fit user container
function userInfo() {
    let viewDescriptionButtonUser = document.getElementsByClassName('viewDescriptionButtonUser')
        , previewButtonUser = document.getElementsByClassName('previewButtonUser')
        , addToCartButtonUser = document.getElementsByClassName('addToCartButtonUser');
    for (let i = 0; i < viewDescriptionButtonUser.length; i++) {
        viewDescriptionButtonUser[i].addEventListener('click', () => {
            document.getElementsByClassName('viewDescriptionContentUser')[i].classList.toggle('viewDescriptionContentDisplayed');
        });
    }
    for (let i = 0; i < previewButtonUser.length; i++) {
        previewButtonUser[i].addEventListener('click', () => {
            initialize();
            viewer.load(userIdentifiers[i]);
            document.getElementsByClassName('previewerContainer')[0].classList.toggle('hidden');
        });
    }
    for (let i = 0; i < addToCartButtonUser.length; i++) {
        addToCartButtonUser[i].addEventListener('click', () => {
            document.getElementsByClassName('orderBooksButton')[0].classList.add('orderBooksButtonDisplay');
            bookCart.push(titlesUser[i]);
            addToCartButtonUser[i].innerHTML = "Added!";
            localStorage.setItem('storageBookCart', JSON.stringify(bookCart));
            document.getElementById('bookCounterElement').innerHTML = JSON.parse(localStorage.getItem('storageBookCart')).length;
        });
    }
}
//USER SEARCH BUTTON ////////////////////////////////////////////////////////////////////////////////////////////////////////
let submitButton = document.getElementById('submitButton')
    , userInput = document.getElementById('userInput');
submitButton.addEventListener('click', () => {
    userSubmit();
});
//-> This makes is possible to hit enter to search
userInput.addEventListener('keypress', (e) => {
    let keyCode = e.keyCode || e.which;
    if (keyCode == '13') {
        userSubmit();
    }
});
//-> Executes the search
function userSubmit() {
    //on click we reset everything
    userIdentifiers = [];
    ready = true;
    document.getElementById('container').classList.add('containerSize');
    currentElement = existingElement;
    inputType = " "
    titleInput = document.getElementById('userInput').value; //setting the new user value to query string
    filter.removeElements(); // resetting the search
    bookReq(); //making the request
    document.getElementById('searchResult').innerHTML = "Search result for " + titleInput;
}
//HIDES THE RESAULT WITH ORDER VALUE OF NOT AVAILABLE ///////////////////////////////////////////////////////////////////////////
document.getElementById('hideNotAvailable').addEventListener('click', () => {
    let elements = document.querySelectorAll('.notAvailable');
    elements.forEach(function (element) {
        element.classList.toggle('hidden');
    })
});
//DISPLAYES THE POP UP PREVIWER ////////////////////////////////////////////////////////////////////////////////////////////////
document.getElementsByClassName('previewerContainer')[0].addEventListener('click', (e) => {
    document.getElementsByClassName('previewerContainer')[0].classList.toggle('hidden');
});
//CREATING NEW ELEMENT FROM PARSED DATA ///////////////////////////////////////////////////////////////////////////////////////
function addElement(title, subtitle, image, buy, description, existing) {
    let newContainer = document.createElement('li')
        , newTitle = document.createElement('h3')
        , newSubtitle = document.createElement('h6')
        , newTitleContent = document.createTextNode(title)
        , newSubtitleContent = document.createTextNode(subtitle)
        , newDescriptionContent = document.createTextNode(description)
        , newThumbnail = document.createElement('img')
        , newBuy = document.createElement('a')
        , newDescriptionButton = document.createElement('button')
        , newPreviewButton = document.createElement('button')
        , newDescription = document.createElement('p');
    newContainer.appendChild(newThumbnail);
    newContainer.appendChild(newTitle);
    newContainer.appendChild(newSubtitle);
    newContainer.appendChild(newBuy);
    newContainer.appendChild(newDescriptionButton);
    newContainer.appendChild(newDescription);
    newContainer.appendChild(newPreviewButton);
    newTitle.appendChild(newTitleContent);
    newSubtitle.appendChild(newSubtitleContent);
    newThumbnail.setAttribute('src', image);
    newBuy.className = "addToCartButton";
    newBuy.innerHTML = 'Add to cart';
    //CHECKS IF IT IS THE USER WHO SEARCHED OR IF IT IS THE SEED
    if (currentBuy == '#notAvailable') {
        newBuy.innerHTML = 'Not available';
        newContainer.className = 'notAvailable';
    }
    newDescriptionButton.innerHTML = 'Read description...';
    newPreviewButton.innerHTML = 'Preview';
    //CHECKS IF IT IS THE USER WHO SEARCHED OR IF IT IS THE SEED
    if (!ready) {
        newDescriptionButton.className = 'viewDescriptionButton';
        newPreviewButton.className = 'previewButton';
        newDescription.className = 'viewDescriptionContent';
    }
    else {
        newDescriptionButton.className = 'viewDescriptionButtonUser';
        newPreviewButton.className = 'previewButtonUser';
        newDescription.className = 'viewDescriptionContentUser';
        newBuy.className = "addToCartButtonUser";
    }
    newDescription.appendChild(newDescriptionContent);
    existing.appendChild(newContainer);
}
//////PICTURE SLIDESHOW//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let slides = document.querySelectorAll('#slides .slide')
    , currentSlide = 0
    , playing = true
    , sliderFunctions = {
        nextSlide: () => {
            sliderFunctions.goToSlide(currentSlide + 1);
        }
        , previousSlide: () => {
            sliderFunctions.goToSlide(currentSlide - 1);
        }
        , goToSlide: (n) => {
            slides[currentSlide].className = 'slide';
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].className = 'slide showing';
        }
        , pauseSlideshow: () => {
            pauseButton.innerHTML = '&#9658;'; // play character
            playing = false;
            clearInterval(slideInterval);
        }
        , playSlideshow: () => {
            pauseButton.innerHTML = '&#10074;&#10074;'; // pause character
            playing = true;
            slideInterval = setInterval(sliderFunctions.nextSlide, 5000);
        }
    }
    , slideInterval = setInterval(sliderFunctions.nextSlide, 5000)
    , controls = document.querySelectorAll('.controls')
    , pauseButton = document.getElementById('pause')
    , next = document.getElementById('next')
    , previous = document.getElementById('previous');
pauseButton.addEventListener('click', () => {
    if (playing) sliderFunctions.pauseSlideshow();
    else sliderFunctions.playSlideshow();
});
next.addEventListener('click', () => {
    sliderFunctions.pauseSlideshow();
    sliderFunctions.nextSlide();
});
previous.addEventListener('click', () => {
    sliderFunctions.pauseSlideshow();
    sliderFunctions.previousSlide();
});
//DISPLAY CORRECT NAMES FROM THE CMS CONSOLE 
// -> Gets data from the localStorage
let previewAuthorOne = document.getElementById('previewAuthorOne')
    , previewAuthorTwo = document.getElementById('previewAuthorTwo')
    , previewAuthorThree = document.getElementById('previewAuthorThree')
    , previewAuthorFour = document.getElementById('previewAuthorFour');
previewAuthorOne.innerHTML = localStorage.getItem('authorOne');
previewAuthorTwo.innerHTML = localStorage.getItem('authorTwo');
previewAuthorThree.innerHTML = localStorage.getItem('authorThree');
previewAuthorFour.innerHTML = localStorage.getItem('authorFour');