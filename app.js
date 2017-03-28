window.addEventListener('load', e => {
    let menuButton = document.getElementById('menuButton')
        , menuOptions = document.getElementsByClassName('menuOption')
        , pageContent = document.getElementsByClassName('pageContent')
        , projectsContainer = document.getElementById('projects')
        , pagestatus = false
        , currentPage, menuStatus = false;
    let projectsObj = {
        paperstack: {
            title: `Paperstack`
            , image: `paperstack/cover.jpg`
            , description: `something something something`
            , path: `paperstack/`
        }
        , aTaleUntold: {
            title: `A Tale Untold`
            , image: `cover.jpg`
            , description: `something something something`
            , path: `ataleuntold/index.html`
        }
//        , patatapClone: {
//            title: `Patatap Clone`
//            , image: `cover.jpg`
//            , description: `something something something`
//            , path: `patatapclone/index.html`
//        }
    }
    addProject(projectsObj);
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

    function addProject(projects) {
        for (let project in projects) {
            let current = projects[project]
                , liProject = document.createElement('li');
            liProject.innerHTML = (`<img src="${current.image}" alt="cover image for project"><h1 class="projectTitle">${current.title}</h1><a href="${current.path}">View Project</a>`);
            projectsContainer.appendChild(liProject);
        }
    }
});
/*
<i class="fa fa-bars" aria-hidden="true"></i>
*/