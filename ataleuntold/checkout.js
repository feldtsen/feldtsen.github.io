let tableElement = document.getElementById('tableElement')
    , priceGenerator = () => Math.floor((Math.random() * 30) + 1);
(function () {
    let books = localStorage.getItem('storageBookCart')
        , parsedBook = JSON.parse(books);
    if (parsedBook) {
        parsedBook.forEach((book) => {
            addTableElement(book, priceGenerator() + "€");
        });
    }
})();

function addTableElement(currentBook, currentPrice) {
    let tr = document.createElement('tr')
        , tdBook = document.createElement('td')
        , tdPrice = document.createElement('td')
        , tdBookContent = document.createTextNode(currentBook)
        , tdPriceContent = document.createTextNode(currentPrice);
    tdBook.appendChild(tdBookContent);
    tdPrice.appendChild(tdPriceContent);
    tr.appendChild(tdBook);
    tr.appendChild(tdPrice);
    tableElement.appendChild(tr);
}
