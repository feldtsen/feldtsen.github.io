window.addEventListener('load', e => {
    let menuButton = document.getElementsByClassName('menuButton')
        , menuOptions = document.getElementsByClassName('menuOption');
    for (let i = 0; i < menuButton.length; i++) {
        menuButton[i].addEventListener('click', e => {
            document.getElementsByClassName('pages')[0].classList.toggle('active');
        });
    }
    for (let i = 0; i < menuOptions.length; i++) {
        menuOptions[i].addEventListener('click', e => {
            console.log(i);
            menuOptions[i].classList.toggle('activePage');
        });
    }
});