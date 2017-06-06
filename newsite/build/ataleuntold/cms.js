let contentAuthorOne = document.getElementById('contentAuthorOne')
    , updateAuthorOne = document.getElementById('updateAuthorOne')
    , previewAuthorOne = document.getElementById('previewAuthorOne')
    , contentAuthorTwo = document.getElementById('contentAuthorTwo')
    , updateAuthorTwo = document.getElementById('updateAuthorTwo')
    , previewAuthorTwo = document.getElementById('previewAuthorTwo')
    , contentAuthorThree = document.getElementById('contentAuthorThree')
    , updateAuthorThree = document.getElementById('updateAuthorThree')
    , previewAuthorThree = document.getElementById('previewAuthorThree')
    , contentAuthorFour = document.getElementById('contentAuthorFour')
    , updateAuthorFour = document.getElementById('updateAuthorFour')
    , previewAuthorFour = document.getElementById('previewAuthorFour')
    , updateAll = document.getElementById('updateAll');
// SEED
if (!localStorage.getItem('authorOne')) {
    localStorage.setItem('authorOne', 'J.K. Rowling');
    localStorage.setItem('authorTwo', 'William Shakespeare');
    localStorage.setItem('authorThree', 'Stephen King');
    localStorage.setItem('authorFour', 'Harold Robbins');
}
// CHANGE AUTHORS
//  ->change author one
previewAuthorOne.innerHTML = localStorage.getItem('authorOne');
contentAuthorOne.value = localStorage.getItem('authorOne');
updateAuthorOne.addEventListener('click', () => {
    localStorage.setItem('authorOne', contentAuthorOne.value);
    location.reload();
});
//  ->change author two
previewAuthorTwo.innerHTML = localStorage.getItem('authorTwo');
contentAuthorTwo.value = localStorage.getItem('authorTwo');
updateAuthorTwo.addEventListener('click', () => {
    localStorage.setItem('authorTwo', contentAuthorTwo.value);
    location.reload();
});
// ->change author three
previewAuthorThree.innerHTML = localStorage.getItem('authorThree');
contentAuthorThree.value = localStorage.getItem('authorThree');
updateAuthorThree.addEventListener('click', () => {
    localStorage.setItem('authorThree', contentAuthorThree.value);
    location.reload();
});
// ->change author four
previewAuthorFour.innerHTML = localStorage.getItem('authorFour');
contentAuthorFour.value = localStorage.getItem('authorFour');
updateAuthorFour.addEventListener('click', () => {
    localStorage.setItem('authorFour', contentAuthorFour.value);
    location.reload();
});
