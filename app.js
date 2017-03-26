window.addEventListener('load', e => {
    let menuButton = document.getElementById('menuButton')
        , menuOptions = document.getElementsByClassName('menuOption')
        , pagestatus = false
        , currentPage, menuStatus = false;
    menuButton.addEventListener('click', e => {
        menuToggle(!menuStatus);
        if (pagestatus) {
            menuOptions[currentPage].classList.toggle('activePage');
            pagestatus = false;
        }
        else {
            document.getElementsByClassName('pages')[0].classList.toggle('active');
        }
    });
    for (let i = 0; i < menuOptions.length; i++) {
        menuOptions[i].addEventListener('click', e => {
            menuOptions[i].classList.add('activePage');
            currentPage = i;
            if(!pagestatus)menuToggle(menuStatus, true)
            pagestatus = true;
        });
    }

    function menuToggle(x, y) {
        if (x) {
            menuButton.innerHTML = `<i class="fa fa-times" aria-hidden="true"></i>`;
        }
        else {
            menuButton.innerHTML = `<i class="fa fa-bars" aria-hidden="true"></i>`;
        }
        if (y) {
            menuButton.innerHTML = `<i class="fa fa-arrow-left" aria-hidden="true"></i>`;
        }
        
        menuStatus = !menuStatus;
    }
});
/*
<i class="fa fa-bars" aria-hidden="true"></i>
*/