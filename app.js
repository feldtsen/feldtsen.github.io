window.addEventListener('load', e => {
    let menuButton = document.getElementById('menuButton')
        , menuOptions = document.getElementsByClassName('menuOption')
        , pageContent = document.getElementsByClassName('pageContent')
        , pagestatus = false
        , currentPage, menuStatus = false;
    menuButton.addEventListener('click', e => {
        menuToggle(!menuStatus);
        if (pagestatus) {
            menuOptions[currentPage].classList.toggle('activePage');
            pagestatus = false;
            menuOptions[currentPage].classList.remove('pageContentActive');
        }
        else {
            document.getElementsByClassName('pages')[0].classList.toggle('active');
        }
    });
    for (let i = 0; i < menuOptions.length; i++) {
        menuOptions[i].addEventListener('click', e => {
            menuOptions[i].classList.add('activePage');
            currentPage = i;
            if (!pagestatus) {
                menuOptions[i].classList.add('pageContentActive');
                menuToggle(menuStatus, true);
            }
            pagestatus = true;
        });
    }

    function menuToggle(x, y) {
        if (x && !y) {
            menuButton.innerHTML = `<i class="fa fa-times" aria-hidden="true"></i>`;
        }
        else if (y) {
            menuButton.innerHTML = `<i class="fa fa-arrow-left" aria-hidden="true"></i>`;
        }
        else {
            menuButton.innerHTML = `<i class="fa fa-bars" aria-hidden="true"></i>`;
        }
        menuStatus = !menuStatus;
    }
});
/*
<i class="fa fa-bars" aria-hidden="true"></i>
*/